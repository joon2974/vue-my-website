<template>
  <v-content>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md10>
          <v-card class="elevation-12" color="grey lighten-5">
            <v-toolbar dark color="blue-grey darken-3">
              <v-toolbar-title flat color="blue-grey lighten-4--text">My Chat App</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-chip>{{user.name}}</v-chip>
              <v-btn icon class="mx-1" @click="exit">
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-label>Message</v-label>
              <div ref="chat" id="chatText">
                <message
                  v-for="(message, index) in messages"
                  :key="`message-${index}`"
                  :name="message.name"
                  :text="message.text"
                  :time="message.time"
                  :owner="message.id === user.id"
                ></message>
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="chat_form">
                <chat-form></chat-form>
              </div>
            </v-card-actions>
            <v-divider></v-divider>
            <chip-group :chipList="chips"></chip-group>
            <v-divider></v-divider>
            <card-group :cardList="cards"></card-group>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
    import ChipGroup from '../components/ChipGroup'
    import CardGroup from '../components/CardGroup'
    import MessageComponent from "../components/MessageComponent";
    import ChatformComponent from "../components/ChatformComponent";

    export default {
        created(){
          this.$socket.emit("joinRoom", this.user);
        },
        name: 'Chat',
        components:{
            'chip-group': ChipGroup,
            'card-group': CardGroup,
            'message': MessageComponent,
            'chat-form': ChatformComponent
        },
        sockets: {
          updateUsers(users) {
              this.updateUsers(users);
          },
            newMessage(msg) {
              this.newMessage(msg);
            }
        },
        head(){
          return{
              title: `Room ${this.user.room}`
          };
        },
        middleware: 'auth',
        computed: {
          ...mapState(['user', 'messages', 'users'])
        },
        data(){
            return{
                textarea: [],
                id: 'joon',
                chips: ['chip1', 'chip2', 'chip3', 'chip4', 'chip5', 'chip6', 'chip7', 'chip8', 'chip9', 'chip10'],
                cards: [
                    { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                    { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                    { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                ],
            }
        },
        methods: {
            ...mapMutations(['newMessage', 'clearData', 'updateUsers']),
            exit() {
                this.$socket.emit("leftChat", () => {
                    this.$router.push("/?message=leftChat");
                    this.clearData();
                });
            }
        },
        watch: {
            messages(){
                // 채팅 출력창을 watch하여 데이터가 갱신될 때마다 스크롤을 맨 아래로 내려준다.
                setTimeout(() => {
                    this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight
                }, 0);
            },
        }
    }
</script>

<style>
  #chatText{
    height: 400px;
    overflow: auto;
  }
  @media screen and (max-width: 959px){
    #inputText{
      width:300px;
    }
  }
</style>
