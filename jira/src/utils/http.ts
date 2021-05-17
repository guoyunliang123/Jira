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

    if(config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {})
    }

    // axios he fetch 的表现不一样，axios 可以直接返回状态不为 2xx 的时候抛出异常，而 fetch 需要手动抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
      .then(async response => {
          if(response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({message: '请重新登录'})
          }
          const data = await response.json()
          if(response.ok) {
              return data
          } else {
              return Promise.reject(data)
          }
      })
}

export const useHttp = () => {
    const {user} = useAuth()
    return (...[endpoint, config] : Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}