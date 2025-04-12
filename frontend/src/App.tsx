import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Users, Projects, Tasks, Notifications, Roles } from "./routes";
import ProjectView from "./services/project/ProjectView";
import TaskView from "./services/task/TaskView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/projects/:id" element={<ProjectView />} />
        <Route path={"/tasks/" + 1} element={<TaskView />} />
      </Routes>
    </Router>
  );
}

export default App;
