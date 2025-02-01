import Home from './client/Home.svelte'
import About from './client/About.svelte'
import TaskProject from './client/TaskProject.svelte'
import TaskProjectShow from './client/TaskProjectShow.svelte'
import TaskProjectExport from './client/task_project/Export.svelte';
//console.log("App.svelte");

export const routes = {
  '/': Home,
  '/about': About,
  '/task_project_show': TaskProjectShow,
  '/task_project/export': TaskProjectExport,
  '/task_project': TaskProject,
}
