<template>
  <v-app class="grey lighten-4">
    <Navbar />

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-4 grey lighten-2">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      //
    };
  }
};
</script>
