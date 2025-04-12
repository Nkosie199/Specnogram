/** @jsxImportSource theme-ui */
import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "theme-ui";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/users", label: "Users" },
  { to: "/projects", label: "Projects" },
  { to: "/tasks", label: "Tasks" },
  { to: "/notifications", label: "Notifications" },
  { to: "/roles", label: "Roles" },
];

export const Navbar: React.FC = () => {
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
          fontWeight: "bold",
          fontSize: 3,
          mb: 4,
          textAlign: "center",
          color: "primary",
        }}
      >
        Specnogram
      </Box>

      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              borderRadius: "md",
              "&:hover": {
                bg: "primary",
                color: "background",
              },
              transition: "all 0.2s ease",
            }}
          >
            {link.label}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Navbar;
