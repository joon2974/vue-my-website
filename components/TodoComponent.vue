<template>
  <v-card-text id="card-text" v-if="todoInfo.complete == choice">
    <v-row id="element">
      {{todoInfo.todo}}
      <v-spacer></v-spacer>
      <v-icon @click="removeTodo">mdi-delete</v-icon>
      <v-icon v-if="todoInfo.complete" @click="undoTodo">mdi-minus-box</v-icon>
      <v-icon v-else @click="finishTodo">mdi-check-circle</v-icon>
    </v-row>
  </v-card-text>
</template>

<script>
  import axios from 'axios';
  import {mapMutations} from 'vuex';

  export default {
      props: ['todoInfo'],
      computed:{
          choice(){
              return this.$store.state.todo.choice;
          }
      },
      methods: {
          ...mapMutations({
              removeTodo: 'todo/removeTodo',
              undoTodo: 'todo/undoTodo',
              finishTodo: 'todo/finishTodo'
          }),
          removeTodo(){
              axios.post('http://localhost:3000/api/todo/remove', this.todoInfo)
                  .then(() => {
                      this.$store.commit('todo/removeTodo', this.todoInfo);
                  });
          },
          undoTodo(){
              const data = {todo: this.todoInfo.todo, complete: this.todoInfo.complete, method: 'undo'};
              axios.post('http://localhost:3000/api/todo/modify', data)
                  .then(() => {
                      this.$store.commit('todo/undoTodo', this.todoInfo);
                  })
          },
          finishTodo(){
              const data = {todo: this.todoInfo.todo, complete: this.todoInfo.complete, method: 'finish'};
              axios.post('http://localhost:3000/api/todo/modify', data)
                  .then(() => {
                      this.$store.commit('todo/finishTodo', this.todoInfo);
                  })

          }
      }
  }
</script>

<style>
  #element{
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: whitesmoke;
    border-radius: 5px;
  }
  #card-text{
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
