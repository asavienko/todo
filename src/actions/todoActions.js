import { updateTodoList } from "./todoPureActions";

export const addTodoItem = todoItem => (dispatch, getState) => {
  const {
    todoReducer: { todoList }
  } = getState();
  const newTodoList = todoList.concat([
    {
      todoItem,
      todoItemId: todoList.length,
      todoItemActive: false
    }
  ]);
  return dispatch(updateTodoList(newTodoList));
};

export const deleteTodoItem = todoItemId => (dispatch, getState) => {
  const {
    todoReducer: { todoList }
  } = getState();
  const newTodoList = todoList.filter(item => item.todoItemId !== todoItemId);
  return dispatch(updateTodoList(newTodoList));
};

export const editTodoItem = (todoItem, todoItemId) => (dispatch, getState) => {
  const {
    todoReducer: { todoList }
  } = getState();
  const newTodoList = todoList.map(item => {
    if (item.todoItemId === todoItemId) {
      return {
        todoItem,
        todoItemId,
        todoItemActive: item.todoItemActive
      };
    }
    return item;
  });
  return dispatch(updateTodoList(newTodoList));
};

export const switchShowTodoItem = (todoItemId, todoItemActive) => (
  dispatch,
  getState
) => {
  const {
    todoReducer: { todoList }
  } = getState();
  const newTodoList = todoList.map(item => {
    if (item.todoItemId === todoItemId) {
      item.todoItemActive = todoItemActive;
    }
    return item;
  });
  return dispatch(updateTodoList(newTodoList));
};
export const switchCompletedAll = () => (dispatch, getState) => {
  const {
    todoReducer: { todoList }
  } = getState();
  const isAllSelected = todoList.every(item => item.todoItemActive);
  const newTodoList = todoList.map(item => {
    item.todoItemActive = !isAllSelected;
    return item;
  });
  return dispatch(updateTodoList(newTodoList));
};
