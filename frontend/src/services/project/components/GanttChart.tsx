import * as React from "react";
import { Box, Heading, Text } from "theme-ui";
import * as Moment from "moment";
import TaskTimeline from "../../task/components/TaskTimeline";
import { Project, Task } from "../../../types/types";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import { sortTasks } from "../../../util/utils";

const GanttChart: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState<Project | null>(null);
  const [tasks, setTasks] = React.useState<Task[] | null>([]);

  const getProjectById = async () => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data);
    });
  };

  const getTasksByProjectId = async () => {
    api.get(`/tasks/projects/${id}`).then(res => {
      setTasks(res.data);
    });
  };

  const getProjectStartDate = () => {
    const sortedTasks = sortTasks(tasks);
    return Moment(sortedTasks[0]?.startDate).format("YYYY-MM-DD") || Moment().format("YYYY-MM-DD");
  };

  React.useEffect(() => {
    getProjectById();
    getTasksByProjectId();
  }, []);

  return (
    <Box sx={{ overflowX: "auto", p: 3, border: "1px solid silver" }}>
      <Heading as="h3" mb={3}>
        Project Timeline
      </Heading>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text>Start date: {getProjectStartDate()}</Text>
        <Text>Due date: {Moment(project?.deadline).format("YYYY-MM-DD")}</Text>
      </Box>
      <Box>
        {sortTasks(tasks).map(task => (
          <TaskTimeline key={task.taskId} task={task} startDate={task.startDate} />
        ))}
      </Box>
    </Box>
  );
};

export default GanttChart;
