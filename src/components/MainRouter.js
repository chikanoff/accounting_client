import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import MedicinePage from "./pages/MedicinePage";
import ProtectedRoute from "./common/ProtectedRoute";
import AdminRoute from "./common/AdminRoute";

const MainRouter = () => (
  <Router>
    <Box className="App">
      <Routes>
        <Route path="/signin" exact element={<SignInPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicines"
          element={
            <AdminRoute>
              <MedicinePage />
            </AdminRoute>
          }
        />
      </Routes>
    </Box>
  </Router>
);

export default MainRouter;
