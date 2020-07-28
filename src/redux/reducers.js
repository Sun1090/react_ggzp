/* 
  包含多个用于生成新的state的reducer函数的模块
*/

import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";
import { getRedirectPath } from "../utils";
import { RECEIVE_USER, RESET_USER } from "./action-types";

const initUser = {
  username: "", // 用户名
  type: "", // 类型
  msg: "", // 错误提示信息
  redirectTo: "", // 需要自动跳转的路由path
};
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

// 返回合并的reducer
export default combineReducers({
  user,
});
