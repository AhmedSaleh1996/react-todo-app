import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = () => {
  return (
    <article className="task-card">
      <p className="task-text">This is Sample Text.</p>

      <div className="task-card-bottom-line">
        <div className="task-card-tags">
          <Tag tagName="HTML" />
          <Tag tagName="CSS" />
        </div>
        <div className="task-delete">
          <img src={deleteIcon} className="delete-icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
