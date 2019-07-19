<template>
  <div class="repositories">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <v-container class="my-3">
      <h1 class="subheading grey--text my-4">Repositories</h1>
      <v-layout row wrap>
        <v-select
          clearable
          class="px-3"
          v-model="select"
          :items="repos"
          label="Language"
          item-value="language"
          item-text="language"
        ></v-select>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 v-for="repo in filtred" :key="repo.name">
          <v-card class="pa-1 ma-2" :to="{name: 'commits', params: {repo: repo.name}}">
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-card-title class="text-uppercase">{{repo.name}}</v-card-title>
                <v-card-text class="grey--text text-lighten-1">
                  {{repo.language}}
                  <div>Last update: {{ new Date(repo.updated_at).toLocaleString()}}</div>
                </v-card-text>
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
      select: {},
      search: "",
      repos: [],
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {},
  created() {
    this.isLoading = true;
    this.$http.get("https://api.github.com/users/kislikjeka/repos").then(
      response => {
        // get body data
        this.repos = response.body.reverse();
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
  computed: {
    filtredRepos: function() {
      return this.repos.filter(repo => {
        return repo.name.toLowerCase().match(this.search);
      });
    },
    filtred: function() {
      return this.filtredRepos.filter(frepo => {
        return frepo.language.match(this.select);
      });
    }
  }
};
</script>
