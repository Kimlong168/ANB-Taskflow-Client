import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/atoms/input";
import { AuthFormWrapper } from "@/components/molecules/auth-form-wrapper";

export const LoginForm = ({ onSubmit, isLoading }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    onSubmit(data);
  };

  return (
    <AuthFormWrapper
      title="Login to your account"
      subtitle="Enter your email to log in to your account."
    >
      <div className="flex flex-col gap-6">
        <Input
          name="email"
          label="Email"
          placeholder="email"
          type="email"
          value={data.email}
          onChange={handleOnChange}
          required={true}
        />
        <Input
          name="password"
          label="Password"
          placeholder="password"
          type="password"
          value={data.password}
          onChange={handleOnChange}
          required={true}
        />
        <Button
          type="submit"
          className="w-full !bg-primary/90 !text-white"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Create a new account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
