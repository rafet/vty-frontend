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

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: null
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      layout: null
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/profile/edit",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/make-an-appointment",
    name: "MakeAnAppointment",
    component: MakeAnAppointment,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/my-appointments",
    name: "MyAppointments",
    component: MyAppointments,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/my-diseases",
    name: "MyDiseases",
    component: MyDiseases,
    meta: {
      layout: "default"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
