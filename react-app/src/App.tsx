

import React from "react";
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './client/home';
import About from './client/about';
import TaskProject from './client/TaskProject';
import TaskProjectShow from './client/TaskProjectShow';
import TaskProjectExport from './client/TaskProject/Export';
import TaskProjectCreate from './client/TaskProject/Create';
import TaskItemsCreate from './client/TaskItems/Create';
import TaskItemsEdit from './client/TaskItems/Edit';
import Todo14 from './client/todo14';
import Todo15 from './client/todo15';

export default function App(){
  return(
  <div className="App">
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/task_project/export" element={<TaskProjectExport />} />
        <Route path="/task_project_show" element={<TaskProjectShow />} />
        <Route path="/task_project/create" element={<TaskProjectCreate />} />
        <Route path="/task_project" element={<TaskProject />} />
        <Route path="/task_items/create" element={<TaskItemsCreate />} />
        <Route path="/task_items/edit" element={<TaskItemsEdit />} />
      </Routes>
    </HashRouter>
  </div>
  )
}
