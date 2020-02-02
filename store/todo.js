export const state = () => ({
  todoList: [],
  choice: 0
});

export const mutations = {
  //맨 처음 DB로부터 data를 받아와 vuex의 todoList를 초기화
  setTodo: (state, todos) => {
    state.todoList = todos;
  },
  //사용자가 todo를 추가할 때 vuex의 TodoList update
  addTodo: (state, newTodo) => {
    state.todoList = [...state.todoList, {todo: newTodo, complete: 0}];
  },
  //사용자가 todo를 제거할 때, filter를 사용하여 해당 todo 제거
  removeTodo: (state, newTodo) => {
    state.todoList = state.todoList.filter(v => v.todo !== newTodo.todo);
  },
  //Todo와 Finish 둘 중 하나만을 리스트에 보여주기 위해 choice를 설정
  setChoice: (state, value) => {
    state.choice = value;
  },
  //이미 finish된 Todo를 undo할 때 실행, find함수 사용하여 해당 todo 찾은 후 complete 수정
  undoTodo: (state, target) => {
    state.todoList.find(v => v.todo === target.todo && v.complete == 1).complete = 0;
  },
  //Todo를 finish했을 때 실행
  finishTodo: (state, target) => {
    state.todoList.find(v => v.todo === target.todo && v.complete == 0).complete = 1;
  }
};

