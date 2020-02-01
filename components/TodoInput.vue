<template>
  <v-text-field
    v-model="message"
    :append-icon="'mdi-calendar-plus'"
    label="Todo"
    type="text"
    @click:append="sendMessage"
    @keydown.enter="sendMessage"
  >
  </v-text-field>
</template>

<script>
  import {mapMutations} from 'vuex'
  import store from '../store/todo'
  import axios from 'axios'

  export default {
      data(){
          return{
              message: '',
          }
      },
      methods: {
          ...mapMutations(['addTodo']),
          sendMessage(){
              const todoInfo = {todo: this.message, complete: 0};

              axios.post('http://localhost:3000/api/todo/add', todoInfo)
                  .then((res) => {
                  store.commit('addTodo', this.message);
                  this.message = '';
                  });
          }
      }
  }
</script>
