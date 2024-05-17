import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from "@/router/index.js";
import axios from "axios";
import { createPinia } from "pinia";
import { io } from "socket.io-client";
import Toast from "vue-toastification";
// Import the Toast CSS (or use your own)!
import "vue-toastification/dist/index.css";




const app = createApp(App);

const serverBaseUrl = "http://34.163.104.214";
app.provide("serverBaseUrl", serverBaseUrl);
// Default Axios configuration
axios.defaults.baseURL = serverBaseUrl + "/api";
axios.defaults.headers.common["Content-type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.timeout = 10000;

app.use(router);
app.use(createPinia());

app.use(Toast, {
    position: "bottom-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.9,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__bounce",
});

app.provide("socket", io(serverBaseUrl));

app.mount('#app')
