<template>
  <div>
    <button @click="fetchData">Cargar Datos</button>
    <div v-if="getBtcData">
      <h2>Datos BTC</h2>
      <pre>{{ getBtcData }}</pre>
    </div>
    <div v-if="getEthData">
      <h2>Datos ETH</h2>
      <pre>{{ getEthData }}</pre>
    </div>
    <div v-if="getUsdtData">
      <h2>Datos USDT</h2>
      <pre>{{ getUsdtData }}</pre>
    </div>
    <div v-if="errorAccederApi">
      <p>{{ errorAccederApi }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getBtcData",
      "getEthData",
      "getUsdtData",
      "errorAccederApi",
    ]),
  },
  methods: {
    fetchData() {
      this.$store.dispatch("consultaApi");
    },
  },
};
</script>
<style scoped></style>
