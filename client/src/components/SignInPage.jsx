import React, { Component, PropTypes } from 'react'

import { Button, Modal, Form, Input } from 'antd'
import { login, register } from '../services/user'
import Cookies from 'js-cookie'
import { browserHistory } from 'react-router'
const FormItem = Form.Item

class SignInPage extends Component{

  constructor(props) {
    super(props)
  }

  afterLogin({jsonResult}) {
    if (jsonResult.response) {
      console.log(jsonResult.response)
      Cookies.set('user', jsonResult.response)
      browserHistory.push('index')
    } else {
      //TODO
    }
  }
  handleLogin() {
    login(this.props.form.getFieldsValue()).then(this.afterLogin)
  }

  handleRegister() {
    register(this.props.form.getFieldsValue()).then(this.afterLogin)
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Modal ref="modal"
          visible={true}
          title="Login"
          onOk={this.handleLogin.bind(this)}
          onEnter={this.handleLogin.bind(this)}
          footer={[
            <Button key="register" type="primary" size="large" onClick={this.handleRegister.bind(this)}>
              Register & Login
            </Button>,
            <Button key="login" type="primary" size="large" onClick={this.handleLogin.bind(this)}>
              Login
            </Button>
          ]}
        >
        <Form horizontal>
            <FormItem
              label="Username"
            >
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off"/>
            </FormItem>
            <FormItem
              label="Password"
            >
              <Input {...getFieldProps('password', {})} type="password" autoComplete="off"/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(SignInPage)
