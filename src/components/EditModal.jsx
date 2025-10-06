import React, { useState } from "react";
import Tag from "./Tag";
import "./EditModal.css";

const EditModal = ({ task, onUpdate, onClose }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const checkTag = (tag) => {
    return editedTask.tags?.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (editedTask.tags?.some((item) => item === tag)) {
      const filteredTags = editedTask.tags.filter((item) => item !== tag);
      setEditedTask((prev) => ({ ...prev, tags: filteredTags }));
    } else {
      setEditedTask((prev) => ({ ...prev, tags: [...(prev.tags || []), tag] }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            value={editedTask.task}
            className="task-input"
            placeholder="Enter your task"
            onChange={handleChange}
          />

          <div className="task-form-bottom-line">
            <div>
              <Tag
                tagName="HTML"
                selectTag={selectTag}
                selected={checkTag("HTML")}
              />
              <Tag
                tagName="CSS"
                selectTag={selectTag}
                selected={checkTag("CSS")}
              />
              <Tag
                tagName="JavaScript"
                selectTag={selectTag}
                selected={checkTag("JavaScript")}
              />
              <Tag
                tagName="React"
                selectTag={selectTag}
                selected={checkTag("React")}
              />
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
