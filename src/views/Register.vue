<template>
  <b-container class="d-flex  justify-content-center">
    <b-card style="width:60%" class=" p-4" title="Kaydol">
      <center>
        <img
          class="w-50"
          src="https://i.sonhaberler.com/storage/old/images/upload/alo-182-mhrs-randevu.png"
          alt=""
        />
      </center>
      <b-form @submit.prevent="clickRegister">
        <b-form-group label="Tc Kimlik:">
          <the-mask
            min-length="11"
            max-length="11"
            class="form-control"
            v-model="registerData.tc_no"
            required
            mask="###########"
          />
        </b-form-group>
        <b-form-group label="Adınız:">
          <b-form-input v-model="registerData.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Soyadınız:">
          <b-form-input v-model="registerData.surname" required></b-form-input>
        </b-form-group>
        <b-form-group label="Telefon numaranız:">
          <the-mask
            class="form-control"
            v-model="registerData.phone_number"
            required
            :mask="['(###) ###-##-##', '#(###) ###-##-##']"
          />
        </b-form-group>
        <b-form-group label="E-mail adresiniz:">
          <b-form-input
            type="email"
            v-model="registerData.email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Adresiniz:">
          <b-overlay :show="loadingLocation" rounded="sm">
            <b-link @click="locatorButtonPressed">
              <i class="fas fa-compass mr-2"></i>Konumumu kullan
            </b-link>
            <b-form-textarea
              v-model="registerData.location"
              required
            ></b-form-textarea>
          </b-overlay>
        </b-form-group>
        <b-form-group label="Doğum Tarihiniz:">
          <b-form-datepicker
            v-model="registerData.birth_date"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group label="Cinsiyetiniz:" class="d-flex">
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

        <b-form-group label="Boy:">
          <b-form-input
            type="number"
            v-model="registerData.height"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Kilo:">
          <b-form-input
            type="number"
            v-model="registerData.weight"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Parola:">
          <b-form-input
            type="password"
            v-model="registerData.password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Parola Onay:">
          <b-form-input
            type="password"
            v-model="registerData.password2"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox required v-model="kvkk">
            KVKK koşullarını okudum ve kabul ediyorum.
          </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" class="mr-2" :disabled="!kvkk" variant="primary"
          >Kaydol</b-button
        >
      </b-form>
    </b-card>
  </b-container>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      loadingLocation: false,
      kvkk: false,
      registerData: {
        tc_no: null,
        email: null,
        password: null,
        password2: null,
        phone_number: null,
        gender: "male",
        height: null,
        weight: null,
        birth_date: null,
        location: null
      }
    };
  },
  methods: {
    ...mapActions(["register"]),
    async clickRegister() {
      try {
        await this.register(this.registerData);
        window.location.href = "/profile";
      } catch (error) {
        console.log(error);
      }
    },
    locatorButtonPressed() {
      this.loadingLocation = true;

      navigator.geolocation.getCurrentPosition(
        async position => {
          await this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
          this.loadingLocation = false;
        },
        error => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDC_Uhj3v0EgfQbvxxBETKNU1QauBFHSTM"
        );
        if (!data.error_message) {
          console.log(data.error_message);
          this.registerData.location = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
