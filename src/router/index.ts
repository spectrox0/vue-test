// Composables
import { ROUTES_NAMES } from "@/utils";
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
        name: ROUTES_NAMES.HOME,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/users",
        name: ROUTES_NAMES.USERS,
        component: () => import("@/views/Users.vue"),
      },
      {
        path: "/users/edit/:id",
        name: ROUTES_NAMES.USERS_EDIT,
        component: () => import("@/views/UsersEdit.vue"),
      },
      {
        path: "/users/create",
        name: ROUTES_NAMES.USERS_CREATE,
        component: () => import("@/views/UsersCreate.vue"),
      },
      {
        path: "/menus",
        name: ROUTES_NAMES.MENUS,
        component: () => import("@/views/Menus.vue"),
      },
      {
        path: "/menus/edit/:id",
        name: ROUTES_NAMES.MENUS_EDIT,
        component: () => import("@/views/MenusEdit.vue"),
      },
      {
        path: "/menus/create",
        name: ROUTES_NAMES.MENUS_CREATE,
        component: () => import("@/views/MenusCreate.vue"),
      },
    ],
  },
  {
    name: ROUTES_NAMES.LOGIN,
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
