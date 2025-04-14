import * as React from "react";
import api from "../api/api";
import { Task } from "../types/types";
import { Box, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../services/task/components/CreateTask";

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const openCreateTaskModal = () => {
    setShowCreateTaskModal(true);
  };

  const closeCreateTaskModal = () => {
    setShowCreateTaskModal(false);
  };

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", w: "100%", justifyContent: "space-between" }}>
        <h2>Tasks</h2>
        <Button
          onClick={() => {
            openCreateTaskModal();
          }}
          sx={{
            "&:hover": {
              bg: "highlight",
              cursor: "pointer"
            },
          }}
        >
          Create Task
        </Button>
      </Box>
      {showCreateTaskModal && <CreateTaskModal onClose={() => closeCreateTaskModal()} />}
      <Box as="ul" sx={{ listStyle: "none", p: 0 }}>
        {tasks.map(task => (
          <Box as="li" key={task.taskId} sx={{ mb: 2 }}>
            <Button
              onClick={() => navigate(`/tasks/${task.taskId}`)}
              sx={{
                width: "100%",
                textAlign: "center",
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
              <span style={{ opacity: 0.7, margin: '0 5px' }}>{task.taskId}</span>
              <span>{task.title} — {task.status} — Assigned to: {task.assignee || "N/A"}</span>
              <span style={{ opacity: 0.7, margin: '0 5px' }}>{task.projectId}</span>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
