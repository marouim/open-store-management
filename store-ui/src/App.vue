<template>
  <v-app>
    <v-navigation-drawer app permanent v-model="drawer">
      <StoreList></StoreList>
    </v-navigation-drawer>

    <v-app-bar app dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.meta.displayName }}</v-toolbar-title>
    </v-app-bar>



    <v-main>
      <StoreDetail></StoreDetail>
      
    </v-main>

    <v-footer>
      <LogList></LogList>>
    </v-footer>
  </v-app>
</template>

<script>
import LogList from "./components/LogList.vue";
import StoreDetail from "./components/StoreDetail.vue"
import StoreList from "./components/StoreList.vue"

export default {
  name: 'App',

  components: {
    LogList,
    StoreDetail,
    StoreList
  },

  data: () => ({
    drawer: null
  }),
};
</script>
