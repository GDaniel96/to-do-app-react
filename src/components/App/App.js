import "./App.css";
import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const fetchTodos = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/todos`)
      .then((items) => {
        setTodos(items.data);
      })
      .catch((e) => {
        console.log("Ups, there was an error fetching the data:" + e);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (value) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
      todo: value,
      isChecked: false,
    });

    fetchTodos();
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const toggleComplete = async (id, isChecked) => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
      isChecked: !isChecked,
    });

    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);

    fetchTodos();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ui container"
    >
      <h1> TODO</h1>
      <AddTodo addTodo={addTodo} />

      <TodoList
        todos={todos}
        filterActive={filterActive}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <div className="ui segment">
        <div className="ui checkbox ">
          <input type="checkbox" name="All" onChange={toggleFilter} />
          <label className="filter-checkbox">Show complete</label>
        </div>
      </div>
    </motion.div>
  );
};

export default App;
