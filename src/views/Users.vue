<template>
    <auth-layout title="Users" >
      <ion-list>
        <ion-item v-for="user in users" :key="user.id">
          <ion-label>{{ user.name }}</ion-label>
          <ion-buttons slot="end" >
            <ion-button @click="messageUser(user.id)" color="primary" >
                <ion-icon slot="icon-only" :icon="chatbox"></ion-icon>
            </ion-button>
          </ion-buttons>
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

import axios from 'axios'

export default {

  data()
  {
    return {
      users:  [],
      chatbox
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
    axios.get('https://chat-project-ionic-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .then((res) => {
      this.users = res.data
    }).catch((err) => {
      console.log(err);
    });
  },
  methods : {
    messageUser(userId)
    {
      this.$router.push('/messages/' + userId)
    }
  }
}
</script>

<style scoped >
.form-in
{
  max-width: 400px;
  margin: auto;
}
</style>