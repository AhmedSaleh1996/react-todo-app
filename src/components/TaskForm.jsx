import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ addTask, editTask }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  useEffect(() => {
    if (editTask) {
      setTaskData(editTask);
    }
  }, [editTask]);

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);

      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (taskData.task.trim() === "") {
      toast.error("Please enter a task name!");
      return;
    }

    if (taskData.tags.length === 0) {
      toast.error("Please select at least one tag!");
      return;
    }

    addTask(taskData);

    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  return (
    <header className="app-header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task-input"
          placeholder="Enter your task"
          onChange={handleChange}
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

            <button type="submit" className="task-submit">
              {editTask ? "Update Task" : "+ Add Task"}
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
