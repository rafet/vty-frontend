<template>
  <div class="ml-4 mt-4 mr-4">
    <b-modal
      id="add-disease-modal"
      centered
      title="Hastalık Ekle"
      hide-header
      hide-footer
    >
      <p class="my-4">
        <b-form-group label="Hastalık">
          <b-form-select
            required
            v-model="diseases_id"
            :options="
              allDiseases.map(c => {
                return { name: `${c.diseases_name}`, item: c.diseases_id };
              })
            "
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
        </b-form-group>
        <b-form-group>
          <center>
            <b-button @click="addDis" pill variant="success">Ekle</b-button>
          </center>
        </b-form-group>
      </p>
    </b-modal>
    <h2 class="d-flex" style="justify-content:space-between">
      <span>Hastalıklarım</span>

      <b-button v-b-modal.add-disease-modal size="sm" pill variant="success">
        <i class="fas fa-plus mr-1 "></i>Hastalık ekle</b-button
      >
    </h2>
    <b-table striped hover :items="rows" :fields="fields">
      <template #cell(actions)="row">
        <b-button
          pill
          variant="danger"
          @click="deleteDis(row.item.diseases_id)"
          size="sm"
          >Kaldır</b-button
        >
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      diseases_id: null,
      fields: [
        {
          key: "diseases_name",
          label: "Hastalık Adı"
        },
        {
          key: "clinic_name",
          label: "Birim"
        },
        {
          key: "actions",
          label: "İşlemler"
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      "getMyDiseases",
      "getAllDiseases",
      "addMyDiseases",
      "deleteMyDisease"
    ]),
    async addDis() {
      try {
        await this.addMyDiseases(this.diseases_id);
        this.$bvModal.hide("add-disease-modal");
      } catch (error) {
        this.$bvToast.toast("Aynı hastalığı 2 kere ekleyemezsiniz!", {
          title: `Hastalık eklenemedi!`,
          toaster: "b-toaster-top-center",
          variant: "danger",
          solid: true
        });
      }
    },
    async deleteDis(_id) {
      await this.deleteMyDisease(_id);
    }
  },
  async created() {
    await this.getMyDiseases();
    await this.getAllDiseases();
  },
  computed: {
    rows() {
      return this.diseases.map(a => {
        return {
          diseases_name: a.diseases_name,
          clinic_name: a.clinic_name,
          diseases_id: a.diseases_id
        };
      });
    },
    ...mapGetters(["patient_id"]),
    ...mapState(["diseases", "allDiseases"])
  }
};
</script>
