<template>
  <v-container>
    <v-card flat>
      <v-card-title>{{ storeTree[selectedStoreId].variables.storeName }}</v-card-title>
      <v-card-subtitle>
        {{ storeTree[selectedStoreId].variables.storeAddress }} <br> {{ storeTree[selectedStoreId].variables.storeType }}
      </v-card-subtitle>

      <v-list >
        <template v-for="(host,i) in storeTree[selectedStoreId].hosts">
          <v-list-item :key="i" v-on:click="t()">
            <v-list-item-icon>
              <v-icon >{{ host.variables.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="host.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>

              <v-menu
                open-on-hover
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    icon
                  >
                    <v-icon>mdi-hammer-screwdriver</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in host.actions"
                    :key="index"
                    v-on:click="launchAction(item.id)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    

  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: 'StoreList',

    methods: {
      ...mapActions(["getStoreTree", "launchAction", "setSelectedStoreId"]),

      t() {
        
      }
    },

    computed: {
      ...mapGetters(["storeTree", "selectedStoreId"])
    },

    data: () => ({

    }),

    mounted() {


    },
    beforeDestroy() {

    }, 
  }
</script>
