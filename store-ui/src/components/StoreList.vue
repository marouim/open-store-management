<template>
  <v-container>
    <v-label>Store list </v-label>


    <v-expansion-panels>
      <v-expansion-panel
        v-for="(t,i) in storeTree"
        :key="i"
        >

        <v-expansion-panel-header>
          <v-card flat>
            <v-card-title>{{ t.name }}-{{ t.variables.storeName }}</v-card-title>
            <v-card-subtitle>{{ t.variables.storeAddress }}</v-card-subtitle>
          </v-card>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list >
            <template v-for="(host,i) in t.hosts">
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
                        v-on:click="t()"
                      >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>



  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: 'StoreList',

    methods: {
      ...mapActions(["getStoreTree"]),

      t() {
        
      }
    },

    computed: {
      ...mapGetters(["storeTree"])
    },

    data: () => ({
      intervalGetStoreList: 0
    }),

    mounted() {
      this.getStoreTree();

      this.intervalGetStoreList = setInterval(() => {this.getStoreTree()}, 5000)

    },
    beforeDestroy() {
      clearInterval(this.intervalGetStoreList)
    }, 
  }
</script>
