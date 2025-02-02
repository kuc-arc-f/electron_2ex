import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./client/Home.vue";
import About from "./client/About.vue";
import Todo from "./client/Todo.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About } ,
  { path: "/todo", component: Todo }
];
const router = createRouter({
  history: createWebHashHistory(), // ハッシュモードを有効化
  routes
});

export default router;
