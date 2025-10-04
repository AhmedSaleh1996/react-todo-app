import React from "react";
import "./TaskCol.css";
import TaskCard from "./TaskCard";

const TaskCol = ({ title, icon, tasks, status, handleDelete }) => {
  return (
    <section className="task-col">
      <h2 className="task-col-heading">
        <img className="task-col-icon" src={icon} alt="" />
        {title}
      </h2>

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard
              key={index}
              title={task.task}
              tags={task.tags}
              handleDelete={handleDelete}
              index={index}
            />
          )
      )}
    </section>
  );
};

export default TaskCol;
