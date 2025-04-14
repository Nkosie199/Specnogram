import * as React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  const fetchUserInfo = async (code: string) => {
    try {
      const res = await api.post("/auth/login", { code });
      console.log("OAuth2 callback response:", res);
      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      console.error("Error during OAuth2 callback:", err);
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("code: ", code)
    if (code) {
      fetchUserInfo(code);
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
