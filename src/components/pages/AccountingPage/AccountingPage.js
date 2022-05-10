import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import Page from "../../common/Page";
import medicinesResource from "../../../helpers/api/medicines";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import employeesResource from "../../../helpers/api/employees";
import accountingsResource from "../../../helpers/api/accountings";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../atoms/auth";

const initialValues = {
  id: 0,
  name: "",
};

const AccountingPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [records, setRecords] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedMedicinesIds, setSelectedMedicinesIds] = useState([]);
  const [isIncome, setIsIncome] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await medicinesResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await employeesResource.getAll();
      setEmployees(res);
    };
    fetchData();
  }, []);

  const doubleRegex = useMemo(
    () => /^(?!0*[.]0*$|[.]0*$|0*$)\d+[.]?\d{0,2}$/,
    []
  );

  const registerDoubleField = useCallback(
    (...props) => {
      const { onChange, ...rest } = register(...props);
      const customOnChange = (e) => {
        e.persist();
        if (!doubleRegex.test(e.target.value)) {
          e.target.value = e.target.value.slice(0, -1);
        }
        onChange(e);
      };

      return { onChange: customOnChange, ...rest };
    },
    [register, doubleRegex]
  );

  const onSubmit = useCallback(
    async (data) => {
      const { counts, prices, isIncome } = data;
      const medicines = selectedMedicinesIds.map((v, i) => ({
        medicineId: v,
        price: Number(prices[i]),
        count: Number(counts[i]),
      }));
      const accounting = {
        income: isIncome,
        employeeId: selectedEmployee,
        userId: currentUser.id,
        medicines,
      };
      console.log(accounting);
      const res = await accountingsResource.create(accounting);
    },
    [selectedMedicinesIds]
  );
  return (
    <Page title="Учет">
      <MainLayout>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            style={{
              width: " 100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Select
              {...register("isIncome")}
              style={{ width: "480px" }}
              value={isIncome}
              onChange={(e) => setIsIncome(e.target.value)}
            >
              <MenuItem key={true} value={true}>
                Приход
              </MenuItem>
              <MenuItem key={false} value={false}>
                Расход
              </MenuItem>
            </Select>
            {!isIncome && (
              <Select
                {...register("employeeId")}
                style={{ width: "480px", marginTop: "1.25rem" }}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.fullName}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>

          <hr
            style={{
              width: "100%",
              marginBottom: "1.25rem",
              marginTop: "1.25rem",
              borderColor: "#aab3b5",
            }}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Select
              style={{ width: "100%" }}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {records
                .filter((record) => !selectedMedicinesIds.includes(record.id))
                .map((record) => (
                  <MenuItem key={record.id} value={record.id}>
                    {record.name}
                  </MenuItem>
                ))}
            </Select>
            <Button
              style={{ marginLeft: "1rem", height: "56px" }}
              color="primary"
              variant="outlined"
              onClick={() => {
                setSelectedMedicinesIds((p) => [...p, selectedValue]);
                setSelectedValue(0);
              }}
            >
              Add
            </Button>
          </Box>
          <hr
            style={{
              width: "100%",
              marginBottom: "1.25rem",
              marginTop: "1.25rem",
              borderColor: "#aab3b5",
            }}
          />
          <Box style={{ width: "100%" }}>
            {selectedMedicinesIds
              .map((_id) => records.find((record) => record.id === _id))
              .map((record, index) => {
                return (
                  <Box
                    key={record.id}
                    label={record.name}
                    sx={{
                      display: "flex",
                      marginBottom: "1rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        width: "max(240px, 65%)",
                        whiteSpaces: "break-spaces",
                      }}
                    >
                      {record.name}
                    </span>
                    <TextField
                      {...registerDoubleField(`counts[${index}]`, {
                        required: true,
                        min: 1,
                        max: 9999,
                      })}
                      style={{ width: "100px" }}
                      label="Кол-во"
                    />
                    <TextField
                      {...registerDoubleField(`prices[${index}]`, {
                        required: true,
                        min: 1,
                        max: 9999,
                      })}
                      label="Цена"
                      style={{
                        marginLeft: "1rem",
                        width: "100px",
                      }}
                    />
                  </Box>
                );
              })}
          </Box>
          <hr
            style={{
              width: "100%",
              marginBottom: "1.25rem",
              marginTop: "1.25rem",
              borderColor: "#aab3b5",
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            style={{
              width: "40%",
            }}
          >
            submit
          </Button>
        </form>
      </MainLayout>
    </Page>
  );
};

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default AccountingPage;
