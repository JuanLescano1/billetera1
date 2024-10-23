import { createStore } from "vuex";
import eventService from "@/services/EventService.js";
import moment from "moment";
export default createStore({
  state: {
    btcData: null,
    ethData: null,
    usdtData: null,
    error: null,
  },
  getters: {
    getBtcData(state) {
      return state.btcData;
    },
    getEthData(state) {
      return state.ethData;
    },
    getUsdtData(state) {
      return state.usdtData;
    },
    errorAccederApi(state) {
      return state.error;
    },
  },
  mutations: {
    actBtcData(state, data) {
      state.btcData = data;
    },
    actEthData(state, data) {
      state.ethData = data;
    },
    actUsdtData(state, data) {
      state.usdtData = data;
    },
    actError(state) {
      state.error = true;
    },
  },
  actions: {
    async darFormatoFecha(_, tiempo) {
      const nuevaFecha = await moment
        .unix(tiempo)
        .local()
        .format("YYYY-MM-DDTHH:mm:ss.SSS-03:00");
      return nuevaFecha;
    },
    consultaApi({ commit }) {
      const actApi = async () => {
        try {
          const responseBTC = await eventService.monedas("BTC", "ars");
          commit("actBtcData", responseBTC.data);
          const responseETH = await eventService.monedas("ETH", "ars");
          commit("actEthData", responseETH.data);
          const responseUSDT = await eventService.monedas("USDT", "ars");
          commit("actUsdtData", responseUSDT.data);
          console.log("Datos BTC:", responseBTC.data);
          console.log("Datos ETH:", responseETH.data);
          console.log("Datos USDT:", responseUSDT.data);
        } catch (error) {
          console.log(error);
          commit("actError", true);
        }
      };
      setInterval(actApi, 60000);
      actApi();
    },
  },
  modules: {},
});
