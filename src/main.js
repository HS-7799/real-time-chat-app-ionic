import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/styles.css';

import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS9h9clr776z4MmGVZrKXKXO9nTL3YI9Y",
  authDomain: "chat-project-ionic.firebaseapp.com",
  projectId: "chat-project-ionic",
  storageBucket: "chat-project-ionic.appspot.com",
  messagingSenderId: "733873954674",
  appId: "1:733873954674:web:efe82f6ff0a75ca55f47eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app)
  {
    app = createApp(App)
      .use(IonicVue)
      .use(router);
  }
})
  
router.isReady().then(() => {
  app.mount('#app');
});