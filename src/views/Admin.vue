<template>
  <div class="p-5">
    <b-tabs content-class="mt-3">
      <b-tab title="Doktorlar" active>
        <div>
          <h6>Filtrele</h6>
          <b-link @click="type = 'hospital'">Hastaneye Göre</b-link>
          <b-link class="ml-2" @click="type = 'clinic'">Bölüme Göre</b-link>
          <b-form-group v-if="type === 'hospital'" label="Hastane">
            <b-form-select
              required
              v-model="filters.hospital_id"
              :options="
                hospitals.map(c => {
                  return { name: `${c.name}`, item: c.hospital_id };
                })
              "
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>
          <b-form-group v-else-if="type === 'clinic'" label="Bölüm">
            <b-form-select
              required
              v-model="filters.clinic_id"
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
          <b-form-group>
            <b-button v-if="type" size="sm" @click="filterDoctors"
              >Filtrele</b-button
            >
          </b-form-group>
        </div>
        <div>
          <b-row>
            <b-col cols="3" v-for="(doctor, index) in doctors" :key="index">
              <div class="doctor-card">
                <h5>{{ doctor.name }} {{ doctor.surname }}</h5>
                <p class="text-dark m-0">{{ doctor.clinic_name }}</p>
                <span style="font-size:12px">Maaş: {{ doctor.salary }}TL</span>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-tab>
      <b-tab title="Hastalar">
        <div
          class="patient-card"
          v-for="(patient, index) in patients"
          :key="index"
        >
          <h5>{{ patient.name }} {{ patient.surname }}</h5>
          <p>{{ patient.c }} hastalık</p>
          <span>Boy: {{ patient.height }} Kilo: {{ patient.weight }}</span>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      filters: {
        hospital_id: null,
        clinic_id: null
      },
      patients: null,
      type: ""
    };
  },
  methods: {
    ...mapActions([
      "getDoctors",
      "getClinics",
      "getHospitals",
      "getDoctorsByHospitalId",
      "getDoctorsByClinicId",
      "getDiseaseCounts"
    ]),
    filterDoctors() {
      if (this.type === "hospital")
        this.getDoctorsByHospitalId(this.filters.hospital_id);
      else if (this.type === "clinic")
        this.getDoctorsByClinicId(this.filters.clinic_id);
    }
  },
  computed: {
    ...mapState(["doctors", "clinics", "hospitals"])
  },
  async created() {
    this.getClinics();
    this.getHospitals();
    this.getDoctors();
    this.patients = await this.getDiseaseCounts(1);
  }
};
</script>
<style>
.doctor-card {
  border: 1px solid rgb(202, 202, 202);
  margin: 4px 0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  background: white;
}
.patient-card:hover,
.doctor-card:hover {
  background: rgb(243, 243, 243);
}

.patient-card {
  border: 1px solid rgb(202, 202, 202);
  margin: 4px 0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  background: white;
}
.patient-card h5,
.patient-card p {
  margin: 0;
}
.patient-card span {
  font-size: 12px;
}
</style>
