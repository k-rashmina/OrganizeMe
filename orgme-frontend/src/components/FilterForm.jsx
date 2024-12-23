import React from "react";
import { useState } from "react";

export default function FilterForm({ onSearch }) {
  const [sortBy, setSortBy] = useState("dueDate");
  const [order, setOrder] = useState("1");
  const [priority, setPriority] = useState("");

  const handleSearch = () => {
    onSearch({ sortBy, order, priority });
  };

  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          name="sortBy"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value={"dueDate"}>Due Date</option>
          <option value={"create_date"}>Created Date</option>
        </select>
      </div>

      <div className="filter-form-group">
        <label htmlFor="order">Order</label>
        <select
          id="order"
          name="order"
          onChange={(e) => setOrder(e.target.value)}
          value={order}
        >
          <option value={"1"}>Ascending</option>
          <option value={"-1"}>Descending</option>
        </select>
      </div>

      <div className="filter-form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value={""}>All</option>
          <option value={"high"}>High</option>
          <option value={"medium"}>Medium</option>
          <option value={"low"}>Low</option>
        </select>
      </div>

      <button className="filter-form-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
