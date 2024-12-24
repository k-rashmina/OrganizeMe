import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import TaskTable from "./TaskTable";
import FilterForm from "./FilterForm";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("accessToken");

  //today
  const date = new Date().toJSON();
  const today = date.substring(0, 16);

  const [tasks, setTasks] = useState([]);
  const [taskGetterTrigger, setTaskGetterTrigger] = useState(false);
  const [updatingTask, setUpdatingTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
    userId: "",
    priority: "",
    create_date: "",
    update_date: "",
  });

  //state for storing new task details
  const [newtask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
    userId: "",
    priority: "",
  });

  const handleChange = (e) => {
    setUpdatingTask({
      ...updatingTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewTaskChange = (e) => {
    setNewTask({
      ...newtask,
      [e.target.name]: e.target.value,
    });
  };

  const getUpdatingTask = (task) => {
    setUpdatingTask(task);
  };

  const [modalStyle, setModalStyle] = useState({
    display: "none",
  });

  const [newTaskmodalStyle, setNewTaskmodalStyle] = useState({
    display: "none",
  });

  //function to show update form modal
  const showModal = () => {
    setModalStyle({
      display: "block",
    });
  };

  //function to close update form modal
  const closeModal = () => {
    setModalStyle({
      display: "none",
    });
  };

  //function to show new task form modal
  const showNewTaskModal = () => {
    setNewTaskmodalStyle({
      display: "block",
    });
  };

  //function to close new task form modal
  const closeNewTaskModal = () => {
    setNewTaskmodalStyle({
      display: "none",
    });
  };

  const [filters, setFilters] = useState({
    sortBy: "dueDate",
    order: "1",
    priority: "",
  });

  const getTasks = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    // console.log("inside effect");
    axios
      .get(
        `http://localhost:5000/api/task/?sortBy=${filters.sortBy}&sort=${filters.order}&priority=${filters.priority}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filters, taskGetterTrigger]);

  //function for posting task details to create a new task
  const createTask = (e) => {
    e.preventDefault();
    if (newtask.dueDate.length < 24)
      newtask.dueDate = `${newtask.dueDate}:00.000Z`;

    // console.log(newtask);

    axios
      .post("http://localhost:5000/api/task/", newtask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTaskGetterTrigger(!taskGetterTrigger))
      .catch((err) => console.log(err))
      .finally(() => closeNewTaskModal());
  };

  //function for sending the update request for a task
  const updateTask = (e) => {
    e.preventDefault();
    if (updatingTask.dueDate.length < 24)
      updatingTask.dueDate = `${updatingTask.dueDate}:00.000Z`;
    // console.log(updatingTask);

    axios
      .put("http://localhost:5000/api/task", updatingTask)
      .then((res) => {
        setTaskGetterTrigger(!taskGetterTrigger);
      })
      .catch((err) => console.log(err))
      .finally(() => closeModal());
  };

  //function for sending the delete request for a task
  const deleteTask = (taskId) => {
    if (confirm("Are you giving up on this task? :-(")) {
      axios
        .delete(`http://localhost:5000/api/task/${taskId}`)
        .then((res) => setTaskGetterTrigger(!taskGetterTrigger))
        .catch((err) => console.log(err));
      // console.log(taskId);
    }
  };

  // console.log(today);
  return (
    <div className="dashboard-container">
      <Header buttonName={"Profile"} buttonLink={"/profile"} />
      <center>
        <header className="dashboard-header">
          {/* Header elements */}
          <div className="header-icon">Icon 1</div>
          <div className="header-icon">Icon 2</div>
          <div className="header-icon">Icon 3</div>
        </header>
      </center>
      <FilterForm onSearch={getTasks} />

      {tasks && (
        <TaskTable
          tasks={tasks}
          showModal={showModal}
          getUpdatingTask={getUpdatingTask}
          deleteTask={deleteTask}
          showNewTaskModal={showNewTaskModal}
        />
      )}

      {/* New Task Modal */}
      <div className="modal" style={newTaskmodalStyle}>
        <center>
          <form className="login-form update-form" onSubmit={createTask}>
            <h2>Add a Task</h2>
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Task Title"
              value={newtask?.title}
              required={true}
              onChange={handleNewTaskChange}
              // onBlur={validateEmail}
            />
            {/* {errors.emailError && (
              <p className="form-error-msg">{errors.emailError}</p>
            )} */}
            <label htmlFor="description" style={{ left: "0px" }}>
              Task Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter Task Description"
              value={newtask?.description}
              onChange={handleNewTaskChange}
              // onBlur={validateEmail}
            />{" "}
            <label htmlFor="dueDate">Task Due Date</label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              // placeholder="Enter New Due Date"
              value={newtask?.dueDate.substring(0, 16)}
              // required={true}
              min={today}
              onChange={handleNewTaskChange}
              // onBlur={validateEmail}
            />
            <label htmlFor="priority">Task Due Date</label>
            <select
              className="form-select"
              style={{
                width: "100%",
                height: "8vh",
                borderRadius: "10px",
                marginTop: "5px",
              }}
              id="priority"
              name="priority"
              value={newtask?.priority}
              onChange={handleNewTaskChange}
              required={true}
            >
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
            </select>
            <div className="update-form-buttons">
              <button>Add Task</button>
              <button type="button" onClick={() => closeNewTaskModal()}>
                Cancel
              </button>
            </div>
          </form>
        </center>
      </div>

      {/* Update Form Modal */}
      <div className="modal" style={modalStyle}>
        <center>
          <form className="login-form update-form" onSubmit={updateTask}>
            <h2>Update Task</h2>
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter New Task Title"
              value={updatingTask?.title}
              required={true}
              onChange={handleChange}
              // onBlur={validateEmail}
            />
            {/* {errors.emailError && (
              <p className="form-error-msg">{errors.emailError}</p>
            )} */}
            <label htmlFor="description" style={{ left: "0px" }}>
              Task Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter New Task Description"
              value={updatingTask?.description}
              onChange={handleChange}
              // onBlur={validateEmail}
            />{" "}
            <label htmlFor="dueDate">Task Due Date</label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              // placeholder="Enter New Due Date"
              value={updatingTask?.dueDate.substring(0, 16)}
              // required={true}
              min={today}
              onChange={handleChange}
              // onBlur={validateEmail}
            />
            <label htmlFor="priority">Task Due Date</label>
            <select
              className="form-select"
              style={{
                width: "100%",
                height: "8vh",
                borderRadius: "10px",
                marginTop: "5px",
              }}
              id="priority"
              name="priority"
              value={updatingTask?.priority}
              onChange={handleChange}
              required={true}
            >
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
            </select>
            <div className="update-form-buttons">
              <button>Update</button>
              <button type="button" onClick={() => closeModal()}>
                Cancel
              </button>
            </div>
          </form>
        </center>
      </div>
    </div>
  );
}
