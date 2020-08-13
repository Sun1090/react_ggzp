/* 
  包含多个用于生成新的state的reducer函数的模块
*/

import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER_LIST,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ,
} from "./action-types";
import { getRedirectPath } from "../utils";

const initUser = {
  username: "", // 用户名
  type: "", // 类型
  msg: "", // 错误提示信息
  redirectTo: "", // 需要自动跳转的路由path
};

const initUserList = [];

// 初始化chat对象
const initChat = {
  chatMsgs: [], // 消息数组[{from: id1, to: id2}]
  users: {}, // 所有用户的集合对象{id1: user1, id2: user2}
  unReadCount: 0, // 未读消息的数量
};

// 用户
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER: // 接收用户
      return action.data;
    case RESET_USER: // 重置用户
      return { ...initUser, msg: action.data };
    case AUTH_SUCCESS: //认证成功
      const redirectTo = getRedirectPath(action.data.type, action.data.header);
      return { ...action.data, redirectTo };
    // return { ...action.data, redirectTo: "/" };
    case ERROR_MSG: // 错误提示信息
      return { ...state, msg: action.data };
    default:
      return state;
  }
}

// 用户列表
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

// 管理聊天相关信息数据的reducer
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG:
      var { chatMsgs, userid } = action.data;
      return {
        chatMsgs: [...state.chatMsgs, chatMsg],
        users: state.users,
        unReadCount:
          state.unReadCount + (!chatMsg.read && chatMsg.to === userid ? 1 : 0),
      };
    case RECEIVE_MSG_LIST:
      var { chatMsg, userid } = action.data;
      return {
        chatMsgs,
        users,
        unReadCount: chatMsg.reduce((preTotal, msg) => {
          // 别人给我发的未读消息
          return preTotal + (!msg.read && msg.to === userid ? 1 : 0);
        }, 0),
      };
    case MSG_READ:
      const { count, from, to } = action.data;
      return {
        chatMsg: state.chatMsg.map((msg) => {
          if (msg.from === from && msg.to === to && !msg.read) {
            // msg.read = true  //不能直接修改状态
            return { ...msg, read: true };
          } else {
            return msg;
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount - count,
      };
    default:
      return state;
  }
}

// 返回合并的reducer   向外暴露整合所有reducer函数的结果
export default combineReducers({
  user,
  userList,
  chat,
});
