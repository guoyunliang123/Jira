import { useEffect, useState } from "react";

// 判断当 value 等于 0 时
export const isFalsy = (value) => value === 0 ? false : !value;

// 在一个函数里，改变传入的对象本身是不好的
// 删除对象属性值为空的属性
export const cleanObject = (object) => {
  // Object.assign({}, object);
  const result = {...object};
  Object.keys(result).forEach(key => {
    // 判断当 value 等于 0 时
    const value = result[key]
    if(isFalsy(value)) {
      delete result[key]
    }
  })
  return result;
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if(timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('call'), 5000);
// log();
// log();
// log();
/**
 * debounce 原理讲解
 * 0s ---------> 1s ----------> 2s ----------> ...
 * 一定要理解，这三个函数都是同步操作，所以它们都是在 0 ~ 1s 这个时间内瞬间完成的
 * log() #1 // timeout#1
 * log() #2 // 发现 timeout#1! 取消之，然后设置 timeout#2
 * log() #3 // 发现 timeout#2! 取消之，然后设置 timeout#3
 *          // 所以，log() #3 结束后，就只剩 timeout#3 独自等待了
 */

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // 每次在 value 变化之后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)

    // 在上一次 useEffect 运行完之后，再来执行这个回调函数（负责清理上一次的回调函数）
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue;
}