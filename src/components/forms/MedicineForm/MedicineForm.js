import React, { useEffect, useState } from "react";
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
import suppliersResource from "../../../helpers/api/suppliers";
import unitsResource from "../../../helpers/api/units";

const MedicineForm = ({ data, onSubmit }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await suppliersResource.getAll();
      setSuppliers(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await unitsResource.getAll();
      setUnits(res);
    };
    fetchData();
  }, []);

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
              {...register("name", {
                required: true,
                minLength: 1,
                maxLength: 256,
              })}
              error={!!errors.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Наименование"
              name="name"
              autoFocus
            />
            <TextField
              {...register("number", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.number}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="Номер"
              name="number"
              autoFocus
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Поставщик</InputLabel>
              <Select
                label="Поставщик"
                {...register("supplierId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.supplier.id}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Ед.Изм.</InputLabel>
              <Select
                label="Ед.Изм."
                {...register("unitId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.unit.id}
              >
                {units.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
