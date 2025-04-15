import api from "../../../api/api";

export const getCurrentUser = async () => {
  const currentUser = await api.get(`/auth/me`);
  console.log("user:", currentUser);
  localStorage.setItem("user", JSON.stringify(currentUser));
  return currentUser;
};
