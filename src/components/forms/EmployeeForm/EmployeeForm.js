import React from "react";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Autocomplete from "@mui/material/Autocomplete";

const EmployeeForm = ({ data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit ?? console.log)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <Box
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
              error={!!errors.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoFocus
            />
            <Autocomplete
              disablePortal
              id="department"
              {...register("departments", {
                required: true,
              })}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Отделение" />
              )}
            />
          </Box>

          <Button type="submit" variant="outlined">
            submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default EmployeeForm;
