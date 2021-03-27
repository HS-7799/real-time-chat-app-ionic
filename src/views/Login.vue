<template>
    <guest-layout title="Sign In">
      <p style="color : red" v-if="error" >
          {{ error.message }}
        </p>
      <form  class="form-in" @submit.prevent="loginUser">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" required v-model="email" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" required v-model="password" ></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit" :disabled="!isValid"  >
            <span v-if="!waitResponse"  >Sign In</span>
            <ion-spinner v-else ></ion-spinner>
          </ion-button>
        </ion-list>
      </form>
      <span>You don't have an account yet ? <router-link to="/register" >Sign up</router-link> </span>

    </guest-layout>
</template>

<script>
import GuestLayout from '../views/layouts/Guest.vue'

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner
} from '@ionic/vue'

import firebase from '@firebase/app';
require('firebase/auth');

export default {
  data()
  {
    return {
      waitResponse : false,
      email : '',
      password : '',
      error : null
    }
  },
  components : {
    GuestLayout,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner
  },
  methods : {
    async loginUser()
    {
      this.waitResponse = true
      try
      {
        await firebase.auth().signInWithEmailAndPassword(this.email,this.password)
        this.waitResponse = false
        this.$router.replace({name : 'Users'})
      }      
      catch(err)
      {
        this.error = err
        this.password = ''
        this.waitResponse = false;
      }
      
    }
  },
  computed : 
  {
    isValid()
    {
      return this.password != '' && this.email != ''
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