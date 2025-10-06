import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TaskBoard from "./components/TaskBoard";
import EditModal from "./components/EditModal";
import PopupTaskForm from "./components/PopupTaskForm";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });

  const [editTask, setEditTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ status, task, tags }) => {
    setIsLoading(true);
    setTimeout(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setTasks((prev) => [
        ...prev,
        { status, task, tags, createdAt: formattedDate },
      ]);

      setIsLoading(false);
    }, 2000);
  };

  const handleDelete = (index) => {
    const task = tasks[index];
    if (task.status === "inprogress") {
      alert("You cannot delete a task that is in progress.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => setEditTask({ ...tasks[index], index });

  const handleUpdate = (updatedTask) => {
    const newTasks = [...tasks];
    const oldTask = tasks[updatedTask.index];
    newTasks[updatedTask.index] = {
      task: updatedTask.task,
      status: updatedTask.status,
      tags: updatedTask.tags || [],
      createdAt: oldTask.createdAt,
    };
    setTasks(newTasks);
    setEditTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <div className="app">
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          Logout
        </button>
      </div>

      <PopupTaskForm addTask={addTask} editTask={editTask} />
      <TaskBoard
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdate}
        />
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Adding your task...</p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
