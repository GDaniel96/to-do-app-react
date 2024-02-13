import axios from "axios";
import BrowserStorage from "./BrowserStorage";

class Storage {
  constructor() {
    this.isServerOnline = false;
    this.browserStorage = new BrowserStorage();
  }

  async getTodos(dispatch) {
    if (localStorage["todos"] && !this.isServerOnline) {
      this.browserStorage.getTodosBrowserStorage(dispatch);
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
      return this.browserStorage.addTodoBrowserStorage(text);
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
    if (localStorage["todos"] && !this.isServerOnline) {
      return this.browserStorage.deleteTodoBrowserStorage(id);
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
      return this.browserStorage.completeTodoBrowserStorage(id);
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
