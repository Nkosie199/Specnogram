import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "theme-ui";
import { getCurrentUser } from "./js/utils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      navigate("/");
    } else {
      window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }
  };

  return (
    <Box sx={{ display: 'flex', w: "100%", mx: "auto", mt: 5, justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleLogin}>Login with Google</Button>
    </Box>
  );
};

export default Login;
