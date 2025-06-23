import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/atoms/input";
import { AuthFormWrapper } from "@/components/molecules/auth-form-wrapper";

export const RegisterForm = ({ onSubmit, isLoading }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <AuthFormWrapper
      title="Register a new account"
      subtitle="Enter required information to register."
    >
      <div className="flex flex-col gap-4">
        <Input
          name="name"
          label="Name"
          placeholder="name"
          type="string"
          value={data.name}
          onChange={handleOnChange}
          required={true}
        />
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
        <Input
          name="confirmPassword"
          label="Password"
          placeholder="confirm password"
          type="password"
          value={data.confirmPassword}
          onChange={handleOnChange}
          required={true}
        />
        <Input
          name="image"
          label="Profile Image"
          type="file"
          onChange={handleOnChange}
        />
        <Button
          type="submit"
          className="w-full !bg-primary/90 !text-white"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already had an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
