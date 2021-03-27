<template>
    <guest-layout title="Sign Up">
      <form class="form-in" @submit.prevent="registerUser" >
        <p style="color : red" v-if="error" >
          {{ error.message }}
        </p>
        <ion-list>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input type="text" required v-model="name" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" required v-model="email" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" required v-model="password" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password confirmation</ion-label>
            <ion-input type="password" required v-model="passwordConfirmation" ></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit" :disabled="!isValid" >
            <span v-if="!waitResponse" >Sign Up</span>
            <ion-spinner v-else ></ion-spinner>
          </ion-button>
        </ion-list>
      </form>
      <span>Already have an account ? <router-link to="/login" >Sing In</router-link> </span>
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

import axios from 'axios'

export default {
  data()
  {
    return {
      waitResponse : false,
      error :null,
      email : '',
      name : '',
      password : '',
      passwordConfirmation : ''
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
    async registerUser()
    {
      if(this.isValid)
      {
        this.waitResponse = true
        try
        {
          const user = await firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
          await axios.post('https://chat-project-ionic-default-rtdb.europe-west1.firebasedatabase.app/users.json',{
            id : user.user.uid,
            name : this.name
          })
          this.waitResponse = false
          this.$router.push({name : 'Users'})
        }      
        catch(err)
        {
          this.error = err
          this.password = ''
          this.passwordConfirmation = ''
          this.waitResponse = false;
        }
      }
    }
  },
  computed:
  {
    isValid()
    {
      return this.email != '' &&
             this.name != '' &&
             this.password === this.passwordConfirmation &&
             this.password != '' && this.passwordConfirmation != ''
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