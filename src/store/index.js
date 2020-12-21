import Vue from "vue";
import Vuex from "vuex";
import API from "../axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    doctors: [],
    registeredPerson: null,
    me: null,
    appointments: [],
    addedAppointment: null,
    clinics: [],
    diseases: null,
    allDiseases: null
  },
  getters: {
    tc_no() {
      return Vue.ls.get("person").tc_no;
    },
    patient_id() {
      return Vue.ls.get("person").patient_id;
    },
    me() {
      return Vue.ls.get("person");
    }
  },
  mutations: {
    SET_DOCTORS(state, doctors) {
      state.doctors = doctors;
    },
    SET_REGISTERED_PERSON(state, person) {
      state.registeredPerson = person;
    },
    LOGIN(state, data) {
      state.token = data.token;
      state.person = data.person;
      Vue.ls.set("token", data.token);
      Vue.ls.set("person", data.person);
    },
    SET_ME(state, me) {
      state.me = me;
    },
    SET_MY_APPOINTMENTS(state, appointments) {
      state.appointments = appointments;
    },
    SET_ADDED_APPOINTMENT(state, addedAppointment) {
      state.addedAppointment = addedAppointment;
    },
    SET_CLINICS(state, clinics) {
      state.clinics = clinics;
    },
    SET_MY_DISEASES(state, diseases) {
      state.diseases = diseases;
    },
    SET_ALL_DISEASES(state, diseases) {
      state.allDiseases = diseases;
    },
    DELETE_DISEASES(state, disease_id) {
      state.diseases = state.diseases.filter(x => x.diseases_id !== disease_id);
    },
    CANCEL_APPOINTMENT(state, appointment_id) {
      state.appointments.forEach(x => {
        if (x.appointment_id === appointment_id) x.is_cancelled = true;
      });
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        const res = await API.post("/person/login/", { ...payload });

        commit("LOGIN", res.data);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    register: async ({ commit }, payload) => {
      try {
        const res = await API.post("/person/", { ...payload });
        commit("SET_REGISTERED_PERSON", res.data.person);
        Vue.ls.set("token", res.data.token);
        Vue.ls.set("person", res.data.person);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getDoctors: async ({ commit }) => {
      try {
        const res = await API.get("/doctor/");
        commit("SET_DOCTORS", res.data);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getMe: async ({ commit, getters }) => {
      try {
        const res = await API.get(`/person/${getters.tc_no}`);
        console.log(res.data.person);
        commit("SET_ME", res.data.person);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getMyAppointments: async ({ commit, getters }) => {
      try {
        const res = await API.get(`/appointment/?tc_no=${getters.tc_no}`);
        const appointments = res.data.appointments.map(x => {
          return {
            ...x,
            isPast:
              +Date.now() >
              new Date(x.appointment_date).getTime() +
                parseInt(x.appointment_time.split(":")[0]) * 60 * 60 * 1000
          };
        });
        console.log(appointments);
        commit("SET_MY_APPOINTMENTS", appointments);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    makeApoointment: async ({ commit, getters }, payload) => {
      try {
        const res = await API.post("/appointment/", {
          ...payload,
          patient_id: getters.patient_id
        });
        commit("SET_ADDED_APPOINTMENT", res.data.appointment);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getClinics: async ({ commit }) => {
      try {
        const res = await API.get("/clinic/");
        commit("SET_CLINICS", res.data);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getMyDiseases: async ({ commit, getters }) => {
      const res = await API.get(`/have-diseases/?tc_no=${getters.tc_no}`);
      commit("SET_MY_DISEASES", res.data);
    },
    cancelAppointment: async ({ commit }, payload) => {
      await API.put(`/appointment/${payload.appointment_id}/cancel`, {
        is_cancelled: true
      });
      commit("CANCEL_APPOINTMENT", payload.appointment_id);
    },
    getAllDiseases: async ({ commit }) => {
      const res = await API.get(`/diseases/`);
      commit("SET_ALL_DISEASES", res.data.allDiseases);
    },
    addMyDiseases: async ({ dispatch, getters }, diseases_id) => {
      await API.post(`/have-diseases/`, {
        diseases_id: diseases_id,
        patient_id: getters.patient_id
      });
      dispatch("getMyDiseases");
    },
    deleteMyDisease: async ({ commit, getters }, diseases_id) => {
      await API.delete(
        `/have-diseases/?diseases_id=${diseases_id}&patient_id=${getters.patient_id}`
      );
      commit("DELETE_DISEASES", diseases_id);
    },
    logOut() {
      Vue.ls.clear();
      window.location.href = "/login";
    }
  },
  modules: {}
});
