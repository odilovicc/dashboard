import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import "primeicons/primeicons.css"

import ToastPlugin from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css'


createApp(App)
    .use(store)
    .use(router)
    .use(ToastPlugin, {
        position: 'bottom',
        dismissible: true,
        pauseOnHover: true,

    })
    .mount('#app')
