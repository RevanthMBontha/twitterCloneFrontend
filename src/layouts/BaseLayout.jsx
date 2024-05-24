import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const BaseLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, []);
  return <Outlet />;
};

export default BaseLayout;
