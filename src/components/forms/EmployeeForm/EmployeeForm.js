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
import Autocomplete from "@mui/material/Autocomplete";
import departmentsResource from "../../../helpers/api/departments";

const EmployeeForm = ({ data, onSubmit }) => {
  const [departments, setDepartments] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await departmentsResource.getAll();
      setDepartments(res);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data, departments },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit ? onSubmit(data) : console.log(data)
      )}
    >
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
            <FormControl fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                {...register("departmentId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.department.id}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Autocomplete
              disablePortal
              id="combo-box-department"
              options={departments.map((i) => ({ ...i, value: i.id }))}
              // {...register("departmentId", {
              //   required: true,
              // })}
              onChange={console.log}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Отделение" />
              )}
            /> */}
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
