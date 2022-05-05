import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedState, currentUserState } from "../atoms/auth";
import authResource from "../helpers/api/auth";

const useLogout = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const logout = useCallback(async () => {
    setIsAuthenticated(null);
    setCurrentUserState(null);
    navigate("/signin");
    await authResource.logout();
  }, [navigate, setCurrentUserState, setIsAuthenticated]);

  return logout;
};

export default useLogout;
