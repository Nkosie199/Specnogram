import * as React from "react";
import api from "../api/api";
import { Notification } from "../types/types";
import { Box } from "theme-ui";

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    api.get("/notifications").then(res => setNotifications(res.data));
  }, []);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.notificationId}>
            {n.message} — {n.isRead ? "✅ Read" : "🔔 Unread"}
          </li>
        ))}
      </ul>
    </Box>
  );
};
