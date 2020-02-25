import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
      component: () => import("../views/Home.vue")
  },
  {
    path: "/socket",
    name: "Socket",
      component: () => import("../views/Socket.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue")
  },
  {
    path: "/users/user/:id",
    name: "User",
    component: () => import("../views/User.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
