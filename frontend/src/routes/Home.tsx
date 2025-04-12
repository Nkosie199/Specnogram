/** @jsxImportSource theme-ui */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Grid } from "theme-ui";
import { Notifications, Projects, Roles, Tasks, Users } from ".";
import { DashboardCard, Navbar } from "./components";

export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bg: "background",
        color: "text",
        minHeight: "100vh",
        px: 0,
        py: 1,
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Heading as="h1" sx={{ fontSize: 5, mb: 4 }}>
          Dashboard
        </Heading>
        <Grid gap={4} columns={[1, 2, 2]} sx={{ mb: 4 }}>
          <DashboardCard title="Projects" children={<Projects />} />
          <DashboardCard title="Tasks" children={<Tasks />} />
          <DashboardCard title="Notifications" children={<Notifications />} />
        </Grid>
      </Box>
    </Box>
  );
};
