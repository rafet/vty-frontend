<template>
  <div class="ml-4 mt-4 mr-4">
    <h2 class="d-flex" style="justify-content:space-between">
      <span>Randevularım</span>
      <router-link :to="{ name: 'MakeAnAppointment' }">
        <b-button size="sm" pill variant="success">
          <i class="fas fa-plus mr-1 "></i>Randevu Al</b-button
        ></router-link
      >
    </h2>
    <b-table striped hover :items="rows" :fields="fields">
      <template #cell(actions)="row">
        <b-button
          v-if="!row.isPast"
          pill
          variant="danger"
          @click="cancelAppointment(row.appointment_id)"
          size="sm"
          >İptal et</b-button
        >
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Doktor Adı"
        },
        {
          key: "clinic_name",
          label: "Birim"
        },
        {
          key: "date",
          label: "Tarih"
        },
        {
          key: "location",
          label: "Adres"
        },
        {
          key: "description",
          label: "Açıklama"
        },
        {
          key: "actions",
          label: "İşlemler"
        }
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  },
  methods: {
    ...mapActions(["getMyAppointments"]),
    formatDate: (d, t) => {
      var monthNames = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ];
      var date = new Date(d);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return `${day} ${monthNames[monthIndex]} ${year} ${t.substring(0, 5)}`;
    }
  },
  created() {
    this.getMyAppointments();
  },
  computed: {
    rows() {
      return this.appointments.map(a => {
        return {
          name: a.name + " " + a.surname,
          clinic_name: a.clinic_name,
          date: this.formatDate(a.appointment_date, a.appointment_time),
          location: a.location,
          description: a.description
        };
      });
    },
    ...mapState(["appointments"])
  }
};
</script>
