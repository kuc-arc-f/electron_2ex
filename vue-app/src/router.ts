import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./client/Home.vue";
import About from "./client/About.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
];
const router = createRouter({
  history: createWebHashHistory(), // ハッシュモードを有効化
  routes
});

export default router;
