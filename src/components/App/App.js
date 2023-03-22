import "./App.css";
import React from "react";
import AddToDo from "../AddToDo/AddToDo";
import TodosList from "../TodosList";
import axios from "axios";
import { motion } from "framer-motion";

class App extends React.Component {
  state = { listOfTodos: [] };
  componentDidMount() {
    this.fetchedData();
  }

  fetchedData = () => {
    axios
      .get("http://localhost:3001/todos")
      .then((items) => {
        const dataFromAPI = items.data;
        this.setState({ listOfTodos: dataFromAPI });
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
        <h1> Todo App</h1>
        <AddToDo fetchFromServer={() => this.fetchedData()} />
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
