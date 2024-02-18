import axios from "axios";
import BrowserStorage from "./BrowserStorage";
import ServerStorage from "./ServerStorage";

class Storage {
  constructor() {
    this.isServerOnline = null;
    this.browserStorage = new BrowserStorage();
    this.serverStorage = new ServerStorage();
  }

  async verifyServerStatus() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then((response) => {
        this.isServerOnline = true;
      })
      .catch((error) => {
        this.isServerOnline = false;
      });
  }

  async getTodos(dispatch) {
    if (!this.isServerOnline) {
      this.browserStorage.getTodosBrowserStorage(dispatch);
    } else {
      this.serverStorage.getTodosServerStorage(dispatch);
    }
  }

  addTodo(text) {
    if (!this.isServerOnline) {
      return this.browserStorage.addTodoBrowserStorage(text);
    } else {
      return this.serverStorage.addTodoServerStorage(text);
    }
  }

  deleteTodo(id) {
    if (!this.isServerOnline) {
      return this.browserStorage.deleteTodoBrowserStorage(id);
    } else {
      return this.serverStorage.deleteTodoServerStorage(id);
    }
  }

  completeTodo(id) {
    if (!this.isServerOnline) {
      return this.browserStorage.completeTodoBrowserStorage(id);
    } else {
      return this.serverStorage.completeTodoServerStorage(id);
    }
  }
}

export default Storage;
