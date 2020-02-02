<template>
  <v-text-field
    class="input-area"
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
  import axios from 'axios'

  export default {
      data(){
          return{
              message: '',
          }
      },
      methods: {
          ...mapMutations({
              addTodo: 'todo/addTodo'
          }),
          sendMessage(){
              const todoInfo = {todo: this.message, complete: 0};

              axios.post('http://localhost:3000/api/todo/add', todoInfo)
                  .then(() => {
                      this.$store.commit('todo/addTodo', this.message);
                      this.message = '';
                  });
          }
      }
  }
</script>

<style>
  .input-area{
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
