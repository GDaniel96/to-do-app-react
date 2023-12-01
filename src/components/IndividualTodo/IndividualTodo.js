import "./IndividualTodo.css";
import { motion } from "framer-motion";
import React from "react";

const componentContainerVariants = {
  init: { opacity: 0, y: -400, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 100,
    },
  },
  end: {
    opacity: 0,
    translateX: 500,
    scale: 0.3,
  },
};

const IndividualTodo = ({ individualTodo, toggleComplete, deleteTodo }) => {
  const handleCheckmarkChange = async () => {
    toggleComplete(individualTodo.id, individualTodo.completed);
  };

  const handleDelete = () => {
    deleteTodo(individualTodo.id);
  };

  return (
    <motion.div
      variants={componentContainerVariants}
      initial="init"
      animate="visible"
      exit="end"
    >
      <motion.div
        className="ui segment to-do-container "
        key={individualTodo.id}
        style={
          individualTodo.completed ? { textDecoration: "line-through" } : null
        }
      >
        <div className="todo-and-checkbox-container">
          <motion.label
            className="checkbox-container"
            whileTap={{ scale: 1.5 }}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <input
              name="checkbox"
              type="checkbox"
              onChange={handleCheckmarkChange}
              checked={individualTodo.completed}
            />
          </motion.label>
          <div className="todo-item">
            <p>{individualTodo.text}</p>
          </div>
        </div>

        <div className="delete-container">
          <motion.div
            whileTap={{ scale: 1.5 }}
            whileHover={{
              y: -5,
              scale: 1.1,
            }}
          >
            <motion.button
              whileHover={{
                backgroundColor: "#e20e0e",
                color: "hsl(0, 0%, 100%)",
              }}
              onClick={handleDelete}
              className="circular ui icon button"
            >
              <i className="trash alternate icon" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IndividualTodo;
