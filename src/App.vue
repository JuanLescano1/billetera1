<template>
  <nav>
    <router-link to="/" v-if="!usuarioAutenticado">
      Listado de monedas
    </router-link>
    |
    <router-link to="/about">¿Quienes somos?</router-link>
  </nav>
  <router-view />
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
