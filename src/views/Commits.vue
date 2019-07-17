<template>
  <div class="Commits">
    <v-container>
      <h1 class="subheading grey--text my-4">
        Commits of
        <span class="text-weight-bold text-uppercase">{{repo}}</span>
      </h1>
      <v-layout row wrap>
        <v-flex xs12 v-for="com in commits" :key="com.sha">
          <v-card class="pa-1 ma-2">
            <div class="pa-2">
              <v-avatar size="36" v-if="com.author !=null">
                <img v-bind:src="com.author.avatar_url" />
              </v-avatar>
              <v-avatar size="36" v-else>
                <v-icon color="indigo">person</v-icon>
              </v-avatar>
              <span class="title ml-3">{{com.commit.author.name}}</span>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
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


