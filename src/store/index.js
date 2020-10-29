import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    devices: []
  },
  mutations: {
    // UPDATE_DEVICES(state, payload) {
    //   state.devices = payload;
    // }
  },
  actions: {
    // setDevicesListener({ commit }) {
    //   var devicesRef = firebase.database().ref('/devices');
    //   devicesRef.on('value', (snatshot) => {
    //     commit('UPDATE_DEVICES', snatshot.val);
    //   })
    // }
  },
  getters: {
    // getDevices() {
    //   return this.state.devices;
    // }
  },
  modules: {
  }
})
