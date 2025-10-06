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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ status, task, tags }) => {
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
  };

  const handleDelete = (taskIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return; // لو ضغط Cancel، ما يحصلش أي حاجة

    const newTask = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTask);
  };

  const handleEdit = (index) => {
    setEditTask({ ...tasks[index], index });
  };

  const handleUpdate = (updatedTask) => {
    const newTasks = [...tasks];
    newTasks[updatedTask.index] = {
      task: updatedTask.task,
      status: updatedTask.status,
      tags: updatedTask.tags || [],
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
