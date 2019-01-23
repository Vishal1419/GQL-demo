import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Dashboard = ({ history }) => (
  <div>
    This is Dashboard
    <button type="button" onClick={() => history.push('/natures')}>
      Natures
    </button>
  </div>
);

Dashboard.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Dashboard);
