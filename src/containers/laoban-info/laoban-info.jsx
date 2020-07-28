/* 
  laoban信息完善路由组件
*/

import React, {Component} from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import { compose } from 'redux'

class LaobanInfo extends Component {
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '', // 工资
  }
}
