import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/organisms/auth/register-form";
import { AuthContext } from "@/contexts/auth-context";

const Register = () => {
  const { isLoading, handleRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    handleRegister(data, () => navigate("/"));
  };

  return <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default Register;
