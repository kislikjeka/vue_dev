<template>
  <div class="repositories">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <v-container class="my-3">
      <h1 class="subheading grey--text my-4">Repositories</h1>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="repo in repos" :key="repo.name">
          <v-card class="pa-1 ma-2" :to="{name: 'commits', params: {repo: repo.name}}">
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-card-title class="text-uppercase">{{repo.name}}</v-card-title>
                <v-card-actions class="grey--text">
                  <v-btn flat small class="indigo lighten-2 white--text">
                    To the commits
                    <v-icon size="16px" class="ml-2">arrow_forward_ios</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      repos: [],
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  created() {
    this.isLoading = true;
    this.$http.get("https://api.github.com/users/kislikjeka/repos").then(
      response => {
        // get body data
        this.repos = response.body;
      },
      response => {
        this.console.log(response.data); // error callback
      }
    );
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
  computed: {}
};
</script>
