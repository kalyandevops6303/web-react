import React from 'react';

import PaymentTable from './PaymentTable';
import PaymentHistoryTable from './PaymentHistoryTable';

function PaymentTab() {
  return (
    <>
      <PaymentTable />
      <PaymentHistoryTable />
    </>
  );
}

export default PaymentTab;
