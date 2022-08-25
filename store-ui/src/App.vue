<template>
  <v-app dark>
    <v-navigation-drawer app permanent v-model="drawer">
      <StoreList></StoreList>
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-container class="py-0 fill-height">
        
        <v-spacer></v-spacer>


        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{ jwt_token.given_name }} {{ jwt_token.family_name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>My profile</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="keycloak.logout()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>


      </v-container>
      
    </v-app-bar>

    <v-main>
      <StoreDetail></StoreDetail>
      <LogList></LogList>>
    </v-main>

    <v-footer>
      
    </v-footer>
  </v-app>
</template>

<script>
import LogList from "./components/LogList.vue";
import StoreDetail from "./components/StoreDetail.vue"
import StoreList from "./components/StoreList.vue"
import { mapGetters } from "vuex";

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

  computed: {
    ...mapGetters(["keycloak", "jwt_token"])
  },

  mounted() {

  }
};
</script>
