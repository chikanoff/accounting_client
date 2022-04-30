import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../atoms/auth";

const AdminRoute = ({ children, ...rest }) => {
  const currentUser = useRecoilValue(currentUserState);
  console.log(currentUser);
  return currentUser?.admin ? children : <Navigate to={{ pathname: "/" }} />;
};

export default AdminRoute;
