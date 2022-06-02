import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import mainImg from "../../../main.jpg";

const MainPage = () => {
  return (
    <MainLayout>
      <MainBox>
        <Typography variant="h4">
          Добро пожаловать в систему учета медикаментов
        </Typography>
        <Typography
          variant="h6"
          style={{ width: "65%", marginTop: "10px" }}
          align="center"
        >
          Данная автоматизированная система разработана специально для
          учреждений здравоохранения, которая позволяет проводить учет
          материалов внутри учреждения здравоохранения
        </Typography>
      </MainBox>
    </MainLayout>
  );
};

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

export default MainPage;
