import styled from "@emotion/styled/macro";
import { AppBar, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "../../../../atoms/sidebar";
import FlexCentredBox from "../../FlexCentredBox";
import FlexContainer from "../../FlexContainer";
import HeaderSidebarOpenButton from "./HeaderSidebarOpenButton";

const Root = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: theme.spacing(8),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${150}px)`,
    marginLeft: `${150}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const sidebarOpen = useRecoilValue(sidebarOpenState);

  return (
    <Root open={sidebarOpen}>
      <FlexContainer fullHeight centerY>
        {!sidebarOpen && <HeaderSidebarOpenButton />}
        <FlexCentredBox fullHeight xs={{ height: "100%" }}>
          <Typography component="h1">Heading</Typography>
        </FlexCentredBox>
      </FlexContainer>
    </Root>
  );
};

export default Header;
