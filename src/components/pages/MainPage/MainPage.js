import React, { useCallback } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import useLogin from "../../../hooks/useLogin";
import Copyright from "../../Copyright";
import MainLayout from "../../common/MainLayout";

const theme = createTheme();

const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>asdfsdaf</MainLayout>
    </ThemeProvider>
  );
};

export default MainPage;
