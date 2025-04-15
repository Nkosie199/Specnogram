/** @jsxImportSource theme-ui */
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "theme-ui";
import api from "../../api/api";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/projects", label: "Projects" },
  { to: "/notifications", label: "Notifications" },
  { to: "/roles", label: "Roles" },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    alert("Logged out!");
    const res = await api.post("/auth/logout", { credentials: "include" });
    console.log("Log out result: ", res);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      as="nav"
      sx={{
        width: "240px",
        height: "100vh",
        bg: "muted",
        p: 3,
        color: "text",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          fontWeight: "bold",
          fontSize: 3,
          mb: 3,
          textAlign: "center",
          color: "primary",
        }}
      >
        <img
          src="/assets/images/specno_logo.jpg"
          alt="Specnogram Logo"
          style={{ width: "60px", marginBottom: "8px" }}
        />
        <Text
          sx={{
            mx: 2,
            color: "text",
          }}
        >
          Specnogram
        </Text>
      </Box>

      {navLinks.map(link => (
        <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              px: 3,
              py: 2,
              borderRadius: "md",
              color: "text",
              "&:hover": {
                bg: "primary",
                color: "text",
                cursor: "pointer",
              },
              transition: "all 0.2s ease",
            }}
          >
            {link.label}
          </Box>
        </Link>
      ))}

      <Button
        onClick={() => {
          handleLogout();
        }}
        sx={{
          "&:hover": {
            bg: "highlight",
            cursor: "pointer",
          },
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Navbar;
