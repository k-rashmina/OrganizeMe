import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import TaskTable from "./TaskTable";
import FilterForm from "./FilterForm";
import axios from "axios";

export default function Dashboard() {
  const token = localStorage.getItem("accessToken");

  const [tasks, setTasks] = useState([]);

  const [filters, setFilters] = useState({
    sortBy: "dueDate",
    order: "1",
    priority: "",
  });

  const getTasks = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    console.log("inside effect");
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
  }, [filters]);

  return (
    <div className="dashboard-container">
      <Header />
      <header className="dashboard-header">
        {/* Header elements */}
        <div className="header-icon">Icon 1</div>
        <div className="header-icon">Icon 2</div>
        <div className="header-icon">Icon 3</div>
      </header>
      <FilterForm onSearch={getTasks} />

      {tasks && <TaskTable tasks={tasks} />}
    </div>
  );
}
