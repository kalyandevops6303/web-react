import React from 'react';
import PropTypes from 'prop-types';
import Timeline from '../../../@core/components/timeline';

function TransactionTimeline({ transactionData }) {
  return <Timeline data={transactionData} />;
}

TransactionTimeline.propTypes = {
  transactionData: PropTypes.array,
};

TransactionTimeline.defaultProps = {
  transactionData: [],
};

export default TransactionTimeline;
