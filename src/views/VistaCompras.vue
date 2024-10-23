<template>
  <div>
    <div v-if="monedaData">
      <p>Nombre: {{ moneda }}</p>
      <p>Exchange: {{ exchange }}</p>
      <p>Precio de compra: {{ monedaData.ask }}</p>
      <p>Precio de compra con comisiones: {{ monedaData.totalAsk }}</p>
      <p>Precio de venta: {{ monedaData.bid }}</p>
      <p>Precio de venta con comisiones: {{ monedaData.totalBid }}</p>
      <p>Tiempo de ultima actualizacion: {{ monedaData.time }}</p>
      <input
        :placeholder="`Cantidad a comprar: ${cantidadMin}`"
        v-model="cantidad"
        :step="cantidadMin"
        :min="cantidadMin"
        type="number"
      />
      <button @click="confirmar">Comprar</button>
      <button @click="cancelarCompra">Cancelar</button>
    </div>
    <div v-else-if="!validarMoneda">
      <p>No hay datos de esta moneda {{ moneda }}</p>
    </div>
    <div v-else>
      <p>No hay datos para este exchange {{ exchange }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cantidad: null,
    };
  },
  computed: {
    cantidadMin() {
      if (this.monedaData) {
        const gastoMin = 0.01;
        const precioUnidad = this.monedaData.totalAsk;
        return gastoMin / precioUnidad;
      }
      return 0;
    },
    moneda() {
      return this.$route.params.moneda;
    },
    exchange() {
      return this.$route.params.exchange;
    },
    ...mapGetters([
      "getBtcData",
      "getEthData",
      "getUsdtData",
      "errorAccederApi",
    ]),
    validarMoneda() {
      const validarMonedas = ["btc", "eth", "usdt"];
      return validarMonedas.includes(this.moneda);
    },
    monedaData() {
      if (!this.validarMoneda) {
        return null;
      }
      const data = {
        btc: this.getBtcData,
        eth: this.getEthData,
        usdt: this.getUsdtData,
      };
      const guardarData = data[this.moneda];
      if (!guardarData || !guardarData[this.exchange]) {
        return null;
      }
      return guardarData[this.exchange];
    },
  },
  methods: {
    cancelarCompra() {
      this.$router.push("/");
    },
    confirmar() {
      console.log("Cantidad a comprar: ", this.cantidad);
      console.log("Cantidad minima posible: ", this.monedaData[this.moneda]);
      console.log("Precio unidad: ", this.monedaData.totalAsk);
    },
  },
};
</script>
