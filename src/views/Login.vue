<template>
  <b-container class="d-flex h-100 justify-content-center align-items-center">
    <b-card style="width:66%" class="p-4" title="Giriş Yap">
      <center>
        <img
          class="w-50"
          src="https://i.sonhaberler.com/storage/old/images/upload/alo-182-mhrs-randevu.png"
          alt=""
        />
      </center>
      <b-form @submit.prevent="clickLogin">
        <b-form-group label="Tc Kimlik:">
          <b-form-input
            v-model="loginData.tc_no"
            placeholder="TC Kimlik Numaranız"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Parola:">
          <b-form-input
            type="password"
            v-model="loginData.password"
            placeholder="Parolanız"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-button type="submit" class="mr-2" variant="primary"
            >Giriş Yap</b-button
          >
          <router-link :to="{ name: 'Register' }">Kayıt ol</router-link>
        </b-form-group>

        <b-alert show variant="danger" v-if="msg">
          {{ msg }}
        </b-alert>
      </b-form>
    </b-card>
  </b-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginData: {
        tc_no: null,
        password: null
      },
      msg: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    async clickLogin() {
      try {
        await this.login(this.loginData);
        window.location.href = "/profile";
      } catch (error) {
        if (error.status === 404)
          this.msg =
            "Bu TC Kimlik numarasına ait bir kullanıcı bulunmamaktadır";
      }
    }
  }
};
</script>
