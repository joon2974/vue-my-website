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
        <v-card-actions class="justify-center">
          <choice-button></choice-button>
        </v-card-actions>
        <todo-component v-for="(todo, index) in todoList" :key="`todo-${index}`" :todoInfo="todo"></todo-component>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  import {mapMutations} from 'vuex';
  import TodoInput from "../components/TodoInput";
  import TodoComponent from "../components/TodoComponent";
  import ChoiceButton from "../components/ChoiceButton";

  export default {
      asyncData(){
          return axios.get('http://localhost:3000/api/todo')
              .then((res) => {
                  return {todoData: res.data}
              });
      },
      computed: {
          todoList(){
              return this.$store.state.todo.todoList;
          },
          choice(){
              return this.$store.state.todo.choice;
          }
      },
      components: {
          'todo-input': TodoInput,
          'todo-component': TodoComponent,
          'choice-button': ChoiceButton
      },
      methods: {
        ...mapMutations({
            setTodo: 'todo/setTodo'
        }),
      },
      created() {
          this.$store.commit('todo/setTodo',this.todoData);
      },
  }
</script>
