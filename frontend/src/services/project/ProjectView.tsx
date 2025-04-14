import * as React from "react";
import { Box } from "theme-ui";
import UpdateProject from "./components/UpdateProject";
import GanttChart from "./components/GanttChart";

const ProjectView: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <UpdateProject />
      <GanttChart />
    </Box>
  );
};

export default ProjectView;
