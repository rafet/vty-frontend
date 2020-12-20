<template>
  <div class="pr-4 pl-4">
    <h2>Profilimi Düzenle</h2>
    <hr />
    <router-link style="color:black" :to="{ name: 'Profile' }"
      >← Profilime geri dön</router-link
    >

    <hr />
    <b-form-group label-cols="2" label-align="right" label="Tc Kimlik:">
      <b-form-input v-model="registerData.tc" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Adınız:">
      <b-form-input v-model="registerData.name" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Soyadınız:">
      <b-form-input v-model="registerData.surname" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Telefon numaranız:">
      <b-form-input v-model="registerData.mobile" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="E-mail adresiniz:">
      <b-form-input v-model="registerData.email" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="E-mail adresiniz:">
      <b-form-input v-model="registerData.location" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Doğum Tarihiniz:">
      <b-form-datepicker v-model="registerData.birthdate"></b-form-datepicker>
    </b-form-group>

    <b-form-group label-cols="2" label-align="right" label="Cinsiyetiniz:">
      <b-form-radio
        v-model="registerData.gender"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="male"
        >Erkek</b-form-radio
      >
      <b-form-radio
        v-model="registerData.gender"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="female"
        >Kadın</b-form-radio
      >
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Boyunuz:">
      <b-form-input
        type="number"
        v-model="registerData.tc"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Kilonuz:">
      <b-form-input
        type="number"
        v-model="registerData.tc"
        required
      ></b-form-input>
    </b-form-group>
    <center>
      <b-button variant="success" pill>Kaydet</b-button>
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerData: {
        tc: null,
        email: null,
        password: null,
        password2: null,
        mobile: null,
        gender: "male",
        birthdate: null
      }
    };
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>
