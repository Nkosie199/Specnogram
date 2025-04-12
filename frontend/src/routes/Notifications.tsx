import * as React from "react";
import api from "../api/api";
import { Notification } from "../types/types";

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    api.get("/notifications").then(res => setNotifications(res.data));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.notificationId}>
            {n.message} — {n.isRead ? "✅ Read" : "🔔 Unread"}
          </li>
        ))}
      </ul>
    </div>
  );
};
