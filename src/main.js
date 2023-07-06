/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
// Composables
import { createApp } from 'vue'


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.config.globalProperties.$print=console.log;

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

registerPlugins(app)
app.use(pinia);

app.mount('#app')