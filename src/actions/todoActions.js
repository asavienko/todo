import {updateTodoList} from "./todoPureActions";

export const addTodoItem = (todoItem) => (dispatch, getState) => {
  const state = getState();
  const {todoReducer} = state;
  const newTodoList = todoReducer.todoList.concat([{
    todoItem,
    todoItemId: todoReducer.todoList.length,
    todoItemActive: false,
  }]);
  return dispatch(updateTodoList(newTodoList))
};

export const deleteTodoItem = (todoItemId) => (dispatch, getState) => {
  const {todoReducer} = getState();
  const newTodoList = todoReducer.todoList.filter(item => item.todoItemId !== todoItemId);
  return dispatch(updateTodoList(newTodoList));
};

export const editTodoItem = (todoItem, todoItemId) => (dispatch, getState) => {
  const {todoReducer} = getState();
  const newTodoList = todoReducer.todoList.map(item => {
    if (item.todoItemId === todoItemId) {
      return {
        todoItem,
        todoItemId,
        todoItemActive: item.todoItemActive
      }
    }
    return item
  });
  return dispatch(updateTodoList(newTodoList))
};

export const switchShowTodoItem = (todoItemId, todoItemActive) => (dispatch, getState) => {
  const {todoReducer} = getState();
  const newTodoList = todoReducer.todoList.map(item => {
    if (item.todoItemId === todoItemId) {
      item.todoItemActive = todoItemActive;
    }
    return item;

  });
  return dispatch(updateTodoList(newTodoList))
};
export const switchCompletedAll = () => (dispatch, getState) => {
  const {todoReducer} = getState();
  const isAllSelected = todoReducer.todoList.every(item => item.todoItemActive);
  const newTodoList = todoReducer.todoList.map(item => {
    item.todoItemActive = !isAllSelected;
    return item
  });
  return dispatch(updateTodoList(newTodoList));
};
