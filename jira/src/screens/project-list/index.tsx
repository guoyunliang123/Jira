import React from "react";
import {useDebounce, useDocumentTitle} from "utils";
import {List} from "./list";
import {SearchPanel} from "./search-panel";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useProjectModal, useProjectsSearchParams} from "./util";
import {ButtonNoPadding, Row} from "../../components/lib";

// const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
// 基本类型可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里。

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const {open} =  useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list, retry} = useProjects(useDebounce(param, 200))
  const {data: users} = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={open}
          type={'link'}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      {/*<Button onClick={retry}>retry</Button>*/}
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
      {/*<List list={list} users={users} />*/}
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem
`