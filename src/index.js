import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TasksProvider } from "./context/TaskContext";
import { AuthContextProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksProvider>
        <App />
      </TasksProvider>

    </AuthContextProvider>
  </React.StrictMode>
);
