import React from "react";
import axios from "axios";
import { motion } from "framer-motion";

class AddToDo extends React.Component {
  state = { todo: "", isChecked: false };

  submitInput = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/todos", this.state);

    await this.props.fetchFromServer();
  };

  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ui segment"
      >
        <form className="ui form" onSubmit={this.submitInput}>
          <div className="field">
            <label>Description</label>
            <input
              required
              placeholder="Todo"
              onInput={(e) => this.setState({ todo: e.target.value })}
            ></input>
          </div>
          <button className="ui button" type="submit">
            Add to do
          </button>
        </form>
      </motion.div>
    );
  }
}

export default AddToDo;
