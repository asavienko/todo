import {UPDATE_TODO_LIST} from "../constants/actions";

const initialState = {todoList: []};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TODO_LIST:
      return {...state, todoList: action.todoList};
    default:
      return state;
  }
}
