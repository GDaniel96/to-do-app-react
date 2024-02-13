class BrowserStorage {
  constructor() {
    this.localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  }

  async getTodosBrowserStorage(dispatch) {
    if (!this.localStorageTodos) {
      localStorage.setItem("todos", JSON.stringify([]));
    }

    await dispatch({
      type: "TODOS_LOADED",
      payload: JSON.parse(localStorage.getItem("todos")),
    });
  }

  addTodoBrowserStorage(text) {
    return async (dispatch, getState) => {
      await dispatch({
        type: "ADD_TODO",
        payload: text,
      });
    };
  }

  deleteTodoBrowserStorage(id) {
    const localStorageItems = JSON.parse(localStorage.getItem("todos"));

    const filteredLocalTodos = localStorageItems.filter((todo) => {
      if (todo.id !== id) {
        return true;
      }
      return false;
    });

    localStorage.setItem("todos", JSON.stringify(filteredLocalTodos));

    return async (dispatch, getState) => {
      await dispatch({
        type: "DELETE_TODO",
        payload: {
          id: id,
        },
      });
    };
  }

  completeTodoBrowserStorage(id) {
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

    return async (dispatch, getState) => {
      await dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });
    };
  }
}

export default BrowserStorage;
