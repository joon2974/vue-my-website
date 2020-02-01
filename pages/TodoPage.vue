<template>
  <v-layout>
    <v-flex class="text-center">
      <v-card>
        <v-card-title class="justify-center">
          Todo App
        </v-card-title>
        <v-card-actions>
          <todo-input></todo-input>
        </v-card-actions>
        <v-card-text>
          왜 안나와
          {{todoList}}
          <todo-component v-for="(todo, index) in todoList" :key="`todo-${index}`" :todoInfo="todo"></todo-component>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  import {mapState, mapMutations} from 'vuex';
  import store from '../store/todo';
  import TodoInput from "../components/TodoInput";
  import TodoComponent from "../components/TodoComponent";

  export default {
      computed: {
        ...mapState(['todoList']),
      },
      components: {
          'todo-input': TodoInput,
          'todo-component': TodoComponent
      },
      methods: {
        ...mapMutations(['setTodo']),
      },
      created() {
          axios.get('http://localhost:3000/api/todo')
              .then((res) => {
                  store.commit('setTodo', res.data);
              });
      }
  }
</script>
