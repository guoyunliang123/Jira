import React from 'react';
import {Link} from "react-router-dom";
import {Routes, Route, Navigate} from 'react-router';
import {KanbanScreen} from "../kanban";
import {EpicScreen} from "../epic";

export const ProjectScreen = () => {
  return <div>
    <h1>ProjectScreen</h1>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      <Route path={'/kanban'} element={<KanbanScreen/>}/>
      <Route path={'/epic'} element={<EpicScreen/>}/>
      {/* replace={true} 是为了解决点击浏览器返回上一步无法返回 */}
      <Navigate to={window.location.pathname + '/kanban'} replace={true}/>
    </Routes>
  </div>;
}