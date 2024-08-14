/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import PaymentTable from './PaymentTable';
import PaymentHistoryTable from './PaymentHistoryTable';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

function PaymentTab() {
  const isStatusUpdating = useSelector((state) => state.milestonePayment.paymentStatusUpdating);
  if (isStatusUpdating) {
    return <ComponentSpinner />;
  }
  return (
    <>
      <PaymentTable />
      <PaymentHistoryTable />
    </>
  );
}

export default PaymentTab;
