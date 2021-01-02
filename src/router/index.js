import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import EditProfile from "../views/EditProfile.vue";
import MakeAnAppointment from "../views/MakeAnAppointment.vue";
import MyAppointments from "../views/MyAppointments.vue";
import MyDiseases from "../views/MyDiseases.vue";
import Admin from "../views/Admin.vue";
import VueJwtDecode from "vue-jwt-decode";
Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  const token = Vue.ls.get("token");

  const authUser = Vue.ls.get("token");

  if (to.meta.requiresAuth) {
    if (authUser) {
      const { role } = VueJwtDecode.decode(token);

      if (to.meta.roles && to.meta.roles.length > 0) {
        if (to.meta.roles.includes(role)) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else {
      Vue.ls.clear();
      next("/login");
    }
  } else {
    next();
  }
};

const ifNotAuthenticated = (to, from, next) => {
  const authUser = Vue.ls.get("token");
  if (!authUser) {
    next();
  } else {
    next("/profile");
  }
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      layout: null,
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: ifNotAuthenticated,
    meta: {
      layout: null,
      requiresAuth: false
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/profile/edit",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/make-an-appointment",
    name: "MakeAnAppointment",
    component: MakeAnAppointment,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/my-appointments",
    name: "MyAppointments",
    component: MyAppointments,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/my-diseases",
    name: "MyDiseases",
    component: MyDiseases,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/*",
    name: "all",
    beforeEnter: (to, from, next) => {
      next("/login");
    },
    meta: {
      layout: "default",
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
