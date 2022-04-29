import styled from '@emotion/styled/macro';
import { IconButton } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material/';
import { useTheme } from '@mui/material/styles';
import { useSetRecoilState } from 'recoil';
import { sidebarOpenState } from '../../../../atoms/sidebar';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SidebarHeader = () => {
  const theme = useTheme();
  const setSidebarOpen = useSetRecoilState(sidebarOpenState);

  return (
    <Root>
      <IconButton onClick={() => setSidebarOpen(false)}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Root>
  );
};

export default SidebarHeader;
