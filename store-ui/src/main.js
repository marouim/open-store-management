import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import Keycloak from "keycloak-js"

Vue.config.productionTip = false;



let initOptions = {
  url: 'https://keycloak-sso.apps.hiybv6c8.eastus.aroapp.io/auth/', 
  realm: 'rhcasalab', 
  clientId: 'open-store-management-ui', 
  onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    //Vue.$log.info("Authenticated");
    
    new Vue({
      el: "#app",
      vuetify,
      router,
      store,
      render: h => h(App)
    })
    
    store.commit("SET_KEYCLOAK", keycloak);

    //.$mount("#app")
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        //Vue.$log.info('Token refreshed' + refreshed);
      } else {
        //Vue.$log.warn('Token not refreshed, valid for '
        //  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      //Vue.$log.error('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  //Vue.$log.error("Authenticated Failed");
});





