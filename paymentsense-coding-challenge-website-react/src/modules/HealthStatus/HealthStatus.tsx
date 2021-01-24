import React from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { RootState } from 'redux/store';
import * as selectors from './selectors';

export const HealthStatus = (props: HealthStatusProps) => (
  <>
    <h2>... Paymentsense Coding Challenge API is
    <FontAwesomeIcon
      icon={props.isHealthy ? faThumbsUp : faThumbsDown}
      style={props.isHealthy ?  {stroke: 'green', color: 'green' } : {stroke: 'red', color: 'red' }}
      data-testid="health-status" />
    ...</h2>
  </>
);

type HealthStatusProps = {
  isHealthy: boolean;
}

const mapStateToProps = (state: RootState) => ({
  isHealthy: selectors.isHealthy(state)
});

export default connect(mapStateToProps)(HealthStatus);
