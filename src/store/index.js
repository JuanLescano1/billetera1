import { createStore } from "vuex";
import eventService from "@/services/EventService.js";
import moment from "moment";
export default createStore({
  state: {
    btcData: null,
    ethData: null,
    usdtData: null,
    error: null,
    usuarioAutenticado: JSON.parse(
      localStorage.getItem("usuarioAutenticado") || "false"
    ),
    usuarios: JSON.parse(localStorage.getItem("usuarios") || "[]"),
  },
  getters: {
    usuarioAutenticado(state) {
      const usuarioCerrado = state.usuarioAutenticado;
      console.log("usuario cerrado", usuarioCerrado);
      return usuarioCerrado;
    },
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
    establecerAutenticado(state, value) {
      state.usuarioAutenticado = value;
    },
    agregarUsuario(state, { id, datos }) {
      const usuarioExistente = state.usuarios.find(
        (usuario) => usuario.id === id
      );
      if (!usuarioExistente) {
        state.usuarios.push({ id, datos });
        localStorage.setItem("usuarios", JSON.stringify(state.usuarios));
      }
    },
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
    inicio({ commit }, idUsuario) {
      commit("establecerAutenticado", true);
      commit("agregarUsuario", { id: idUsuario, datos: {} });
      localStorage.setItem("idUsuario", idUsuario);
      localStorage.setItem("usuarioAutenticado", true);
    },
    cierre({ commit }) {
      commit("establecerAutenticado", false);
      localStorage.setItem("usuarioAutenticado", false);
    },
    consultaApi({ commit }) {
      const actApi = async () => {
        try {
          const darFormatoFecha = (tiempo) => {
            const nuevaFecha = moment
              .unix(tiempo)
              .local()
              .format("YYYY-MM-DDTHH:mm:ss.SSS-03:00");
            return nuevaFecha;
          };
          const responseBTC = await eventService.monedas("BTC", "ars");
          for (const exchange in responseBTC.data) {
            if (await responseBTC.data[exchange].time) {
              responseBTC.data[exchange].time = await darFormatoFecha(
                responseBTC.data[exchange].time
              );
            }
          }
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
