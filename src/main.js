import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from './routes'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Paginate from "vuejs-paginate-next";


createApp(App).use(router, Paginate).mount('#app');
