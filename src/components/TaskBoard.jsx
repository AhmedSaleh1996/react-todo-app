import React, { useState } from "react";
import TaskCol from "./TaskCol";
import TaskTable from "./TaskTable";
import "./TaskBoard.css";

const TaskBoard = ({ tasks, handleDelete, handleEdit }) => {
  const [view, setView] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // فلترة التاسكات حسب البحث وحالة الـ status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="task-board">
      {/* شريط الأدوات (السيرش + الفلتر + زر الإضافة) */}
      <div className="task-header-actions">
        <input
          type="text"
          placeholder="Search tasks..."
          className="task-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* فلتر الحالة */}
        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="open-popup-btn"
          onClick={() => document.dispatchEvent(new Event("openPopup"))}
        >
          + Add Task
        </button>
      </div>

      {/* زرار التحويل بين العرضين */}
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

      {/* عرض التاسكات حسب الفيو */}
      {view === "cards" ? (
        <main className="app-main">
          <TaskCol
            title="To Do"
            tasks={filteredTasks}
            status="todo"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <TaskCol
            title="In Progress"
            tasks={filteredTasks}
            status="inprogress"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <TaskCol
            title="Completed"
            tasks={filteredTasks}
            status="completed"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </main>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default TaskBoard;
