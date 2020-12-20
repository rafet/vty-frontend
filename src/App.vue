<template>
  <div id="app">
    <div class="h-100">
      <b-row class="h-100 justify-content-center">
        <b-col v-if="layout !== null" cols="3" class="sidebar">
          <center>
            <img src="./assets/logo.png" alt="" />
          </center>
          <hr />
          <ul>
            <router-link :to="{ name: 'Profile' }"
              ><li><i class="fas fa-user"></i>Profilim</li></router-link
            >
            <router-link :to="{ name: 'MyAppointments' }">
              <li>
                <i class="fas fa-calendar-check"></i>Randevularım
              </li></router-link
            >
            <router-link :to="{ name: 'MyDiseases' }">
              <li><i class="fas fa-viruses"></i>Hastalıklarım</li></router-link
            >
            <hr />
            <router-link :to="{ name: 'MakeAnAppointment' }">
              <li><i class="fas fa-user-md"></i>Randevu Al</li></router-link
            >
            <li @click="logOut" class="last">
              <i class="fas fa-sign-out-alt"></i>Çıkış yap
            </li>
          </ul>
        </b-col>
        <b-col cols="9" class="m-0 p-0">
          <router-view />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import router from "./router";
export default {
  computed: {
    ...mapState(["me"]),
    layout() {
      return router.currentRoute.meta.layout;
    }
  },
  methods: {
    ...mapActions(["getMe", "logOut"])
  },
  created() {
    this.getMe();
  }
};
</script>
<style scoped>
.sidebar {
  padding: 0;
  border-right: 1px solid rgb(170, 170, 170);
}
.sidebar img {
  width: 70%;
  margin-top: 25px;
}
.sidebar ul {
  box-sizing: border-box;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 12px;
  padding: 0;
}
.sidebar ul .space {
  margin: 0 auto;
}

.sidebar ul li {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  padding-left: 46px;
  color: rgb(70, 70, 70) !important;
  user-select: none;
}
.sidebar ul li:hover {
  background: rgb(233, 233, 233);
}
.sidebar ul li:active {
  background: rgb(216, 216, 216);
}
.sidebar ul li i {
  color: black;
  margin-right: 16px;
}
</style>
