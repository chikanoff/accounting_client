import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const roles = [{ name: "ROLE_USER" }, { name: "ROLE_ADMIN" }];
export const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const UserForm = ({ data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit ? onSubmit(data) : console.log(data)
      )}
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          style={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <Box
            style={{ width: "100%" }}
            display="flex"
            flexDirection="column"
            alignContent="center"
            pb={2}
          >
            <TextField
              {...register("fullName", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.fullName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="ФИО"
              name="fullName"
              autoFocus
            />
            <TextField
              {...register("username", {
                required: true,
                minLength: 5,
                maxLength: 32,
              })}
              error={!!errors.username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              {...register("email", {
                required: true,
                minLength: 4,
                maxLength: 128,
                pattern: EMAIL_REGEX,
              })}
              error={!!errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            {data.id == 0 && (
              <TextField
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 40,
                })}
                error={!!errors.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Пароль"
                name="password"
                autoFocus
              />
            )}
            {data.id == 0 && (
              <FormControl margin="normal" fullWidth required>
                <InputLabel>Роль</InputLabel>
                <Select
                  label="Роль"
                  {...register("role", {
                    required: true,
                    minLength: 7,
                  })}
                  defaultValue={data.role}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.name} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ width: "100%" }}
          >
            submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default UserForm;
