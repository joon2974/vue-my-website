<template>
  <v-content>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md10>
          <v-card>
            <v-card-title>
              <h1>Login</h1><br>
            </v-card-title>
            <v-card-text>
              <h5>채팅방 이름과 닉네임을 입력해주세요.</h5>
            </v-card-text>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
                <v-text-field
                  v-model="name"
                  :counter="16"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="room"
                  :rules="roomRules"
                  label="Enter the room"
                  required
                ></v-text-field>
                <v-btn :disabled="!valid" color="primary" class="mr-4" type="submit">Submit</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    head: {
        title: 'Nuxt-chat'
    },
    data(){
        return{
            valid: true,
            name: "",
            message: "",
            id: null,
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 16) || "Name must be less than 16 characters"
            ],
            room: "",
            roomRules: [v => !!v || "Enter the room name"],
        }
    },
    mounted() {
        const { message } = this.$route.query;
        if (message === "noUser") {
            this.message = "Enter your name and room";
        } else if (message === "leftChat") {
            this.message = "You leaved chat";
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        submit(){
            if(this.$refs.form.validate()){
                const user = {
                    name: this.name,
                    room: this.room,
                    id: 0
                };
                this.$socket.emit("createUser", user, data => {
                    console.log(data)
                    user.id = data.id;
                    this.setUser(user);
                    this.$router.push("/chat");
                })
            }

        }
    }
}
</script>
