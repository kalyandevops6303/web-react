import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PaymentTable from './PaymentTable';
import { milestoneTransactionsService } from '../../../services/projectMilestoneService';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

function PaymentTab() {
  const [transactions, setTransactions] = useState([]);

  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    if (projectDetailsData?._id) {
      milestoneTransactionsService(projectDetailsData._id).then((res) => {
        let payments = [];
        if (res.data.data.pay_outs) {
          payments = res.data.data.pay_outs.map((item) => item?.[Object.keys(item)?.[0]]?.[0]);
        }
        if (res.data.data.my_payments) {
          res.data.data.my_payments.forEach((item) => {
            if (item?.[Object.keys(item)?.[0]]?.[0]) {
              payments.push(item?.[Object.keys(item)?.[0]]?.[0]);
            }
          });
        }

        setTransactions(payments);
      });
    }
  }, [projectDetailsData?._id]);

  return <PaymentTable transactions={transactions} />;
}

export default PaymentTab;
