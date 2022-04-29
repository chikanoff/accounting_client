import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./common/ProtectedRoute";

const MainRouter = () => (
  <Router>
    <Box className="App">
      <Routes>
        <Route path="/signin" exact element={<SignInPage />} />
        <Route path="/" element={<ProtectedRoute />} />
      </Routes>
    </Box>
  </Router>
);

export default MainRouter;
