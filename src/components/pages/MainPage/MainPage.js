import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";

const MainPage = () => {
  return (
    <MainLayout>
      <MainBox>
        <Typography>Main Page</Typography>
        <Typography>Добро пожаловать в систему учета медикаментов</Typography>
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
`;

export default MainPage;
