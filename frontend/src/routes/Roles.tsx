import * as React from "react";
import api from "../api/api";
import { Role } from "../types/types";
import { Box } from "theme-ui";

export const Roles: React.FC = () => {
  const [roles, setRoles] = React.useState<Role[]>([]);

  React.useEffect(() => {
    api.get("/roles").then(res => setRoles(res.data));
  }, []);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <h2>Roles</h2>
      <ul>
        {roles.map(r => (
          <li key={r.roleId}>
            Role ID: {r.roleId} — {r.description}
          </li>
        ))}
      </ul>
    </Box>
  );
};
