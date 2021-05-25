import React from "react";
import {useState} from "react";
import {useDebounce, useDocumentTitle} from "utils";
import {List} from "./list";
import {SearchPanel} from "./search-panel";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";

export const ProjectListScreen = () => {

  const [param, setParam] = useState({
    name: "",
    personId: ""
  })
  const debouncedParam = useDebounce(param, 500);
  const {isLoading, error, data: list} = useProjects(debouncedParam)
  const {data: users} = useUsers();

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []}/>
      {/*<List list={list} users={users} />*/}
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem
`