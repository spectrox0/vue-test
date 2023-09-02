// Composables
import { authGuard } from "@/utils/authGuard";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("@/views/Users.vue"),
      },
      {
        path: "/users/edit/:id",
        name: "User",
        component: () => import("@/views/UsersEdit.vue"),
      },
      {
        path: "/users/create",
        name: "UserCreate",
        component: () => import("@/views/UsersCreate.vue"),
      },
      {
        path: "/menus",
        name: "Menus",
        component: () => import("@/views/Menus.vue"),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Auth guard
router.beforeResolve(async (to, from, next) => {
  // If this isn't an initial page load and the user is not authenticated,
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
