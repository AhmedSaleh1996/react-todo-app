import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ title, tags, handleDelete, index }) => {
  return (
    <article className="task-card">
      <p className="task-text">{title}</p>

      <div className="task-card-bottom-line">
        <div className="task-card-tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="task-delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete-icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
