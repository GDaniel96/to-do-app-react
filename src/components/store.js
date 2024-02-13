import Storage from "../storage/Storage";

const storage = new Storage();
const initialState = [];
// const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
// if (!localStorageTodos) {
//   localStorage.setItem("todos", JSON.stringify(initialState));
// }

export const todosReducer = (initialState = [], action) => {
  switch (action.type) {
    case "TODOS_LOADED":
      return action.payload;

    case "ADD_TODO":
      localStorage.setItem(
        "todos",
        JSON.stringify([
          ...initialState,
          {
            id: Object.keys(initialState).length,
            text: storage.isServerOnline ? action.payload.text : action.payload,
            completed: false,
          },
        ])
      );

      return [
        ...initialState,
        {
          id: Object.keys(initialState).length,
          text: action.payload.text,
          completed: false,
        },
      ];

    case "DELETE_TODO":
      return initialState.filter((todo) => {
        if (todo.id !== action.payload.id) {
          return true;
        }
        return false;
      });

    case "TOGGLE_COMPLETED":
      return initialState.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

    default:
      return initialState;
  }
};

export const fitlerReducer = (initialState = false, action) => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      return !initialState;

    default:
      return initialState;
  }
};

////De verificat cu virgil logica de localstorage

export const fetchTodos = (dispatch, getState) => {
  storage.getTodos(dispatch);
};

export const saveNewTodo = (text) => {
  return storage.addTodo(text);
};

export const deleteTodoWithId = (id) => {
  return storage.deleteTodo(id);
};

export const markTodoAsComplete = (id) => {
  return storage.completeTodo(id);
};
