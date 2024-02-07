import axios from "axios";

class Storage {
  constructor() {
    this.isServerOnline = false;
  }

  async getTodos(dispatch) {
    const parsedLocalStorage = JSON.parse(localStorage.getItem("todos"));

    if (localStorage["todos"] && !this.isServerOnline) {
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
      this.isServerOnline = true;
    } catch (error) {
      console.log(error);
    }
  }

  addTodo(text) {
    const todoText = text;
    if (localStorage["todos"] && !this.isServerOnline) {
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
        this.isServerOnline = true;
      } catch (error) {
        console.log(error);
      }
    };
  }

  deleteTodo(id) {
    const localStorageItems = JSON.parse(localStorage.getItem("todos"));

    if (localStorage["todos"] && !this.isServerOnline) {
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

      this.isServerOnline = true;
    };
  }

  completeTodo(id) {
    if (localStorage["todos"] && !this.isServerOnline) {
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
      dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });

      this.isServerOnline = true;
    };
  }
}

export default Storage;
