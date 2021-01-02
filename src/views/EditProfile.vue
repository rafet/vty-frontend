<template>
  <div class="pr-4 pl-4">
    <h2>Profilimi Düzenle</h2>
    <hr />
    <router-link style="color:black" :to="{ name: 'Profile' }"
      >← Profilime geri dön</router-link
    >

    <hr />

    <b-form-group label-cols="2" label-align="right" label="Tc Kimlik:">
      <b-form-input v-model="tc_no" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Adınız:">
      <b-form-input v-model="meCopy.name" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Soyadınız:">
      <b-form-input v-model="meCopy.surname" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Telefon numaranız:">
      <b-form-input v-model="meCopy.phone_number" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="E-mail adresiniz:">
      <b-form-input v-model="meCopy.email" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="E-mail adresiniz:">
      <b-form-input v-model="meCopy.location" required></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Doğum Tarihiniz:">
      <b-form-datepicker v-model="meCopy.birth_date"></b-form-datepicker>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Cinsiyetiniz:">
      <b-form-radio v-model="meCopy.gender" name="some-radios" value="Erkek"
        >Erkek</b-form-radio
      >
      <b-form-radio v-model="meCopy.gender" name="some-radios" value="Kadın"
        >Kadın</b-form-radio
      >
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Boyunuz:">
      <b-form-input
        type="number"
        v-model="meCopy.height"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label-cols="2" label-align="right" label="Kilonuz:">
      <b-form-input
        type="number"
        v-model="meCopy.weight"
        required
      ></b-form-input>
    </b-form-group>
    <center>
      <b-overlay :show="loading">
        <b-button variant="success" @click="clickSave" pill>Kaydet</b-button>
      </b-overlay>
    </center>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      meCopy: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["me", "tc_no"]),
    changes() {
      return Object.entries(this.meCopy)
        .filter(([key, val]) => this.me[key] !== val)
        .reduce((accum, [k, v]) => {
          accum[k] = v;
          return accum;
        }, {});
    }
  },
  methods: {
    ...mapActions(["updatePerson"]),
    async clickSave() {
      this.loading = true;
      await this.updatePerson(this.changes);
      this.loading = false;
    }
  },
  created() {
    this.meCopy = { ...this.me };
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>
