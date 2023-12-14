import "./App.css";
import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  saveNewTodo,
  deleteTodoWithId,
  markTodoAsComplete,
} from "../store";

const todosData = (state) => {
  return state.todos;
};

const filterActive = (state) => {
  return state.filterActive;
};

const App = () => {
  const todos = useSelector(todosData);
  const filterTodos = useSelector(filterActive);
  const dispatch = useDispatch();

  const addTodo = (text) => {
    dispatch(saveNewTodo(text));
    dispatch(fetchTodos);
  };

  const deleteTodo = (id) => {
    dispatch(deleteTodoWithId(id));
  };

  const toggleFilter = () => {
    dispatch({
      type: "TOGGLE_FILTER",
    });
  };

  const toggleTodoStatus = (id) => {
    dispatch(markTodoAsComplete(id));
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
        filterActive={filterTodos}
        toggleComplete={toggleTodoStatus}
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
