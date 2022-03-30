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


