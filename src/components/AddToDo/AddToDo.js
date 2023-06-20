import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./AddTodo.css";

const AddToDo = ({ fetchTodos }) => {
  const [value, setValue] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/todos", {
      todo: value,
      isChecked: false,
    });

    setValue("");
    fetchTodos();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ui segment input-container"
    >
      <form className="ui form container-form" onSubmit={onSubmit}>
        <div className="field">
          <input
            required
            placeholder="Add todo"
            onChange={onChange}
            value={value}
          />
        </div>
        <motion.button
          className="ui circular icon button add-button"
          type="submit"
          whileHover={{
            y: -5,
            scale: 1.1,
            backgroundColor: "hsl(220, 98%, 61%)",
            color: "hsl(0, 0%, 100%)",
          }}
        >
          <i className="plus icon" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddToDo;
