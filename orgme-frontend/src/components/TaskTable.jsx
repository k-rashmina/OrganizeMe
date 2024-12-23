import React from "react";
import { IoPencilSharp } from "react-icons/io5";

export default function TaskTable({ tasks }) {
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div className="task-header-item">Task</div>
        <div className="task-header-item">Description</div>
        <div className="task-header-item">Due Date</div>
        <div className="task-header-item">Due Time</div>
        <div className="task-header-item">Priority</div>
        <div className="task-header-item">Created at</div>
      </div>
      <div className="task-list-body">
        {tasks.map((task, index) => (
          <div key={index} className="task-list-row">
            <div className="task-list-item">{task.title}</div>
            <div className="task-list-item">{task.description}</div>
            <div className="task-list-item">
              {task.dueDate.substring(0, 10)}
            </div>
            <div className="task-list-item">
              {task.dueDate.substring(11, 16)}
            </div>
            <div className="task-list-item">{task.priority}</div>
            <div className="task-list-item">{task.create_date}</div>
            <div className="task-list-item">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => {}}
              />
              <button className="edit-button" />
              <button className="delete-button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
