<template>
    <auth-layout title="Chat" previous="/users" >
      <div class="container">
        <div class="inbox_msg">
          
          <div class="mesgs" >
            <div class="msg_history">
              <div v-for="(message,index) in messages" :key="index" >
              
                <div class="incoming_msg" v-if="message.from !== fromId" >
                  
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <span class="time_date">{{ message.senderName }}</span>
                      <p>{{ message.body }}</p>
                    </div>
                  </div>
                </div>
                <div class="outgoing_msg" v-else >
                  <div class="sent_msg">
                    <span class="time_date">{{ message.senderName }}</span>
                    <p>{{ message.body }}</p>
                  </div>
                </div> 
              
                
              </div>
            </div>
            <ion-grid>
              <ion-row style="box-shadow : 1px 1px 2px lightgray" >
                <ion-col size="9" >
                  <ion-input class="write_msg" v-model="body" placeholder="Type a message" ></ion-input>
                </ion-col>
                <ion-col size="3">
                  <ion-button color="primary" @click="sendMessage" :disabled="body.trim() === ''"  >
                        <ion-icon slot="icon-only" :icon="send"></ion-icon>
                  </ion-button>
                </ion-col>
                
              </ion-row>
            </ion-grid>
            
          </div>
        </div>
      </div>
    </auth-layout>
</template>

<script>
import AuthLayout from './layouts/Auth.vue'
import {
  IonInput,
  IonButton,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/vue'

import { send } from 'ionicons/icons';
// import axios from 'axios'
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/firestore');

export default {

  data()
  {
    return {
      send,
      fromId : '',
      sender : '',
      body : '',
      messages : [],
    }
  },
  components : {
    AuthLayout,
    IonInput,
    IonButton,
    IonIcon,
    IonCol,
    IonGrid,
    IonRow


  },
  methods : {
    async sendMessage()
    {
      if(this.body.trim() !== '')
      {
        const message = {
          from : this.fromId,
          senderName : this.sender,
          body : this.body,
          createdAt : new Date()
        }
        const db = firebase.firestore()
        await db.collection('messages').add(message)
        const messagesBox = document.querySelector('.msg_history')
        messagesBox.scrollTop = messagesBox.scrollHeight
        this.body = ''
      }
    },
    async getMessages()
    {
      const db = firebase.firestore()
      db.collection('messages').orderBy('createdAt').onSnapshot((querySnapshot) => {
        let a = []
        querySnapshot.forEach((doc) => {
          a.push(doc.data())
        });
        this.messages = a
      })
    }
  },
  created()
  {
      const auth = firebase.auth().currentUser
      this.fromId = auth.uid
      this.sender = localStorage.getItem('sender')
      
      this.getMessages()
  }
}
</script>

<style scoped >
.form-in
{
  max-width: 400px;
  margin: auto;
}

.mesgs
{
  padding: 10px;
  background-color:  lightgray;
}

.container{max-width:700px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  clear: both;
  overflow: hidden;

}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #3880ff;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}


.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: white none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}


 .sent_msg p {
  background: #3880ff none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #3880ff none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>