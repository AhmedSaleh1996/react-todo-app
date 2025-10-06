import React from "react";
import "./TaskTable.css";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit-text.png";

const TaskTable = ({ tasks, handleDelete, handleEdit }) => {
  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{Array.isArray(task.tags) ? task.tags.join(", ") : ""}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
              <td>
                <div className="task-actions">
                  <button
                    className="task-action-btn"
                    onClick={() => handleEdit(index)}
                  >
                    <img src={editIcon} alt="edit" className="table-icon" />
                  </button>
                  <button
                    className="task-action-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <img src={deleteIcon} alt="delete" className="table-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
