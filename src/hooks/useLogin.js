import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedState, currentUserState } from "../atoms/auth";
import authResource from "../helpers/api/auth";

const useLogin = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const login = useCallback(
    async (username, password) => {
      const data = await authResource.login(username, password);
      if (data) {
        setIsAuthenticated(true);
        setCurrentUserState(data);
        console.log(currentUserState);
        navigate("/");
      } else {
        setIsAuthenticated(null);
        setCurrentUserState(null);
      }
    },
    [navigate, setCurrentUserState, setIsAuthenticated]
  );

  return login;
};

export default useLogin;
