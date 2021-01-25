import React from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { RootState } from 'redux/store';
import * as selectors from './selectors';
import { actionBuilder } from './module';

export const HealthStatus = ({ isHealthy, checkHealthStatus }: HealthStatusProps) => {
  React.useEffect(() => {
    checkHealthStatus();
  }, [checkHealthStatus]);

  return (
    <>
      <h2>... Paymentsense Coding Challenge API is
      <FontAwesomeIcon
        icon={isHealthy ? faThumbsUp : faThumbsDown}
        style={isHealthy ?  {stroke: 'green', color: 'green' } : {stroke: 'red', color: 'red' }}
        data-testid="health-status" />
      ...</h2>
    </>
  );
}

type HealthStatusProps = {
  isHealthy: boolean;
  checkHealthStatus: () => void;
}

const mapStateToProps = (state: RootState) => ({
  isHealthy: selectors.isHealthy(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  checkHealthStatus: () => dispatch(actionBuilder.requestHealthStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(HealthStatus);
