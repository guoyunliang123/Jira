import {useAuth} from 'context/auth-context';
import React from 'react'
import {Form, Input} from "antd";
import {LongButton} from "./index";

// interface Base {
//   id: number
// }

// interface Advance extends Base {
//   name: string
// }

// const test = (p: Base) => {}

// // 鸭子类型：面向接口编程 而不是 面向对象编程
// const a: Advance = {id: 1, name: 'jack'}
// test(a)

export const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {

  const {register} = useAuth()

  // HTMLFormElement extends Element
  const handleSubmit = ({cpassword, ...values}: { username: string, password: string, cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    register(values).catch(onError);
    // try {
    //   register(values);
    // } catch (e) {
    //   onError(e)
    // }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
      <Input placeholder={"用户名"} type="text" id={'username'}/>
    </Form.Item>
    <Form.Item name={"password"} rules={[{required: true, message: '请输入密码'}]}>
      <Input placeholder={"密码"} type="password" id={'password'}/>
    </Form.Item>
    <Form.Item name={"cpassword"} rules={[{required: true, message: '请确认密码'}]}>
      <Input placeholder={"确认密码"} type="password" id={'cpassword'}/>
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={'submit'} type={"primary"}>注册</LongButton>
    </Form.Item>
  </Form>
}