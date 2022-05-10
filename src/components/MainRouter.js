import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import MedicinePage from "./pages/MedicinePage";
import ProtectedRoute from "./common/ProtectedRoute";
import AdminRoute from "./common/AdminRoute";
import SupplierPage from "./pages/SupplierPage";
import EmployeePage from "./pages/EmployeePage";
import DepartmentPage from "./pages/DepartmentPage";
import UserPage from "./pages/UserPage";
import AccountingPage from "./pages/AccountingPage";

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
          path="/accounting"
          element={
            <ProtectedRoute>
              <AccountingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <MedicinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <AdminRoute>
              <SupplierPage />
            </AdminRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <AdminRoute>
              <EmployeePage />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <UserPage />
            </AdminRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <AdminRoute>
              <DepartmentPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Box>
  </Router>
);

export default MainRouter;
