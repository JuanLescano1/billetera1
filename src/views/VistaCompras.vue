<template>
  <div>
    <h1>{{ moneda }} - {{ exchange }}</h1>
  </div>
</template>
<script>
export default {
  computed: {
    moneda() {
      return this.$route.params.moneda;
    },
    exchange() {
      return this.$route.params.exchange;
    },
  },
};
</script>
