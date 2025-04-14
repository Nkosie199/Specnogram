import * as React from "react";
import api from "../api/api";
import { Project } from "../types/types";
import { Box, Button } from "theme-ui";
import CreateProjectModal from "../services/project/components/CreateProject";
import { useNavigate } from "react-router-dom";
import * as Moment from 'moment'

export const Projects: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  const openCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", w: "100%", justifyContent: "space-between" }}>
        <h2>Projects</h2>
        <Button
          onClick={() => {
            openCreateProjectModal();
          }}
          sx={{
            "&:hover": {
              bg: "highlight",
              cursor: "pointer"
            },
          }}
        >
          Create Project
        </Button>
      </Box>
      {showCreateProjectModal && <CreateProjectModal onClose={() => closeCreateProjectModal()} />}
      <Box as="ul" sx={{ listStyle: "none", p: 0 }}>
        {projects.map(project => (
          <Box as="li" key={project.projectId} sx={{ mb: 2 }}>
            <Button
              onClick={() => navigate(`/projects/${project.projectId}`)}
              sx={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                bg: "muted",
                color: "text",
                borderRadius: "lg",
                boxShadow: "sm",
                "&:hover": {
                  bg: "highlight",
                  cursor: "pointer"
                },
              }}
            >
              <span style={{ opacity: 0.7 }}>{project.projectId}</span>
              <span>{project.title}</span>
              <span style={{ opacity: 0.7 }}>{Moment(project.deadline).format('MMMM Do YYYY, h:mm A')}</span>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
