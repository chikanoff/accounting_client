import styled from "@emotion/styled/macro";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "../../../atoms/sidebar";
import FullPageContainer from "../FullPageContainer";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const ContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(8, 0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${150}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Main = styled.main`
  height: 100%;
  padding: ${(props) => props.theme.spacing(3)};
`;

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const sidebarOpen = useRecoilValue(sidebarOpenState);

  return (
    <FullPageContainer className={classes.root}>
      <Sidebar />
      <ContentWrapper open={sidebarOpen}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </ContentWrapper>
    </FullPageContainer>
  );
};

export default MainLayout;
