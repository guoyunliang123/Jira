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