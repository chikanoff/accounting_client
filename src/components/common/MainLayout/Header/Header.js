import styled from '@emotion/styled/macro';
import { AppBar, Box, Button, Typography } from '@mui/material';
import { useMemo } from 'react';
import FlexContainer from '../../FlexContainer';

const Header = () => {
  const menuItems = useMemo(
    () => /* user.type === 'admin' ? [...] : [...] */ [1, 2, 3, 4],
    [
      /*user?.type*/
    ]
  );

  return (
    <AppBar>
      <FlexContainer fullHeight centerY>
        <MenuWrapper fullHeight xs={{ height: '100%' }}>
          <MenuItemsWrapper>
            {menuItems.map((i, index) => (
              <MenuItem key={index}>
                <Typography>{`item #${i}`}</Typography>
              </MenuItem>
            ))}
          </MenuItemsWrapper>
          <MenuActions>
            <MenuItem>
              <Typography>User Full Name</Typography>
            </MenuItem>
            <MenuItem>
              <Button variant='secondary'>Logout</Button>
            </MenuItem>
          </MenuActions>
        </MenuWrapper>
      </FlexContainer>
    </AppBar>
  );
};

const MenuWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MenuItem = styled(Box)`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemsWrapper = styled(Box)`
  display: flex;
`;

const MenuActions = styled(Box)`
  display: flex;
`;

export default Header;
