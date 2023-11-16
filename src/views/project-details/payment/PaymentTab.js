import React from 'react';
import { useSelector } from 'react-redux';

import PaymentTable from './PaymentTable';
import PaymentHistoryTable from './PaymentHistoryTable';

import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

function PaymentTab() {
  const userDataLocal = useSelector(selectAuthUserData);
  return (
    <>
      <PaymentTable />
      {userDataLocal.user_type !== userTypes.team ? <PaymentHistoryTable /> : null}
    </>
  );
}

export default PaymentTab;
