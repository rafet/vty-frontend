<template>
  <div class="profile">
    <img class="cover w-100" src="../assets/profile-bg.jpeg" alt="" />

    <img
      class="avatar"
      v-if="me.gender === 'male'"
      src="../assets/man.png"
      alt=""
    />
    <img class="avatar" v-else src="../assets/woman.png" alt="" />
    <div class="user-name">
      <p class="name">{{ me.name + " " + me.surname }}</p>
      <p class="body">
        <span>Boy: {{ me.height }} cm Kilo: {{ me.weight }} kg </span>

        <router-link :to="{ name: 'EditProfile' }">
          <b-button pill variant="success" size="sm"
            >Profilimi Düzenle</b-button
          >
        </router-link>
      </p>
    </div>
    <center
      v-if="
        closeAppointment.length > 0 &&
          closeAppointment[0].is_cancelled === false
      "
    >
      <hr class="mt-4" />
      <div class="coming-appointment">
        <i class="fas fa-calendar"></i>
        <div>
          <p class="m-0">
            Bir sonraki randevunuz
            {{
              formatDate(
                closeAppointment[0].appointment_date,
                closeAppointment[0].appointment_time
              )
            }}
            tarihinde
            <b>{{
              closeAppointment[0].name + " " + closeAppointment[0].surname
            }}</b>
            ile birlikte.
          </p>
          <p class="m-0">
            {{ timeLeft(closeAppointment[0].appointment_date) }} kaldı
          </p>
        </div>
        <b-button
          variant="danger"
          pill
          style="cursor:pointer"
          class="ml-4"
          size="sm"
          @click="deleteAppointment(closeAppointment[0].appointment_id)"
          >İptal Et</b-button
        >
      </div>
    </center>
    <hr class="mt-3" />
    <b-row class="mt-5 ml-3 mr-3">
      <b-col>
        <div class="profile-box">
          <h6>
            <div>
              <i class="fas fa-calendar-check mr-2"></i>Geçmiş Randevularım
              <b-badge pill variant="primary">{{
                appointments.length
              }}</b-badge>
            </div>
            <router-link :to="{ name: 'MakeAnAppointment' }">
              <b-badge style="cursor:pointer" pill variant="success"
                ><i class="fas fa-plus mr-1"></i>Randevu Al</b-badge
              >
            </router-link>
          </h6>
          <ul class="past-appointments">
            <li v-for="(app, index) in pastAppointments" :key="index">
              <i
                v-if="!app.is_cancelled"
                v-b-tooltip.hover.v-success
                title="Tamamlandı"
                class="fas fa-check"
                style="color:green"
              ></i>

              <i
                v-else
                v-b-tooltip.hover.v-danger
                title="İptal edildi"
                class="fas fa-times"
                style="color:red"
              ></i>

              <div style="flex:1">
                <div class="name-date">
                  <h6>{{ app.name + " " + app.surname }}</h6>
                  <p>
                    {{ formatDate(app.appointment_date, app.appointment_time) }}
                  </p>
                </div>
                <p>{{ app.clinic_name }}</p>
              </div>
            </li>
          </ul>
          <div class="mt-3" v-if="pastAppointments.length === 0">
            Geçmiş randevu yok
          </div>
        </div></b-col
      >
      <b-col>
        <div class="profile-box">
          <h6>
            <div>
              <i class="fas fa-viruses mr-2"></i>Hastalıklarım
              <b-badge pill variant="primary">{{ diseases.length }}</b-badge>
            </div>
          </h6>
          <ul class="diseases">
            <li v-for="(disease, index) in diseases" :key="index">
              <div style="flex:1">
                <div class="name-date">
                  <h6>{{ disease.diseases_name }}</h6>
                  <!-- <p>{{ disease.date }}</p> -->
                </div>
              </div>
            </li>
          </ul>
        </div></b-col
      >
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // appointments: [
      //   {
      //     doctorName: "Prof. Dr. İrem Ekser",
      //     department: "Kalp Damar Hastalıkları",
      //     date: "01.02.2020",
      //     done: true
      //   },
      //   {
      //     doctorName: "Prof. Dr. Mehmet D. Deniz",
      //     department: "Ortopedi",
      //     date: "03.02.2020",
      //     done: true
      //   },
      //   {
      //     doctorName: "Prof. Dr. Şeyma Çınar",
      //     department: "Kalp Damar Hastalıkları",
      //     date: "06.02.2020",
      //     done: false
      //   }
      // ],

      isDeleteAppointment: null
    };
  },
  async created() {
    await this.getMyAppointments();
    await this.getMyDiseases();
  },
  computed: {
    ...mapGetters(["me"]),
    ...mapState(["appointments", "diseases"]),
    closeAppointment() {
      return this.appointments.filter(app => {
        let d = new Date(app.appointment_date).getTime();
        d += parseInt(app.appointment_time.split(":")[0]) * 60 * 60 * 1000;
        return Date.now() < d && !d.is_cancelled;
      });
    },
    pastAppointments() {
      return this.appointments.filter(x => x.isPast || x.is_cancelled);
    }
  },
  methods: {
    timeLeft(d1) {
      let date1 = new Date(d1);
      let seconds = (date1.getTime() - Date.now()) / 1000;
      let min = seconds / 60;
      seconds = seconds % 60;
      let hour = min / 60;
      min = min % 60;
      let day = hour / 24;
      hour = hour % 24;
      let str = "";
      if (day) str += `${parseInt(day)} gün`;
      if (hour) str += ` ${parseInt(hour)} saat`;
      if (min) str += ` ${parseInt(min)} dakika`;
      return str;
    },
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
    },
    ...mapActions(["getMyAppointments", "cancelAppointment", "getMyDiseases"]),
    deleteAppointment(_id) {
      this.isDeleteAppointment = "";
      this.$bvModal
        .msgBoxConfirm("Randevunuzu iptal etmek istediğinize emin misiniz?", {
          title: "Doğrulayın",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Evet",
          cancelTitle: "Hayır",
          footerClass: "p-2",
          cancelVariant: "link",
          hideHeaderClose: false,
          centered: true
        })
        .then(async value => {
          if (value) {
            await this.cancelAppointment({
              appointment_id: _id,
              is_cancelled: true
            });
            this.closeAppointment[0].is_cancelled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.profile img.cover {
  height: 200px;
  object-fit: cover;
}
.profile img.avatar {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-top: -75px;
  margin-left: 35px;
  border: 7px solid white;
  background: white;
}
.profile .user-name {
  margin-left: 6px;
  margin-top: 6px;
}
.profile .user-name p.name {
  font-weight: 700;
  font-size: 22px;
  margin-left: 190px;
  margin-top: -75px;
  color: rgb(66, 66, 66);
}
.profile .user-name p.body {
  font-weight: 400;
  font-size: 16px;
  margin-left: 190px;
  margin-top: -20px;
  color: rgb(66, 66, 66);
  display: flex;
  justify-content: space-between;
  margin-right: 32px;
}
.profile-box {
  padding: 20px;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 12px;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
}
.profile-box h6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-box i {
  margin-right: 8px;
}
.past-appointments {
  list-style-type: none;
  margin: 0 10px;
}
.past-appointments li i {
  margin-right: 18px;
}
.past-appointments li {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.past-appointments h6 {
  margin: 0;
  font-weight: 700;
}
.past-appointments p {
  margin: 0;
  color: rgb(134, 134, 134);
  font-weight: 300;
  font-size: 14px;
}
.past-appointments .name-date {
  display: flex;
  justify-content: space-between;
}

.diseases {
  list-style-type: none;
  margin: 0 10px;
}
.diseases li i {
  margin-right: 18px;
}
.diseases li {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.diseases h6 {
  margin: 0;
  font-weight: 700;
}
.diseases p {
  margin: 0;
  color: rgb(134, 134, 134);
  font-weight: 300;
  font-size: 14px;
}
.diseases .name-date {
  display: flex;
  justify-content: space-between;
}
.coming-appointment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 32px;
}
.coming-appointment i {
  font-size: 45px;
  margin-right: 20px;
}
.coming-appointment button {
  margin-left: 12px;
}
</style>
