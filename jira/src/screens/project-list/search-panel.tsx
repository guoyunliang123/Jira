import React from "react"
import { useEffect, useState } from "react"
import {Input, Select} from "antd";

export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
}

interface SearchPenelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  }
  setParam: (param: SearchPenelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPenelProps) => {

  return <form>
    <div>
      {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
      <Input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })} />
      <Select value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })}>
        <Select.Option value={""}>负责人</Select.Option>
        {
          users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
        }
      </Select>
    </div>
  </form>
}