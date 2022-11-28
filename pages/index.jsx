import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Head from 'next/head';
import { styleLoginButton } from '../components/SharedStyles';

import withAuth from '../lib/withAuth';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div style={{ textAlign: 'center', margin: '0 20px' }}>
        <Head>
          <title>Click button to enter chat room</title>
          <meta name="description" content="Chatter" />
        </Head>
        <br />
        <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Chatter</p>
        <p>Welcome to Chatter!</p>
        <br />
        <Button variant="contained" style={styleLoginButton} href="/chat">
          Click here to enter the chat room
        </Button>
        <p>Email:&nbsp;{user.email}</p>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
