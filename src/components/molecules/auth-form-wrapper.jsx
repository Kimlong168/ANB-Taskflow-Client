import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

export const AuthFormWrapper = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <AuthFormHeader title={title} subtitle={subtitle} />
            <CardContent>
              <form>{children}</form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AuthFormHeader = ({ title, subtitle }) => {
  return (
    <CardHeader>
      <Link to="/home">
        <img
          className="mx-auto mb-4 w-16 h-16 rounded-xl p-0.5 border border-border-200"
          src={assets.logo}
          alt="logo"
        />
      </Link>
      <CardTitle className="text-center text-primary pb-1">{title}</CardTitle>
      {subtitle && (
        <CardDescription className="text-center">{subtitle}</CardDescription>
      )}
    </CardHeader>
  );
};

AuthFormHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

AuthFormWrapper.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
