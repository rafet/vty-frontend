<template>
  <div class="mr-4 ml-4">
    <b-modal
      id="apply-appointment"
      size="lg"
      centered
      title="Randevu Onay"
      ok-title="Onayla"
      @ok="makeApp"
      cancel-title="İptal"
    >
      <table class="apply-app w-100">
        <tr>
          <td>Doktor</td>
          <td>
            {{
              doctors.filter(x => x.item == appointmentData.doctor_id)[0].name
            }}
          </td>
        </tr>
        <tr>
          <td>Tarih</td>
          <td>
            {{ appointmentData.appointment_date }}
            {{ appointmentData.appointment_time }}:00
          </td>
        </tr>
        <tr>
          <td>Muayene Adresi</td>
          <td>
            {{ appointmentData.loc }}
          </td>
        </tr>
        <tr>
          <td>Hasta Adı</td>
          <td>{{ me.name + " " + me.surname }}</td>
        </tr>
        <tr>
          <td>Hasta Doğum Tarihi</td>
          <td>{{ me.birth_date }}</td>
        </tr>
        <tr>
          <td>Cep Telefonu</td>
          <td>{{ me.phone_number }}</td>
        </tr>
        <tr>
          <td>E-posta Adresi</td>
          <td>{{ me.email }}</td>
        </tr>
      </table>
    </b-modal>

    <h2>Randevu Al</h2>
    <hr />
    <b-form v-if="!successful" @submit.prevent="showApplyModal">
      <b-form-group label-cols="2" label-align="right" label="Bölüm">
        <b-form-select
          required
          v-model="appointmentData.clinic_id"
          :options="
            clinics.map(c => {
              return { name: `${c.clinic_name}`, item: c.clinic_id };
            })
          "
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-select>
      </b-form-group>
      <b-form-group label-cols="2" label-align="right" label="Doktor">
        <b-form-select
          :disabled="!doctors || doctors.length === 0"
          required
          v-model="appointmentData.doctor_id"
          :options="doctors"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-select>
      </b-form-group>
      <!-- <b-form-group label-cols="2" label-align="right" label="Birim">
        <b-form-select
          required
          v-model="appointmentData.departmentId"
          :options="departments"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-select>
      </b-form-group> -->

      <b-form-group label-cols="2" label-align="right" label="Tarih">
        <b-form-datepicker
          required
          v-model="appointmentData.appointment_date"
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group label-cols="2" label-align="right" label="Saat">
        <div class="hour-picker">
          <span
            @click="selectedHourIndex = index"
            v-for="(item, index) in hours"
            :key="index"
            :style="{ background: selectedHourIndex === index ? 'green' : '' }"
          >
            {{ item }}:00
          </span>
        </div>
      </b-form-group>
      <b-form-group label-cols="2" label-align="right" label="Adres">
        <b-textarea v-model="appointmentData.loc"></b-textarea>
      </b-form-group>
      <b-form-group label-cols="2" label-align="right" label="Açıklama">
        <b-textarea v-model="appointmentData.description"></b-textarea>
      </b-form-group>
      <b-form-group label-cols="2" label-align="right" label="">
        <b-alert show variant="primary"
          >Randevunuzu dilediğiniz zaman iptal edebilirsiniz.</b-alert
        >
      </b-form-group>
      <b-form-group label-align="right" label="">
        <center>
          <b-button type="submit" pill variant="success">Randevu Al</b-button>
        </center>
      </b-form-group>
    </b-form>
    <div v-else>
      <b-alert show variant="success">
        <h4 class="alert-heading">Randevunuz Alınmıştır!</h4>
        <p>
          Geçmiş randevularınızı ve en yakın randevunuzu
          <router-link style="color:unset" :to="{ name: 'Profile' }"
            >profilinizde</router-link
          >
          görüntüleyebilir ve iptal edebilirsiniz.
        </p>
      </b-alert>
      <table class="m-1 apply-app w-100">
        <tr>
          <td>Doktor</td>
          <td>
            {{
              doctors.filter(x => x.item == appointmentData.doctor_id)[0].name
            }}
          </td>
        </tr>
        <tr>
          <td>Tarih</td>
          <td>
            {{ appointmentData.appointment_date }}
            {{ appointmentData.appointment_time }}:00
          </td>
        </tr>
        <tr>
          <td>Muayene Adresi</td>
          <td>
            {{ appointmentData.loc }}
          </td>
        </tr>
        <tr>
          <td>Hasta Adı</td>
          <td>{{ me.name + " " + me.surname }}</td>
        </tr>
        <tr>
          <td>Hasta Doğum Tarihi</td>
          <td>{{ me.birth_date }}</td>
        </tr>
        <tr>
          <td>Cep Telefonu</td>
          <td>{{ me.phone_number }}</td>
        </tr>
        <tr>
          <td>E-posta Adresi</td>
          <td>{{ me.email }}</td>
        </tr>
      </table>

      <router-link
        style="color:unset;text-align:end;display:block;margin-right:40px;margin-top:22px"
        :to="{ name: 'Profile' }"
        >Profil sayfam →</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      hours: [9, 10, 11, 13, 14, 15, 16],
      selectedHourIndex: 2,
      appointmentData: {
        doctor_id: null,
        appointment_date: null,
        appointment_time: null,
        loc: null,
        description: " ",
        clinic_id: null
      },
      successful: undefined
    };
  },
  async created() {
    this.appointmentData.loc = this.me.location;
    await this.getDoctors();
    await this.getClinics();
  },
  computed: {
    ...mapGetters(["me"]),
    ...mapState(["doctors", "addedAppointment", "clinics"]),
    doctors() {
      return this.clinics
        .filter(c => c.clinic_id === this.appointmentData.clinic_id)
        .map(c => {
          return { name: `${c.name} ${c.surname}`, item: c.clinic_id };
        });
    }
  },
  methods: {
    ...mapActions(["getDoctors", "makeApoointment", "getClinics"]),
    showApplyModal() {
      this.$bvModal.show("apply-appointment");
    },
    makeApp() {
      this.appointmentData.appointment_time =
        this.hours[this.selectedHourIndex] + ":00";
      this.makeApoointment(this.appointmentData);

      // this.successful = true;
    }
  },
  watch: {
    selectedHourIndex() {
      this.appointmentData.appointment_time =
        this.hours[this.selectedHourIndex] + ":00";
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 20px;
  text-align: center;
}
.hour-picker {
  margin-top: 8px;
}
.hour-picker span {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 4px 8px;
  margin: 0 4px;
  text-align: center;
  cursor: pointer;
  background: rgb(68, 126, 173);
  color: white;
  user-select: none;
}
.hour-picker span:hover {
  background: rgb(89, 158, 214);
}
.apply-app tr {
  border-bottom: 1px solid #eee;
  line-height: 40px;
}
.apply-app tr :first-child {
  width: 200px;
  font-weight: 700;
}
</style>
