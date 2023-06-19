import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
