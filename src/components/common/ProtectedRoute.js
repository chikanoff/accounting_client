import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../atoms/auth";

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
      }}
    />
  );
};

export default ProtectedRoute;
