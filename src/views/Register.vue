<template>
    <guest-layout title="Sign Up">
      <form class="form-in" @submit.prevent="registerUser" >
        <ion-list>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input type="text" v-model="name" required ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model="email" required ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" v-model="password" required ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password confirmation</ion-label>
            <ion-input type="password" v-model="passwordConfirmation" required ></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit">
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

export default {
  data()
  {
    return {
      waitResponse : false,
      name : '',
      email : '',
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
    registerUser()
    {
      const form = {
        name : this.name,
        email : this.email,
        password : this.password
      }

      console.log(form);

      this.waitResponse = true
      
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