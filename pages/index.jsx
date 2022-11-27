import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
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
      <div style={{ padding: '10px 45px' }}>
        <Button variant="contained" style={styleLoginButton} href="chat">
          Go to chat
        </Button>
        <p>Email:&nbsp;{user.email}</p>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
