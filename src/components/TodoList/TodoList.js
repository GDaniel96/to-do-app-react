import React from "react";
import "./TodosList.css";
import IndividualTodo from "../IndividualTodo/IndividualTodo";

const TodoList = ({ todos }) => {
  return (
    <div className="list-container">
      {todos.map((element) => {
        return (
          <IndividualTodo
            individualTodo={element}
            // fetchFromServer={this.props.fetchFromServer}
            key={element.id}
            isComplete={element.isChecked}
          />
        );
      })}
      <div className="ui segment">
        <div className="ui checkbox ">
          <input
            type="checkbox"
            name="All"
            // onChange={(e) => {
            //   this.handleFilter(e);
            // }}
          />
          <label className="filter-checkbox">Show complete</label>
        </div>
      </div>
    </div>
  );
};

// class TodosList extends React.Component {
//   //DE VERIFICAT LOGICA DE FILTRARE CU VIRGIL. BANUIALA MEA ESTE CA TREBUIE REGANDITA TOATA APLICATIA PENTRU A SE LUA DATELE DIN STATE-UL INITIAL SI RANDATE ASINCRON ODATA CE AU VENIT DE LA SERVER

//   state = { todos: [this.props.todoList] };

//   componentDidUpdate(prevProps) {
//     if (prevProps.todoList !== this.props.todoList) {
//       this.setState({ todos: this.props.todoList });
//     }
//   }

//   handleFilter = (e) => {
//     e.target.checked
//       ? this.setState({
//           todos: this.state.todos.filter((element) => {
//             return element.isChecked;
//           }),
//         })
//       : this.setState({ todos: this.props.todoList });
//   };

//   render() {
//     console.log(this.state.todos);
//     return (
//       <div className="list-container">
//         {this.state.todos.map((element) => {
//           return (
//             <IndividualTodo
//               individualTodo={element}
//               fetchFromServer={this.props.fetchFromServer}
//               key={element.id}
//               isComplete={element.isChecked}
//             />
//           );
//         })}
//         <div className="ui segment">
//           <div className="ui checkbox ">
//             <input
//               type="checkbox"
//               name="All"
//               onChange={(e) => {
//                 this.handleFilter(e);
//               }}
//             />
//             <label className="filter-checkbox">Show complete</label>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default TodoList;
