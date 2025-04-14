import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Users, Projects, Tasks, Notifications, Roles } from "./routes";
import ProjectView from "./services/project/ProjectView";
import TaskView from "./services/task/TaskView";
import Register from "./services/auth/Register";
import Login from "./services/auth/Login";
import OAuthCallback from "./services/auth/OAuthCallback";

function App() {
  const user = localStorage.getItem("user");

  if (!user || user === "") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/projects/:id" element={<ProjectView />} />
          <Route path="/tasks/:id" element={<TaskView />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
