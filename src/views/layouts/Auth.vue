<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="$route.name !== 'Secret'" >
            <ion-back-button :default-href="previous" ></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end" >
            <ion-button @click="logoutUser" color="primary" >
                <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true"  >
        <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logOut } from 'ionicons/icons';

import firebase from '@firebase/app';
require('firebase/auth');

export default defineComponent({
  props : ['title','previous'],
  data()
  {
      return {
          logOut,
          isLoggedIn : false
      }
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon
  },
  created()
  {
    firebase.auth().onAuthStateChanged(user => {
      if(user)
      {
        this.isLoggedIn = true
      }
    })
  },
  methods : {
      async logoutUser()
      {
          try
          {
              const res = await firebase.auth().signOut();
              console.log(res);
              this.$router.push({name : 'Login'})
          }
          catch(err)
          {
              console.log(err);
          }
      }
  }
  
});
</script>