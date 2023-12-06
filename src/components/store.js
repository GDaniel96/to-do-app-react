import axios from "axios";

const initialState = [];
let isServerOnline = false;
localStorage.setItem("todos", JSON.stringify(initialState));

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
            text: isServerOnline ? action.payload.text : action.payload,
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

export const fetchTodos = async (dispatch, getState) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem("todos"));
  if (localStorage["todos"] && !isServerOnline) {
    dispatch({
      type: "TODOS_LOADED",
      payload: parsedLocalStorage,
    });
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`);

    dispatch({
      type: "TODOS_LOADED",
      payload: response.data,
    });
    isServerOnline = true;
  } catch (error) {
    console.log(error);
  }
};

export const saveNewTodo = (text) => {
  const todoText = text;
  if (localStorage["todos"] && !isServerOnline) {
    console.log(axios.isAxiosError());
    return (dispatch, getState) => {
      dispatch({
        type: "ADD_TODO",
        payload: todoText,
      });
    };
  }
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        text: todoText,
        completed: false,
      });

      dispatch({
        type: "ADD_TODO",
        payload: response.data,
      });

      isServerOnline = true;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTodoWithId = (id) => {
  const localStorageItems = JSON.parse(localStorage.getItem("todos"));

  if (localStorage["todos"] && !isServerOnline) {
    const filteredLocalTodos = localStorageItems.filter((todo) => {
      if (todo.id !== id) {
        return true;
      }
      return false;
    });

    localStorage.setItem("todos", JSON.stringify(filteredLocalTodos));

    return (dispatch, getState) => {
      dispatch({
        type: "DELETE_TODO",
        payload: {
          id: id,
        },
      });
    };
  }
  return async (dispatch, getState) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/${id}`
    );
    console.log(response);
    dispatch({
      type: "DELETE_TODO",
      payload: {
        id: id,
      },
    });

    isServerOnline = true;
  };
};

export const markTodoAsComplete = (id) => {
  if (localStorage["todos"] && !isServerOnline) {
    const localStorageItems = JSON.parse(localStorage.getItem("todos"));

    const localStorageComplete = localStorageItems.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(localStorageComplete));

    return (dispatch, getState) => {
      dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });
    };
  }

  return async (dispatch, getState) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/${id}`
    );

    console.log(response);
    dispatch({
      type: "TOGGLE_COMPLETED",
      payload: {
        id: id,
      },
    });

    isServerOnline = true;
  };
};
