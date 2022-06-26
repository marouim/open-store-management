import Vue from "vue";
import VueRouter from "vue-router";

// Import router components
import StoreList from "./components/StoreList.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "storeList",
    path: "/",
    component: StoreList,
    meta: {
      requiresAuth: true,
      displayName: "Store list"
    },
  },
 
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
