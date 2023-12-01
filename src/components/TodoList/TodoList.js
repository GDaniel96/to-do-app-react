import React from "react";
import "./TodosList.css";
import { AnimatePresence } from "framer-motion";
import IndividualTodo from "../IndividualTodo/IndividualTodo";

const TodoList = ({ todos, filterActive, toggleComplete, deleteTodo }) => {
  return (
    <div className="list-container">
      <AnimatePresence>
        {todos
          .filter((todo) => {
            if (filterActive) {
              return todo.completed;
            }
            return true;
          })
          .map((todo) => {
            return (
              <IndividualTodo
                individualTodo={todo}
                key={todo.id}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
