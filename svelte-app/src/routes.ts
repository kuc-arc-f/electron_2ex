import Home from './client/Home.svelte'
import About from './client/About.svelte'
import TaskProject from './client/TaskProject.svelte'
import TaskProjectShow from './client/TaskProjectShow.svelte'
import TaskProjectExport from './client/task_project/Export.svelte';
import TaskItemsCreate from './client/task_items/Create.svelte'
import TaskItemsEdit from './client/task_items/Edit.svelte'
import TaskProjectCreate from './client/task_project/Create.svelte';
import Todo from './client/Todo.svelte'
//console.log("App.svelte");

export const routes = {
  '/': Home,
  '/about': About,
  '/task_project/create': TaskProjectCreate,
  '/task_project_show': TaskProjectShow,
  '/task_project/export': TaskProjectExport,
  '/task_project': TaskProject,
  '/task_items/create': TaskItemsCreate,
  '/task_items/edit': TaskItemsEdit,
  '/todo': Todo,
}
