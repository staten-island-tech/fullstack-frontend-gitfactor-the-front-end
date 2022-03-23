import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// createApp(App)
//   .use(store)
//   .use(router)
//   .mount("#app")
//   .component("font-awesome-icon", FontAwesomeIcon);
const app = createApp(App);
app.use(store).use(router).mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import { faPause } from "@fortawesome/free-solid-svg-icons";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* add icons to the library */
library.add(faPause);
