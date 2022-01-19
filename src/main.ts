import { createApp } from 'vue'
import App from './App.vue'
import { web3Store } from './store'

/*
ToDo TailWind Css
*/
import './assets/tailwind/index.css'

/*
ToDo Components
*/

import ModalLayout from './components/ModalLayout.vue'
import Toast from './components/ToastLayout.vue'

import router from './router'

web3Store.actions.registerWeb3()


createApp(App).use(router).component('toast', Toast).component('modal', ModalLayout).mount('#app')
