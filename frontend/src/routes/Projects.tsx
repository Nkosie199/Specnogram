import * as React from "react";
import api from "../api/api";
import { Project } from "../types/types";

export const Projects: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.projectId}>
            {project.title} — {project.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};
