import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBars, faMagnifyingGlass, faBell, faCircleUser, faHouse, faClockRotateLeft, faChevronDown, faBookmark, faUser, faLock, faEnvelope, faThumbsUp, faThumbsDown, faPlus, faMinus, faEllipsisV, faTrashCan, faRightFromBracket, faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faYoutube, faBars, faMagnifyingGlass, faBell, faCircleUser, faHouse, faClockRotateLeft, faChevronDown, faBookmark, faUser, faLock, faEnvelope, faThumbsUp, faThumbsDown, faPlus, faMinus, faEllipsisV, faTrashCan, faRightFromBracket, faCameraRetro)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')