import React from "react";

const TodoItem = ({ title, descripiton, isCompleted }) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{descripiton}</p>
      </div>
      <div>
        <input type="checkbox" checked={isCompleted}/>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
