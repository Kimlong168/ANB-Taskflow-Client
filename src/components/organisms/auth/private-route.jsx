import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/home" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken) {
      return <Element {...rest} />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    return <Navigate to="/unauthorized" />;
  }
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
