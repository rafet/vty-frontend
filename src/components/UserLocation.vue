<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="field">
          <div class="ui right icon input large">
            <input
              type="text"
              placeholder="Enter your address"
              v-model="address"
              ref="autocomplete"
            />
            <div class="dot circle link icon" @click="locatorButtonPressed">
              a
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      address: null
    };
  },
  methods: {
    locatorButtonPressed() {
      console.log("a");
      navigator.geolocation.getCurrentPosition(
        async position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          await this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        error => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      console.log("aaaaaaa");
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDC_Uhj3v0EgfQbvxxBETKNU1QauBFHSTM"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
          console.log(this.address);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
