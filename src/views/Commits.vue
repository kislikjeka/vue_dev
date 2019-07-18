<template>
  <div class="Commits">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <v-container>
      <v-layout>
        <h1 class="subheading grey--text my-4">
          Commits of
          <span class="text-weight-bold text-uppercase">{{repo}}</span>
        </h1>
        <v-spacer></v-spacer>
        <v-btn flat icon class="grey--text" v-on:click="getData">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-layout>
      <v-card>
        <v-card-title class="grey lighten-4">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          must-sort
          :search="search"
          :headers="headers"
          :items="commits"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.commit.author.name}}</td>
            <td class="text-xs-left">{{ props.item.commit.message }}</td>
            <td class="text-xs-left">{{ new Date(props.item.commit.author.date).toLocaleString()}}</td>
          </template>
        </v-data-table>
      </v-card>
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
      isLoading: false,
      fullPage: true,
      pagination: {
        rowsPerPage: -1,
        sortBy: "commit.author.date",
        descending: true
      },
      search: "",
      commits: [],
      headers: [
        {
          text: "Login",
          align: "left",
          value: "commit.author.name"
        },
        { text: "Message", value: "commit.message" },
        { text: "Date/Time", value: "commit.author.date" }
      ]
    };
  },
  components: {
    Loading
  },
  methods: {
    getData: function() {
      this.isLoading = true;
      this.$http
        .get(
          "https://api.github.com/repos/kislikjeka/" + this.repo + "/commits"
        )
        .then(
          response => {
            // get body data
            this.commits = response.body;
          },
          response => {
            this.console.log(response.data); // error callback
          }
        );

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  },
  props: ["repo"],
  created() {
    this.isLoading = true;
    this.$http
      .get("https://api.github.com/repos/kislikjeka/" + this.repo + "/commits")
      .then(
        response => {
          // get body data
          this.commits = response.body;
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
  }
};
</script>
<style scoped>
</style>


