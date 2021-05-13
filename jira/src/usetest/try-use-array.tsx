import { useArray, useMount } from "utils";
import React from 'react';

export const TsReactTest = () => {
  const persons: {name: string, age: number}[] = [
    {name: 'jack', age: 25},
    {name: 'ma', age: 22}
  ];
  const {value, clear, removeIndex, add} = useArray(persons);

  useMount(() => {
    // 期待这里报错：Property 'notExist' does not exist on type '{name: string, age: number;}'
    // console.log(value.notExist);

    // 期待这里报错：Property 'age' is missing in type '{name: string;}' but required in type 
    // add({name: 'david'});

    // 期待这里报错：Argument of type 'string' is not assignable to parameter of type 'number'
    // removeIndex("123")
  })

  return (
    <div>
      {/* 期待点击以后增加 john */}
      <button onClick={() => add({name: 'john', age: 22})}>add john</button>
      {/* 期待点击以后删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 期待点击以后清空列表 */}
      <button style={{marginBottom: '100px'}} onClick={() => clear()}>clear</button>
      {
        value.map((person: {age: number, name: string}, index: number) => (
          <div style={{marginBottom: '30px'}} key={index}>
            <span style={{color: 'red', marginRight: 10}}>{index}</span>
            <span style={{marginRight: 10}}>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))
      }
    </div>
  )
}