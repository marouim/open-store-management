<template>
  <v-container>
    <v-text-field
      label="Search"
    ></v-text-field>
    <v-list shaped>

      <v-list-item-group
        v-model="selectedStore"
        color="primary"
      >

        <v-list-item
          v-for="(store, i) in storeTree"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="store.name + ' - ' + store.variables.storeName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
      intervalGetStoreList: 0,
      selectedStore: -1
    }),

    watch: {
      selectedStore: function(){
        this.setSelectedStoreId(this.selectedStore)
      }
    },
    mounted() {
      this.getStoreTree();

      this.intervalGetStoreList = setInterval(() => {this.getStoreTree()}, 5000)

    },
    beforeDestroy() {
      clearInterval(this.intervalGetStoreList)
    }, 
  }
</script>
