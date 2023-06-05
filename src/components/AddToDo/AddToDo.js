import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./AddTodo.css";

const AddToDo = () => {
  const [todoText, setTodoText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const submitInput = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/todos", {
      todo: todoText,
      isChecked,
    });

    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ui segment input-container"
    >
      <form className="ui form container-form" onSubmit={submitInput}>
        <div className="field">
          <input
            required
            placeholder="Add todo"
            onInput={(e) => setTodoText(e.target.value)}
          ></input>
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
          <i className="plus icon"></i>
        </motion.button>
      </form>
    </motion.div>
  );
};

// class AddToDo extends React.Component {
//   state = { todo: "", isChecked: false };

//   submitInput = async (e) => {
//     e.preventDefault();

//     await axios.post("http://localhost:3001/todos", this.state);
//     await this.props.fetchFromServer();

//     e.target.reset();
//   };

//   render() {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="ui segment input-container"
//       >
//         <form className="ui form container-form" onSubmit={this.submitInput}>
//           <div className="field">
//             <input
//               required
//               placeholder="Add todo"
//               onInput={(e) => this.setState({ todo: e.target.value })}
//             ></input>
//           </div>
//           <motion.button
//             className="ui circular icon button add-button"
//             type="submit"
//             whileHover={{
//               y: -5,
//               scale: 1.1,
//               backgroundColor: "hsl(220, 98%, 61%)",
//               color: "hsl(0, 0%, 100%)",
//             }}
//           >
//             <i className="plus icon"></i>
//           </motion.button>
//         </form>
//       </motion.div>
//     );
//   }
// }

export default AddToDo;
