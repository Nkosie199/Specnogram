import * as React from "react";
import api from "../api/api";
import { User } from "../types/types";
import { Box } from "theme-ui";

export const Users: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.userName} — {user.email}
          </li>
        ))}
      </ul>
    </Box>
  );
};
