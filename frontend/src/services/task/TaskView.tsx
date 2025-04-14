import * as React from "react";
import UpdateTask from "./components/UpdateTask";
import { Box } from "theme-ui";
import TaskTimeline from "./components/TaskTimeline";
import { Task } from "../../types/types";
import api from "../../api/api";
import { useParams } from "react-router-dom";

const TaskView: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = React.useState<Task | null>()

  React.useEffect(() => {
    api.get(`/tasks/${id}`).then(res => {
      setTask(res.data);
    });
  }, [id]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <UpdateTask />
      <TaskTimeline key={task?.taskId} task={task} startDate={task?.startDate} />
    </Box>
  );
};

export default TaskView;
