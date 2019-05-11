import {UPDATE_TODO_LIST} from "../constants/actions";

export const updateTodoList = (todoList) => ({
  type: UPDATE_TODO_LIST,
  todoList,
});