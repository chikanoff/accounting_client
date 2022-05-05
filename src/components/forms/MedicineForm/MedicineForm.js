import React from "react";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const MedicineForm = ({ data, onSubmit }) => {
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
              {...register("name", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
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

export default MedicineForm;
