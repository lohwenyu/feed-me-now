import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'


import { library } from "@fortawesome/fontawesome-svg-core"
import { faUserCircle, faLock, faAddressBook, faHeart, faTrophy, faCheckDouble, faEnvelope, faPaw, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';

library.add(faUserCircle, faLock, faAddressBook, faHeart, faTrophy, faCheckDouble, faEnvelope, faPaw, faChevronRight )
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueRouter)
const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'
})

import { auth } from "./firebase.js";

let app;
auth.onAuthStateChanged(async user => {
  if (!app) {
    app = new Vue({
      router: myRouter,
      created() {
        if (!user) {
          this.$router.push("/login");
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});
