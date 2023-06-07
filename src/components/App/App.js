import "./App.css";
import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((items) => {
        setTodos(items.data);
      })
      .catch((e) => {
        console.log("Ups, there was an error fetching the data:" + e);
      });
  }, []);

  const toggleFilter = (e) => {
    if (!e.target.checked) {
      setTodos(todos);
    }
    setTodos(
      todos.filter((todo) => {
        return todo.isChecked;
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ui container"
    >
      <h1> TODO</h1>
      <AddTodo />

      <TodoList todos={todos} toggleFilter={toggleFilter} />
    </motion.div>
  );
};

// class App extends React.Component {
//   state = { listOfTodos: [] };

//   componentDidMount() {
//     this.fetchedData();
//   }

//   fetchedData = async () => {
//     await axios
//       .get("http://localhost:3001/todos")
//       .then((items) => {
//         this.setState({ listOfTodos: items.data });
//       })
//       .catch((e) => {
//         console.log("Ups, there was an error fetching the data:" + e);
//       });
//   };

//   render() {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="ui container"
//       >
//         <h1> TODO</h1>
//         <AddTodo fetchFromServer={() => this.fetchedData()} />

//         <TodosList
//           todoList={this.state.listOfTodos}
//           fetchFromServer={() => {
//             this.fetchedData();
//           }}
//         />
//       </motion.div>
//     );
//   }
// }

export default App;
