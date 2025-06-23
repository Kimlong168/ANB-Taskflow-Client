import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/organisms/auth/login-form";
import { AuthContext } from "@/contexts/auth-context";

const Login = () => {
  const { isLoading, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    handleLogin(data, () => navigate("/"));
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default Login;
