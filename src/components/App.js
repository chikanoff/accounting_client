import React, { useEffect } from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material";
import MainRouter from "./MainRouter";
import { checkAuth, fetchCurrentUser } from "../helpers/api/auth";

function App() {
  const theme = createTheme();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(async () => {
    const [isAuthenticated, currentUser] = await Promise.all([
      checkAuth(),
      fetchCurrentUser(),
    ]);

    setIsAuthenticated(isAuthenticated);
    setCurrentUser(currentUser);
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <CssBaseline />
          <MainRouter />
        </Box>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
