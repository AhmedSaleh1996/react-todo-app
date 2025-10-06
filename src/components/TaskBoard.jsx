import React, { useState } from "react";
import TaskCol from "./TaskCol";
import TaskCard from "./TaskCard";
import TaskTable from "./TaskTable";
import "./TaskBoard.css";

const TaskBoard = ({ tasks, handleDelete, handleEdit }) => {
  const [view, setView] = useState("cards"); // "cards" | "table"

  return (
    <div className="task-board">
      <div className="view-toggle">
        <button
          className={view === "cards" ? "active" : ""}
          onClick={() => setView("cards")}
        >
          Cards View
        </button>
        <button
          className={view === "table" ? "active" : ""}
          onClick={() => setView("table")}
        >
          Table View
        </button>
      </div>

      {view === "cards" ? (
        <main className="app-main">
          <TaskCol
            title="To Do"
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <TaskCol
            title="In Progress"
            tasks={tasks}
            status="inprogress"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <TaskCol
            title="Completed"
            tasks={tasks}
            status="completed"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </main>
      ) : (
        <TaskTable
          tasks={tasks}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default TaskBoard;
