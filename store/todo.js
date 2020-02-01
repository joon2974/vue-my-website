import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [],
  },
  mutations: {
    setTodo(state, todos){
      state.todoList = todos;
    },
    addTodo(state, newTodo){
      state.todoList = [...state.todoList, {todo: newTodo, complete: 0}];
    },
    removeTodo(state, newTodo){
      state.todoList = state.todoList.filter(v => v.todo !== newTodo.todo);
    }
  }
})
