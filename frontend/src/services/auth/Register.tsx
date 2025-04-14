import * as React from "react";
import { Box, Button, Input, Label, Text } from "theme-ui";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const Register: React.FC = () => {
  const [form, setForm] = React.useState({ email: "", password: "", name: "" });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", form);
      console.log("Register user response: ", res)
      navigate("/");
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Label>Name</Label>
      <Input name="name" value={form.name} onChange={handleChange} mb={3} />

      <Label>Email</Label>
      <Input name="email" value={form.email} onChange={handleChange} mb={3} />

      <Label>Password</Label>
      <Input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        mb={3}
      />

      {error && <Text sx={{ color: "red", mb: 2 }}>{error}</Text>}

      <Button onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default Register;
