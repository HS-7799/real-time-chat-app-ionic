<template>
    <auth-layout title="Users" >
      <ion-buttons >
            <ion-button @click="messageUser" color="primary" >
              Start chatting
              <ion-icon :icon="chatbox"></ion-icon>
            </ion-button>
      </ion-buttons>
      <ion-list>
        <ion-item v-for="user in users" :key="user.id">
          <ion-label>{{ user.name }}</ion-label>
        </ion-item>
      </ion-list>
    </auth-layout>
</template>

<script>
import AuthLayout from './layouts/Auth.vue'

import {
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue'

import { chatbox } from 'ionicons/icons';
import firebase from '@firebase/app';
require('firebase/firestore');

export default {
  name : 'users',
  data()
  {
    return {
      users:  [],
      chatbox,
      authId : null
    }
  },
  components : {
    AuthLayout,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
    IonIcon
  },
  created()
  {
    this.getAllUser()
  },

  methods : {
    async getAllUser()
    {

      const auth = firebase.auth().currentUser

      const db = firebase.firestore()
      const snapshot = await db.collection('users').get();
      snapshot.forEach((doc) => {
        this.users.push(doc.data())
        if(doc.data().id === auth.uid)
        {
          localStorage.setItem('sender',doc.data().name) 
        }
      });
      
    },
    messageUser()
    {
      this.$router.push('/messages/')
    }
  },
}
</script>

<style scoped >
.form-in
{
  max-width: 400px;
  margin: auto;
}
</style>