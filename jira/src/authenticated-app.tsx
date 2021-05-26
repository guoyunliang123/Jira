import React from 'react'
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
// import softwareLogo from 'assets/software-logo.svg';
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg";
import {Button, Dropdown, Menu} from "antd";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局使用 flex，二维布局使用 grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定)，然后希望他们均匀的分布在容器中，有内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发：用 flex
 * 从布局出发：用 grid
 * @constructor
 */

export const AuthenticatedApp = () => {
  const {logout, user} = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          {/*<img src={softwareLogo} />*/}
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={<Menu>
            <Menu.Item key={'layout'}>
              <Button type={'link'} onClick={logout}>登出</Button>
              {/*<a href={""} onClick={logout}>登出</a>*/}
            </Menu.Item>
          </Menu>}>
            <Button type={'link'} onClick={e => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen/>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
  grid-template-areas:
    "header"
    "main";
`

// grid-area 用来给 grid 子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div``
const Main = styled.main`grid-area: main`