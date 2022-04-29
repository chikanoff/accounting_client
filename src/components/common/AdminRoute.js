import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../atoms/auth';

const AdminRoute = ({ children, ...rest }) => {
  const currentUser = useRecoilValue(currentUserState);
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser?.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/userFiles',
              state: { from: location },
            }}
          />
        )
      }></Route>
  );
};

export default AdminRoute;
