<template>
  <div>
    <button @click="mostrarBTC">Mostrar BTC</button>
    <button @click="mostrarETH">Mostrar ETH</button>
    <button @click="mostrarUSDT">Mostrar USDT</button>
    <div v-if="!errorAccederApi">
      <div v-if="monedaSeleccionada === 'btc' && getBtcData">
        <h2>Datos BTC</h2>
        <p v-for="(exchange, name) in getBtcData" :key="name">
          Exchange: {{ name }} - Precio de compra: {{ exchange.ask }} - Precio
          de compra con comisiones:
          {{ exchange.totalAsk }}
          <button @click="compraCripto('btc', name)">Compra</button>
        </p>
      </div>
      <div v-if="monedaSeleccionada === 'eth' && getEthData">
        <h2>Datos ETH</h2>
        <p v-for="(exchange, name) in getEthData" :key="name">
          Exchange: {{ name }} - Precio de compra: {{ exchange.ask }} - Precio
          de compra con comisiones:
          {{ exchange.totalAsk }}
          <button @click="compraCripto('eth', name)">Compra</button>
        </p>
      </div>
      <div v-if="monedaSeleccionada === 'usdt' && getUsdtData">
        <h2>Datos USDT</h2>
        <p v-for="(exchange, name) in getUsdtData" :key="name">
          Exchange: {{ name }} - Precio de compra: {{ exchange.ask }} - Precio
          de compra con comisiones:
          {{ exchange.totalAsk }}
          <button @click="compraCripto('usdt', name)">Compra</button>
        </p>
      </div>
    </div>
    <h1 v-else>No se puedo Cargar los datos de la api</h1>
    <button @click="cerrarSesion">Cerrar sesion</button>
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
    cerrarSesion() {
      this.$store.dispatch("cierre");
      this.$router.push("/");
    },
    compraCripto(moneda, exchange) {
      this.$router.push({ name: "compra", params: { moneda, exchange } });
    },
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
