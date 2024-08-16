import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import VueDraggableResizable from "vue-draggable-resizable";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("vue-draggable-resizable", VueDraggableResizable)

app.mount('#app')
