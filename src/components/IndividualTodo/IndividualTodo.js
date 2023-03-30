import "./IndividualTodo.css";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import axios from "axios";

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

class IndividualTodo extends React.Component {
  state = { isChecked: this.props.isComplete, isVisible: true };

  handleOnClick = () => {
    this.setState({ isVisible: false });
    this.handleDelete();
  };

  handleDelete = () =>
    setTimeout(async () => {
      await axios.delete(
        "http://localhost:3001/todos/" + this.props.individualTodo.id
      );
      await this.props.fetchFromServer();
    }, 200);

  //DE VERIFICAT CU VIRGIL THE HACKY WAY IN CARE AM FACUT FUNCTIONALITATEA DE MARK AS READ SA FUNCTIONEZE IN TIMP REAL.
  //INITIAL TREBUIA APASAT DE 2 ORE PENTRU A PRIMI UN PATCH CODE 200 SI UN GET CODE DE 200 PENTRU UPDATE-UL VIZUAL
  //IN handleCheckmark SE FACE SETSTATE DOAR CA IN METODA handleCheckmarkPatch SE FACEA PATCH CU STATE-UL TRECUT(FALSE),
  //ASA CA AM NEGAT STATE-UL SA INTOARCA OCUPUL A CE ERA

  handleCheckmarkPatch = async () => {
    await axios.patch(
      `http://localhost:3001/todos/${this.props.individualTodo.id}`,
      {
        isChecked: !this.state.isChecked,
      }
    );
    await this.props.fetchFromServer();
  };

  handleCheckmark = (e) => {
    this.setState({ isChecked: e.target.checked });
    this.handleCheckmarkPatch(this.state.isChecked);
  };

  render() {
    return (
      <AnimatePresence>
        {this.state.isVisible ? (
          <motion.div
            variants={componentContainerVariants}
            initial="init"
            animate="visible"
            exit="end"
          >
            <motion.div
              className="ui segment to-do-container "
              key={this.props.individualTodo.id}
              style={
                this.state.isChecked ? { textDecoration: "line-through" } : null
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
                    onChange={this.handleCheckmark}
                    checked={this.state.isChecked}
                  ></input>
                </motion.label>
                <div className="todo-item">
                  <h2>{this.props.individualTodo.todo}</h2>
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
                    onClick={this.handleOnClick}
                    className="circular ui icon button"
                  >
                    <i className="trash alternate icon"></i>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          !this.state.isVisible
        )}
      </AnimatePresence>
    );
  }
}
export default IndividualTodo;
