import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskCol from "./components/TaskCol";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const App = () => {
  return (
    <div className="app">
      <TaskForm />
      <main className="app-main">
        <TaskCol title="To do" icon={todoIcon} />
        <TaskCol title="Doing" icon={doingIcon} />
        <TaskCol title="Done" icon={doneIcon} />
      </main>
    </div>
  );
};

export default App;
