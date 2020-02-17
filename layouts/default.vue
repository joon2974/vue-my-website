<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
          >Log in</v-btn>
        </template>
        <v-card>
          <v-card-title
            primary-title
          >
            Log in
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="logIn">
              <v-text-field
                autofocus
                v-model="ID"
                :counter="16"
                :rules="idRules"
                label="Admin ID"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="Password"
                :rules="pwdRules"
                label="Password"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" class="mr-4" type="submit" @click="dialog = false">LogIn</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-app-bar>
    <v-content>
      <v-container @click.stop="closeMenu">
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import crypto from 'crypto'

    export default {
        data () {
            return {
                clipped: true,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-clipboard-text-outline',
                        title: '게시판',
                        to: '/'
                    },
                    {
                        icon: 'mdi-briefcase-outline',
                        title: 'Todo App',
                        to: '/TodoPage'
                    },
                    {
                        icon: 'mdi-chat',
                        title: 'Chatting',
                        to: '/chatLogin'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: "joon's Page",
                valid: false,
                dialog: false,
                ID: '',
                Password: '',
                idRules: [
                    v => !!v || "ID is required",
                    v => (v && v.length <= 16) || "Your ID must be less than 16 characters"
                ],
                pwdRules: [v => !!v || "Enter the password"],
            }
        },
        methods:{
            closeMenu(){
                this.drawer = false;
            },
            logIn(){
                const pwd = crypto.createHash('sha256').update(this.Password).digest('base64');
                const credential = {id: this.ID, password: pwd};

                axios.post('http://localhost:3000/api/login', credential)
                    .then((res) => {
                        if(res.data.code === 'complete'){
                            this.$router.push(res.data.url);
                            this.dialog = false
                        }else if(res.data.code === "not allowed"){
                            this.dialog = true;
                            alert("비밀번호가 틀렸습니다.");
                            this.$router.push(res.data.url);
                        }else{
                            this.dialog = true;
                            alert('존재하지 않는 정보입니다.');
                            this.$router.push(res.data.url);
                        }
                    })
            }
        }
    }
</script>
