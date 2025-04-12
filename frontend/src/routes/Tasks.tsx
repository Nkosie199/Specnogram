import * as React from "react";
import api from "../api/api";
import { Task } from "../types/types";
import { Box } from "theme-ui";

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.taskId}>
            {task.title} — {task.status} — Assigned to: {task.assignee || "N/A"}
          </li>
        ))}
      </ul>
    </Box>
  );
};
