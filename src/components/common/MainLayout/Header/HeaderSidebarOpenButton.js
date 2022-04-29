import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar } from '@mui/material';
import { useRecoilState } from 'recoil';
import { sidebarOpenState } from '../../../../atoms/sidebar';

const HeaderSidebarOpenButton = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setSidebarOpen(true)}
        edge="start"
        sx={{ mr: 2, ...(sidebarOpen && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
};

export default HeaderSidebarOpenButton;
