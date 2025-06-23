import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";
import { ThemeSwitchBtn } from "../atoms/theme-switch-btn";

const Layout = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  if (!user) return navigate("/login");

  return (
    <div className="p-4 md:p-6 container">
      <Outlet />
      <ThemeSwitchBtn />
    </div>
  );
};

export default Layout;
