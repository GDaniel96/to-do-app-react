import axios from "axios";

class ServerStorage {
  async getTodosServerStorage(dispatch) {
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

  addTodoServerStorage(text) {
    return async (dispatch, getState) => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        text: text,
        completed: false,
      });
      dispatch({
        type: "ADD_TODO",
        payload: response.data,
      });
    };
  }

  deleteTodoServerStorage(id) {
    return async (dispatch, getState) => {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/${id}`
      );
      dispatch({
        type: "DELETE_TODO",
        payload: {
          id: id,
        },
      });
    };
  }

  completeTodoServerStorage(id) {
    return async (dispatch, getState) => {
      await axios.patch(`${process.env.REACT_APP_API_URL}/${id}`);

      dispatch({
        type: "TOGGLE_COMPLETED",
        payload: {
          id: id,
        },
      });
    };
  }
}

export default ServerStorage;
