<template>
  <nav>
    <v-toolbar flat app dark>
      <router-link class="text-uppercase white--text" exact to="/">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">GitHub</span>
          <span>Viewer</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" href="https://github.com/kislikjeka" target="_blank">
        <span>See on GitHub</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>