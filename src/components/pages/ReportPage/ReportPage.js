import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import accountingsResource from "../../../helpers/api/accountings";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Page from "../../common/Page";
import * as flatten from "flat";

const ReportPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    console.log(startDate);
  };
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const generateReport = async () => {
    if (!startDate || !endDate) {
      alert("Выберите даты");
    } else {
      if (startDate >= endDate) {
        alert("Начальная дата должна быть меньше конечной");
      } else {
        const data = await accountingsResource.getByDates(startDate, endDate);
        if (!data) {
          alert("Нет данных по выбранной дате");
        } else {
          const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";
          console.log(data);

          const newData = data.map((item) => {
            return {
              "№": item.id,
              Дата: item.date,
              Тип: item.income ? "Приход" : "Расход",
              Пользователь: item.user.fullName,
              Материалы: item.medicines
                .map((med) => {
                  return `${med.medicine.name}; Количество: ${med.count}; Ед.изм.: ${med.medicine.unit.name}; Цена: ${med.price}`;
                })
                .join("\n"),
            };
          });

          const ws = XLSX.utils.json_to_sheet(newData);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const dt = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(
            dt,
            `Отчет_${
              startDate.getDay() + 1
            }-${startDate.getMonth()}-${startDate.getFullYear()}_${
              endDate.getDay() + 1
            }-${endDate.getMonth()}-${endDate.getFullYear()}` + fileExtension
          );
        }
      }
    }
  };
  return (
    <Page title="Отчеты">
      <MainLayout>
        <MainBox>
          <Typography align="center" width="70%">
            Для создания отчета выберите дату начала, дату окончания и нажмите
            на кнопку сгенерировать отчет. Отчеты генирируются по приходам и
            расходам за указанный период
          </Typography>
          <Box
            style={{
              marginTop: "40px",
              width: "60%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Начало периода"
                inputFormat="dd/MM/yyyy"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Окончание периода"
                inputFormat="dd/MM/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Button
            style={{ marginTop: "40px" }}
            onClick={() => generateReport()}
            variant="outlined"
            color="success"
          >
            Создать отчет
          </Button>
        </MainBox>
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

export default ReportPage;
