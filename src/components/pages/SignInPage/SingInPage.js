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

const theme = createTheme();

const SignInPage = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const onSubmit = useCallback(async ({ username, password, remember }) => {
    const res = await login(username, password, remember);
    if (res) {
      navigate("/home");
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.username}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
            />

            <TextField
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
