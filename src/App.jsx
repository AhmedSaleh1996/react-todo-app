import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskCol from "./components/TaskCol";
import EditModal from "./components/EditModal";
``

const oldTasks = localStorage.getItem("tasks");
console.log(oldTasks);

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ status, task, tags }) => {
    setTasks((prev) => [...prev, { status, task, tags }]);
  };

  const handleDelete = (taskIndex) => {
    const newTask = tasks.filter((task, index) => index !== taskIndex);
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
      <main className="app-main">
        {tasks.length == 0 ? (
          <h1>No Data</h1>
        ) : (
          <>
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
          </>
        )}
      </main>
      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default App;
