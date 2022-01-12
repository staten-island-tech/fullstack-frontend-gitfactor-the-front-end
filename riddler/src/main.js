import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

import Vue from "vue";
import App from "./App.vue";
const createjs = window.createjs; // Get the createjs instance from window object

Vue.config.productionTip = false;
Vue.prototype.createjs = createjs; // Add the createjs instance to the Vue prototy, to use this.createjs
