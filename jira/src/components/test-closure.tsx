import React, {useEffect, useState} from 'react'
import {useMount} from "../utils";

const test = () => {
  let num = 0
  const effect = () => {
    num += 1
    const message = `现在的 num 值是：${num}`
    return function unmount() {
      console.log(message)
    }
  }

  return effect
}
// 执行 test，返回 effect 函数
const add = test()
// 执行 effect 函数，返回引用了 message1 的 unmount 函数
const unmount = add()
// 在一次执行 effect 函数，返回引用了 message2 的 unmount 函数
add()
// 在一次执行 effect 函数，返回引用了 message3 的 unmount 函数
add()
unmount()

// react hook 与 闭包，hook 与闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0)

  const add = () => setNum(num + 1)

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval:", num)
    }, 1000)
    return () => clearInterval(id)
  }, [num])

  useEffect(() => {
    return () => {
      console.log('卸载值', num);
    }
  }, [num])

  return <div>
    <button onClick={add}>add</button>

    <p>
      number: {num}
    </p>
  </div>
}