import React from "react";
import "./TaskCol.css";
import TaskCard from "./TaskCard";

const TaskCol = ({ title, icon }) => {
  return (
    <section className="task-col">
      <h2 className="task-col-heading">
        <img className="task-col-icon" src={icon} alt="" />
        {title}
      </h2>
      <TaskCard/>
    </section>
  );
};

export default TaskCol;
