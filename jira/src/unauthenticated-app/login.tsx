import {useAuth} from 'context/auth-context';
import React from 'react'
import {Form, Input} from "antd";
import {LongButton} from "./index";
import {useAsync} from "../utils/use-async";
import {useDispatch} from "react-redux";

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

export const LoginScreen = ({onError}: { onError: (error: Error) => void }) => {

  const {login} = useAuth()
  const {run, isLoading} = useAsync(undefined, {throwOnError: true})
  const dispatch = useDispatch()

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    username: string,
    password: string
  }) => {
    login(values).catch(onError)
    // try {
    //   await run(login(values))
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
    <Form.Item>
      <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}