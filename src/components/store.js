import axios from "axios";

const initialState = [];
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
            text: action.payload,
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

export const fetchTodos = async (dispatch, getState) => {
  const parsedLocalStorage = localStorage.getItem("todos");

  dispatch({
    type: "TODOS_LOADED",
    payload: JSON.parse(parsedLocalStorage),
  });

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`);

    dispatch({
      type: "TODOS_LOADED",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

////De verificat cu virgil logica de localstorage

export const saveNewTodo = (text) => {
  const todoText = text;
  if (localStorage["todos"]) {
    console.log(todoText);
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
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTodoWithId = (id) => {
  if (localStorage["todos"]) {
    return (dispatch, getState) => {
      dispatch({
        type: "DELETE_TODO",
        payload: {
          id: id,
        },
      });
    };
  } else {
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
    };
  }
};

export const markTodoAsComplete = (id) => {
  if (localStorage["todos"]) {
    return (dispatch, getState) => {
      dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });
    };
  } else {
    return async (dispatch, getState) => {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/${id}`
      );

      dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });
    };
  }
};
