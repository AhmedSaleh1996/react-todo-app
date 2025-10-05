import React from "react";
import "./TaskCol.css";
import TaskCard from "./TaskCard";

const TaskCol = ({ title, icon, tasks, status, handleDelete, handleEdit }) => {
  return (
    <section className="task-col">
      <h2 className="task-col-heading">
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
              handleEdit={handleEdit}
              index={index}
            />
          )
      )}
    </section>
  );
};

export default TaskCol;
