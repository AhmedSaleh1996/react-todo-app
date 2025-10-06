import React, { useState } from "react";
import Tag from "./Tag";
import "./EditModal.css";

const EditModal = ({ task, onUpdate, onClose }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [error, setError] = useState("");

  const checkTag = (tag) => editedTask.tags?.includes(tag);

  const selectTag = (tag) => {
    if (checkTag(tag)) {
      setEditedTask((prev) => ({
        ...prev,
        tags: prev.tags.filter((item) => item !== tag),
      }));
    } else {
      setEditedTask((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
    if (name === "task" && value.trim() !== "") setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedTask.task || editedTask.task.trim() === "") {
      setError("Task field cannot be empty");
      return;
    }
    onUpdate(editedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="error-text">
              <span className="error-icon">!</span> {error}
            </p>
          )}
          <input
            type="text"
            name="task"
            value={editedTask.task}
            className={`task-input ${error ? "error" : ""}`}
            placeholder="Enter your task"
            onChange={handleChange}
          />

          <div className="task-form-bottom-line">
            <div>
              {["HTML", "CSS", "JavaScript", "React"].map((tag) => (
                <Tag
                  key={tag}
                  tagName={tag}
                  selectTag={selectTag}
                  selected={checkTag(tag)}
                />
              ))}
            </div>

            <div className="task-status-wrapper">
              <select
                name="status"
                value={editedTask.status}
                className="task-status"
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
