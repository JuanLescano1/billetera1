<template>
  <div>
    <button @click="mostrarBTC">Mostrar BTC</button>
    <button @click="mostrarETH">Mostrar ETH</button>
    <button @click="mostrarUSDT">Mostrar USDT</button>

    <div v-if="monedaSeleccionada === 'btc' && getBtcData">
      <h2>Datos BTC</h2>
      <p v-for="(exchange, name) in getBtcData" :key="name">
        {{ name }}: Ask - {{ exchange.ask }}
      </p>
    </div>
    <div v-if="monedaSeleccionada === 'eth' && getEthData">
      <h2>Datos ETH</h2>
      <p v-for="(exchange, name) in getEthData" :key="name">
        {{ name }}: Ask - {{ exchange.ask }}
      </p>
    </div>
    <div v-if="monedaSeleccionada === 'usdt' && getUsdtData">
      <h2>Datos USDT</h2>
      <p v-for="(exchange, name) in getUsdtData" :key="name">
        {{ name }}: Ask - {{ exchange.ask }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      monedaSeleccionada: "btc",
    };
  },
  computed: {
    ...mapGetters([
      "getBtcData",
      "getEthData",
      "getUsdtData",
      "errorAccederApi",
    ]),
  },
  methods: {
    cargaDatos() {
      this.$store.dispatch("consultaApi");
    },
    mostrarBTC() {
      this.monedaSeleccionada = "btc";
    },
    mostrarETH() {
      this.monedaSeleccionada = "eth";
    },
    mostrarUSDT() {
      this.monedaSeleccionada = "usdt";
    },
  },
  mounted() {
    this.cargaDatos();
  },
};
</script>
<style scoped></style>
