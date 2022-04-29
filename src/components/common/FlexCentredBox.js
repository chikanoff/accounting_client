import { Box } from "@mui/material";
import styled from "@emotion/styled/macro";

const FlexCentredBox = styled(Box)`
  display: flex;
  jusify-content: center;
  align-items: center;
  ${(props) => props.fullHeight && "height: 100%;"}
`;

export default FlexCentredBox;
