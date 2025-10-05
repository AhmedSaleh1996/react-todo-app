import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit-text.png";

const TaskCard = ({ title, tags, handleDelete, handleEdit, index }) => {
  return (
    <article className="task-card">
      <p className="task-text">{title}</p>

      <div className="task-card-bottom-line">
        <div className="task-card-tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="task-actions">
          <div className="task-edit" onClick={() => handleEdit(index)}>
            <img src={editIcon} className="edit-icon" alt="edit" />
          </div>
          <div className="task-delete" onClick={() => handleDelete(index)}>
            <img src={deleteIcon} className="delete-icon" alt="delete" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
