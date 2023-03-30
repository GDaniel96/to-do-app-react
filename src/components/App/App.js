import "./App.css";
import React from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodosList from "../TodoList/TodosList";
import axios from "axios";
import { motion } from "framer-motion";

class App extends React.Component {
  state = { listOfTodos: [] };

  componentDidMount() {
    this.fetchedData();
  }

  fetchedData = async () => {
    await axios
      .get("http://localhost:3001/todos")
      .then((items) => {
        this.setState({ listOfTodos: items.data });
      })
      .catch((e) => {
        console.log("Ups, there was an error fetching the data:" + e);
      });
  };

  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ui container"
      >
        <h1> TODO</h1>
        <AddTodo fetchFromServer={() => this.fetchedData()} />

        <TodosList
          todoList={this.state.listOfTodos}
          fetchFromServer={() => {
            this.fetchedData();
          }}
        />
      </motion.div>
    );
  }
}

export default App;
