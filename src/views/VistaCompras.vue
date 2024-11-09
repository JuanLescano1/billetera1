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
import EventService from "@/services/EventService";
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
      if (this.cantidad > 0) {
        console.log("Cantidad comprada:", this.cantidad);
        const fecha = this.monedaData.time;
        console.log("Fecha:", fecha);
        const infoCompra = {
          crypto_code: this.moneda,
          crypto_amount: this.cantidad,
          money: this.gastado(),
          user_id: "5", //user_id: va el usuario iniciado,
          action: "purchase",
          datetime: fecha,
        };
        console.log(infoCompra);
        EventService.compra(infoCompra)
          .then((response) => {
            console.log("Respuesta de la api: ", response.data);
            console.log("Cantidad a comprar: ", this.cantidad);
            console.log("precio a comprar:", this.cantComprada());
          })
          .catch((error) => {
            console.error("Error de la api: ", error);
          });
      }
    },
    gastado() {
      const precioUnidad = this.monedaData.totalAsk.toFixed(8);
      const precioAPagar = precioUnidad * this.cantidad.toFixed(8);
      return parseFloat(precioAPagar.toFixed(8));
    },
  },
};
</script>
