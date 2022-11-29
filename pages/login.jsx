import Head from 'next/head';
import Button from '@mui/material/Button';

import withAuth from '../lib/withAuth';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>Log in</title>
      <meta name="description" content="Login page" />
      <link rel="icon" href="https://img.icons8.com/ios-glyphs/30/null/filled-chat.png" />
    </Head>
    <br />
    <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</p>
    <p>You’ll be logged in for 14 days unless you log out manually.</p>
    <br />
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      Log in with Google
    </Button>
  </div>
);

export default withAuth(Login, { logoutRequired: true });
