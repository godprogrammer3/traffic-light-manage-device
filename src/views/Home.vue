<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col
        align="center"
        justify="center"
        style="padding-left: 20vw; padding-right: 20vw"
      >
        <v-row align="center" justify="center">
          <v-col align="center" justify="center">
            <v-select
              placeholder="select device"
              :items="devicesNames"
              v-model="item"
              @change="updateItem"
              class="text-h6"
            >
            </v-select
          ></v-col>
          <v-col align="start" justify="start">
            <v-btn fab @click="addDevice">
              <v-icon>add</v-icon>
            </v-btn></v-col
          >
        </v-row>

        <vue-qrcode
          v-if="deviceInJson != ''"
          :value="deviceInJson"
          :scale="12"
        />
      </v-col>
    </v-row>
    <v-overlay :value="isOverlay">
      <v-progress-circular
        indeterminate
        color="green"
        size="200"
        width="10"
      ></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="isDialogShow" style="overflow-x: hidden">
      <v-container fill-hight fluid>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center">
            <v-card width="60vw" class="pa-5">
              <v-row align="center" justify="center">
                <span class="text-h5">ID :</span
                ><span class="text-h5 ml-5">{{ newDeviceId }}</span>
              </v-row>
              <v-row align="center" justify="center">
                <v-radio-group v-model="deviceType" row :mandatory="true">
                  <v-radio
                    label="normal"
                    value="normal"
                    style="
                      transform: scale(1.5);
                      margin-left: 5vw;
                      margin-right: 10vw;
                    "
                  ></v-radio>
                  <v-radio
                    label="genius"
                    value="genius"
                    style="transform: scale(1.5)"
                  ></v-radio>
                </v-radio-group>
              </v-row>
              <v-row align="center" justify="center">
                <v-btn
                  color="indigo"
                  class="text-h4 white--text ma-5"
                  width="7vw"
                  height="7vh"
                  style="height: auto; width: auto"
                  @click="saveDevice"
                  >save</v-btn
                >
                <v-btn
                  color="grey"
                  class="text-h4 white--text ma-5"
                  width="7vw"
                  height="7vh"
                  style="height: auto; width: auto"
                  @click="isDialogShow = false"
                  >cancel</v-btn
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import VueQrcode from "vue-qrcode";
import { v1 as uuidv1 } from "uuid";
import firebaseConfig from "@/store/firebase-config.json";
firebase.initializeApp(firebaseConfig);
export default {
  name: "Home",
  components: {
    VueQrcode,
  },
  data() {
    return {
      isOverlay: true,
      device: {},
      devices: [],
      devicesNames: [],
      item: {},
      deviceInJson: "",
      newDeviceId: "",
      isDialogShow: false,
      deviceType: "normal",
    };
  },
  mounted() {
    firebase
      .database()
      .ref("/devices")
      .on("value", (snapshot) => {
        console.log("-> Update");
        console.log("-> time stamp:", new Date().toLocaleString());
        this.isOverlay = false;
        if (snapshot.val()) {
          var devices = Object.entries(snapshot.val()).map((element) => {
            return {
              id: element[0],
              type: element[1].type,
            };
          });
          this.devices = devices;
          this.devicesNames = this.devices.map((element, index) => {
            return index + 1 + " : " + element.id;
          });
        }
      });
  },
  methods: {
    updateItem() {
      this.device = this.devices.find((element) => {
        return element.id == this.item.split(" : ")[1];
      });
      this.deviceInJson = JSON.stringify(this.device);
    },
    async addDevice() {
      this.newDeviceId = uuidv1();
      this.isDialogShow = true;
    },
    async saveDevice() {
      this.isOverlay = true;
      await firebase
        .database()
        .ref("/devices/" + this.newDeviceId)
        .set({
          type: this.deviceType,
        });
      this.isOverlay = false;
      this.isDialogShow = false;
    },
  },
};
</script>
