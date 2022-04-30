import styled from "@emotion/styled/macro";
import { Container } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import FullPageContainer from "../FullPageContainer";
import Footer from "./Footer";
import Header from "./Header";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const Main = styled.main`
  margin-top: 60px;
  height: 100%;
  flex-grow: 1;
  padding: ${(props) => props.theme.spacing(3)};
`;

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <FullPageContainer className={classes.root}>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </FullPageContainer>
  );
};

export default MainLayout;
