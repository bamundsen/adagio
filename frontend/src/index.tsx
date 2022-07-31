import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context";
import { CalendarProvider } from "./contexts/calendar.context";
import "./index.css";
import App from "./App";
import { ProjectProvider } from "./contexts/project.context";
import { TaskProvider } from "./contexts/task.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <CalendarProvider>
              <App />
            </CalendarProvider>
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
