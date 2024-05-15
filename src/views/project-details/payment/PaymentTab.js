/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentTable from './PaymentTable';
import PaymentHistoryTable from './PaymentHistoryTable';
import { updatePaymentStatus } from '../../../redux/actions/milestonePaymentActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { CHECKOUT_STATUS } from '../../../utility/constants/Constant';

function PaymentTab() {
  // Get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);

  // Extract the checkout status
  const checkoutStatus = queryParams.get('checkout_status');
  const sessionId = queryParams.get('session_id');

  const dispatch = useDispatch();
  const isStatusUpdating = useSelector((state) => state.milestonePayment.paymentStatusUpdating);

  useEffect(() => {
    if (checkoutStatus === CHECKOUT_STATUS.CANCELLED) {
      dispatch(updatePaymentStatus({ session_id: sessionId }));
    }
  }, [checkoutStatus]);

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
