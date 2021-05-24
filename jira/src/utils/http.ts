import qs from 'qs';
import * as auth from 'auth-provider'
import {useAuth} from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object,
  token?: string
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Context-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios he fetch 的表现不一样，axios 可以直接返回状态不为 2xx 的时候抛出异常，而 fetch 需要手动抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登录'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

// JS 中的 typeof，是在 runtime 时运行的
// return typeof 1 === 'number

// TS 中的 typeof 是在静态环境中运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>

export const useHttp = () => {
  const {user} = useAuth()
  // utility type 的用法：用泛型给他传入一个其他类型，然后 utility type 对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, {...config, token: user?.token})
}

// 联合类型
// let myFavoriteNumber: string | number
// myFavoriteNumber = 'one'
// myFavoriteNumber = 1
// // TS2322: Type '{}' is not assignable to type 'string | number'.
// // myFavoriteNumber = {}
// let jackFavoriteNumber: string | number
//
// // 类型别名(type)
// type FavoriteNumber = string | number // 联合类型
// let rose: FavoriteNumber = 'rose'

/**
 * 类型别名和 interface 区别和相同点
 * 相同点：在很多情况下类型别名和 interface 可以互换
 * 区别：
 * 1、类型别名(type)可以定义联合类型，interface 不可以
 * 2、interface 也无法实现 Utility type
 * */
// interface Person {
//   name: string
// }
// type Person = {name: string}
// const xiaoMing: Person = {name: 'xiaoMing'}

// type Person = {
//   name: string,
//   age: number
// }
// // Partial<Person> 参数可以传可以不传
// const xiaoMing: Partial<Person> = {name: 'xiaoMing'}
// // Omit<Person, 'name' | 'age'> 第一个参数：传入的类型；第二个参数：删除的类型
// // 必须传入 age
// const shenMiRen: Omit<Person, 'name'> = {age: 19}
// type PersonKey = keyof Person // PersonKey: name | age
// type PersonOnlyName = Pick<Person, 'name' | 'age'>
// type Age = Exclude<PersonKey, 'name'>
//
// // Partial 的实现
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };