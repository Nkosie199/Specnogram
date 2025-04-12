export interface User {
  userId: number;
  userName: string;
  email: string;
}

export interface Role {
  roleId: number;
  userId: number;
  description: string;
}

export interface Project {
  projectId: number;
  userId: number;
  title: string;
  description: string;
  deadline: string;
}

export interface Task {
  taskId: number;
  projectId: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  durationInDays: number;
  reporter: string;
  assignee?: string;
}

export interface Notification {
  notificationId: number;
  userId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}
