import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from "@/router/index.js";
import axios from "axios";
import { createPinia } from "pinia";





const app = createApp(App);

const serverBaseUrl = "http://34.163.94.122";
app.provide("serverBaseUrl", serverBaseUrl);
// Default Axios configuration
axios.defaults.baseURL = serverBaseUrl + "/api";
axios.defaults.headers.common["Content-type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

app.use(router);
app.use(createPinia());

app.mount('#app')
