import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Tag from "./Tag";
import "./PopupTaskForm.css";

const PopupTaskForm = ({ addTask, editTask }) => {
  const [showPopup, setShowPopup] = useState(false);

  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const [statusFilter, setStatusFilter] = useState("all");


  // لو جالنا editTask نعبّي الحقول ولكن لا نفتح البوب تلقائياً
  useEffect(() => {
    if (editTask) {
      setTaskData(editTask);
    }
  }, [editTask]);

  // Listener لفتح البوب عند dispatch من مكان ثاني (مثلاً TaskBoard)
  useEffect(() => {
    const openHandler = () => setShowPopup(true);
    document.addEventListener("openPopup", openHandler);
    return () => document.removeEventListener("openPopup", openHandler);
  }, []);

  const checkTag = (tag) => taskData.tags.includes(tag);

  const selectTag = (tag) => {
    setTaskData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskData.task.trim() === "") {
      toast.error("Please enter a task name!");
      return;
    }

    if (taskData.tags.length === 0) {
      toast.error("Please select at least one tag!");
      return;
    }

    addTask(taskData);
    setTaskData({ task: "", status: "todo", tags: [] });
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* ملاحظة: لا يوجد زر فتح هنا — الفتح يتم عبر event من TaskBoard */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-form-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="task"
                value={taskData.task}
                className="task-input"
                placeholder="Enter your task"
                onChange={handleChange}
                autoFocus
              />

              <div className="task-form-bottom-line">
                <div className="tags-wrapper">
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

                <div className="status-submit-wrapper">
                  <div className="task-status-wrapper">
                    <select
                      name="status"
                      value={taskData.status}
                      className="task-status"
                      onChange={handleChange}
                    >
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="popup-buttons">
                <button type="submit" className="update-btn">
                  {editTask ? "Update Task" : "Add Task"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupTaskForm;
