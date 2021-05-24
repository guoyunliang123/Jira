import React from "react"
import {User} from 'screens/project-list/search-panel'
import {Table, TableProps} from "antd";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number
}

interface ListProps extends TableProps<Project>{
  // list: Project[];
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      }, {
        title: '部门',
        dataIndex: 'organization',
      }, {
        title: '负责人',
        render: (value, project) => {
          return <span>{users.find(user => user.id === project.personId)?.name || "未知"}</span>
        }
      }, {
        title: '创建时间',
        render: (value, project) => {
          return (
            <span>
              {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
          )
        }
      }]}
      // dataSource={list}
      {...props}
    />
  )

  // return <table style={{margin: "50px auto"}}>
  //   <thead>
  //     <tr>
  //       <th>名称</th>
  //       <th>负责人</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {
  //       list.map(project => <tr key={project.id}>
  //         <td>{project.name}</td>
  //         {/* undefined.name */}
  //         <td>{users.find(user => user.id === project.personId)?.name || "未知"}</td>
  //       </tr>)
  //     }
  //   </tbody>
  // </table>
}