import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskBoard from "./components/TaskBoard";
import EditModal from "./components/EditModal";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });

  const [editTask, setEditTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ status, task, tags }) => {
    setIsLoading(true); // بدء التحميل

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

      setIsLoading(false); // إيقاف التحميل
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

  const handleEdit = (index) => {
    setEditTask({ ...tasks[index], index });
  };

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

  return (
    <div className="app">
      <TaskForm addTask={addTask} />

      <TaskBoard
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>
            <span>📦</span> No tasks yet – your board is clear!
          </p>
          <small>Start by adding your first task above</small>
        </div>
      )}

      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* شاشة التحميل */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Adding your task...</p>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
