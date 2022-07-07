<template>
  <v-container>
     <v-data-table
      :headers="tableHeaders"
      :items="logs"
      :items-per-page="5"
      class="elevation-1"
      sort-desc="true"
      sort-by="id"
    ></v-data-table>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: 'LogList',

    methods: {
      ...mapActions(["getLogs"]),

    },

    computed: {
      ...mapGetters(["logs"])
    },

    data: () => ({
      intervalGetLogs: 0,

      tableHeaders: [
          { text: 'ID',value: 'id' },
          { text: 'Job', value: 'name' },
          { text: 'Affected devices', value: "affected_devices_text" }
        ]
    }),

    mounted() {
      this.getLogs();

      this.intervalGetLogs = setInterval(() => {this.getLogs()}, 5000)

    },
    beforeDestroy() {
      clearInterval(this.intervalGetLogs)
    }, 
  }
</script>
