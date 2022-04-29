import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material";
import MainRouter from "./MainRouter";

function App() {
  const theme = createTheme();
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
