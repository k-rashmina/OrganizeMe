import React from "react";

export default function Dashboard() {
  const token = localStorage.getItem("accessToken");
  return <div>{token}</div>;
}
