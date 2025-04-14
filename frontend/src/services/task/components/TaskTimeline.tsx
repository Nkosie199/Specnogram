import * as React from "react";
import { Box, Text } from "theme-ui";
import { Task } from "../../../types/types";
import * as Moment from "moment";

interface TaskTimelineProps {
  task: Task;
  startDate: string; // The start date of the chart view window
}

const colors: Record<string, string> = {
  Open: "#8e44ad",
  "In Progress": "#f39c12",
  Qualified: "#1abc9c",
  "Issues Found": "#e74c3c",
  "Under Const.": "#d35400",
};

const TaskTimeline: React.FC<TaskTimelineProps> = ({ task, startDate }) => {
  const width = task?.durationInDays ? task.durationInDays * 24 : 24; // 24px per day
  const [offsetDays, setOffsetDays] = React.useState(1);
  const [startFormatted, setStartFormatted] = React.useState("");
  const [endFormatted, setEndFormatted] = React.useState("");

  React.useEffect(() => {
    if (task?.startDate && startDate) {
      const chartStart = Moment(startDate);
      const taskStart = Moment(task.startDate);
      setOffsetDays(taskStart.diff(chartStart, "day"));

      const taskEnd = taskStart.clone().add(task.durationInDays, "days");
      setStartFormatted(taskStart.format("MMM D"));
      setEndFormatted(taskEnd.format("MMM D"));
    }
  }, [task, startDate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 3,
        p: 2,
        borderRadius: 5,
        bg: "primary",
      }}
    >
      <Box sx={{ width: 200 }}>
        <Text>{task?.title}</Text>
      </Box>
      <Text sx={{ fontSize: 0 }}>{startFormatted}</Text>
      <Box
        sx={{
          ml: offsetDays * 24,
          width: `${width}px`,
          backgroundColor: colors[task?.status] || "#3498db",
          borderRadius: "4px",
          color: "white",
          textAlign: "center",
          fontSize: 1,
          px: 2,
          py: 1,
        }}
      >
        <Text>{task?.durationInDays} days</Text>
      </Box>
      <Text sx={{ fontSize: 0 }}>{endFormatted}</Text>
    </Box>
  );
};

export default TaskTimeline;
