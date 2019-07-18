<template>
  <div class="Commits">
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
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="com in commits" :key="com.sha">
          <template v-slot:header>
            <div>{{com.commit.message}}</div>
          </template>
          <v-divider></v-divider>
          <v-card>
            <v-layout row wrap>
              <v-flex xs4>
                <v-subheader>Author:</v-subheader>
                <v-card-text>
                  <v-avatar size="36" v-if="com.author !=null">
                    <img v-bind:src="com.author.avatar_url" />
                  </v-avatar>
                  <v-avatar size="36" v-else>
                    <v-icon color="indigo">person</v-icon>
                  </v-avatar>
                  <span class="pl-2">{{com.commit.author.name}}</span>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-subheader>Message:</v-subheader>
                <v-card-text>{{com.commit.message}}</v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-subheader>Date/Time:</v-subheader>
                <v-card-text>{{com.commit.author.date.split("T")[0] + "/" +com.commit.author.date.split("T")[1].split("Z")[0]}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commits: []
    };
  },
  methods: {
    getData: function() {
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
    }
  },
  props: ["repo"],
  created() {
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
  }
};
</script>
<style scoped>
.com_card {
  border: 1px;
  border-color: black;
}
</style>


