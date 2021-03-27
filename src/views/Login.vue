<template>
    <guest-layout title="Sign In">
      <form  class="form-in" @submit.prevent="loginUser">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model="form.email" required ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" v-model="form.password" required ></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit"  >
            <span v-if="!waitResponse" >Sign In</span>
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

export default {
  data()
  {
    return {
      waitResponse : false,
      form : {
        email : '',
        password : '',
      }
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
    loginUser()
    {
      console.log(this.form);
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