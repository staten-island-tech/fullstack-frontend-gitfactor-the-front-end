import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// createApp(App).use(store).use(router).mount("#app");

import authConfig from '../src/auth_config.json'
import { setupAuth } from '../src/auth'

let app = createApp(App).use(store).use(router)

function callbackRedirect(appState) {
  router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : '/'
  );
}

setupAuth(authConfig, callbackRedirect).then((auth) => {
  app.use(auth).mount('#app')
})


app.component("font-awesome-icon", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import { faPause, faX, faHeart, faPowerOff, faCaretLeft, faCaretRight, faZ } from "@fortawesome/free-solid-svg-icons";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* add icons to the library */
library.add(faPause, faX, faHeart, faPowerOff, faCaretLeft, faCaretRight, faZ);