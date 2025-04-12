/** @jsxImportSource theme-ui */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Grid } from "theme-ui";
import { Notifications, Projects, Roles, Tasks, Users } from ".";
import { DashboardCard, Navbar } from "./components";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bg: "background",
        color: "text",
        minHeight: "100vh",
        px: 4,
        py: 3,
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Heading as="h1" sx={{ fontSize: 5, mb: 4 }}>
          Dashboard
        </Heading>
        <Grid gap={4} columns={[1, 2, 2]} sx={{ mb: 4 }}>
          <DashboardCard title="Users" children={<Users />} />
          <DashboardCard title="Projects" children={<Projects />} />
          <DashboardCard title="Tasks" children={<Tasks />} />
          <DashboardCard title="Notifications" children={<Notifications />} />
          <DashboardCard title="Roles" children={<Roles />} />
        </Grid>
      </Box>
    </Box>
  );
};

