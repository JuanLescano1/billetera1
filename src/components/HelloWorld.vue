<template>
  <div></div>
</template>

<script>
import { ref } from "vue";
import apiService from "@/services/EventService.js";

export default {
  setup() {
    const coins = ["BTC", "ETH", "USDT"];
    const mostrarDatos = ref(null);
    const cotizaciones = ref({});

    const detalles = async (cripto) => {
      if (mostrarDatos.value === cripto) {
        mostrarDatos.value = null;
      } else {
        mostrarDatos.value = cripto;
        await llamadaCotizaciones(coins.value[cripto]);
      }
    };
    const llamadaCotizaciones = async (coin) => {
      try {
        const response = await apiService.monedas(coin, "ars");
        cotizaciones.value[coin] = response.data.result[coin];
      } catch (error) {
        console.error("Fallo la llamada a las cotizaciones", error);
      }
    };
    return {
      coins,
      mostrarDatos,
      cotizaciones,
      detalles,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
