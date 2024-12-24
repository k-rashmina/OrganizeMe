import React from "react";
import { IoPencilSharp } from "react-icons/io5";
import { isToday } from "date-fns";

export default function TaskTable({
  tasks,
  showModal,
  getUpdatingTask,
  deleteTask,
  showNewTaskModal,
  highlightTodayTasks,
}) {
  // const testDate = "2024-12-26T10:00:00.000+00:00";
  // const result = isToday(new Date(testDate));
  // console.log(result);

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div className="task-header-item">Task</div>
        <div className="task-header-item">Description</div>
        <div className="task-header-item">Due Date</div>
        <div className="task-header-item">Due Time</div>
        <div className="task-header-item">Priority</div>
        <div className="task-header-item">Created at</div>
        <button className="new-task-button" onClick={showNewTaskModal}>
          New Task ➕
        </button>
      </div>
      <div className="task-list-body">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={
              highlightTodayTasks && isToday(new Date(task.dueDate))
                ? "task-list-row-highlighted"
                : "task-list-row"
            }
          >
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
              <button
                className="edit-button"
                onClick={() => {
                  showModal();
                  getUpdatingTask(task);
                }}
              />
              <button
                onClick={() => deleteTask(task._id)}
                className="delete-button"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
