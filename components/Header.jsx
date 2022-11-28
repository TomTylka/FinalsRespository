import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import MenuWithAvatar from './MenuWithAvatar';

import { styleToolbar } from './SharedStyles';

const optionsMenu = [
  {
    text: 'Chat',
    href: '/chat',
  },
  {
    text: 'Home',
    href: '/index',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

const defaultProps = {
  user: null,
};

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid item sm={1} xs={3} style={{ textAlign: 'right' }}>
          {user ? (
            <div style={{ whiteSpace: ' nowrap' }}>
              {user.avatarUrl ? (
                <MenuWithAvatar options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
              ) : null}
            </div>
          ) : (
            <Link href="/login">
              <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
