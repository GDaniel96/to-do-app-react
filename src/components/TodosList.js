import React from "react";

import IndividualTodo from "./IndividualTodo/IndividualTodo";

const TodosList = (props) => {
  return (
    <div>
      {props.todoList.map((element) => {
        return (
          <IndividualTodo
            individualTodo={element}
            fetchFromServer={() => props.fetchFromServer()}
            key={element.id}
            isComplete={element.isChecked}
          />
        );
      })}
    </div>
  );
};

export default TodosList;
