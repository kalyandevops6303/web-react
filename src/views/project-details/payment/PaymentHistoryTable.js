import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, CardText, Table, UncontrolledTooltip } from 'reactstrap';
import { Info } from 'react-feather';

import {
  milestoneTransactionsServiceForClient,
  milestoneTransactionsServiceForTeam,
} from '../../../services/projectMilestoneService';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

import { formatDate } from '../../../utility/Utils';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import theme from '../../../configs/themeVariables';

function PaymentHistoryTable() {
  const [transactions, setTransactions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const projectDetailsData = useSelector(projectDetails);
  const user = useSelector(userData);

  const isTalent = user?.user_type === userTypes.talent;
  const isTeam = user?.user_type === userTypes.team;

  useEffect(() => {
    if (projectDetailsData?._id) {
      if (user?.user_type === userTypes.client) {
        milestoneTransactionsServiceForClient(projectDetailsData._id).then((res) => {
          if (res.data.data) {
            setTransactions(res.data.data);
          }
        });
      } else {
        milestoneTransactionsServiceForTeam(projectDetailsData?._id).then((res) => {
          if (res.data.data) {
            setTransactions(res.data.data?.my_payments);

            // if (user?.user_type === userTypes.talent) {
            //   setTransactions(res.data.data?.my_payments);
            // } else setTransactions(res.data?.data?.team_payments);
          }
        });
      }
    }
  }, [projectDetailsData?._id]);

  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: 'Transaction Failed' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: 'Milestone In Progress' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: 'Payment Processing' };
    }
    if (tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: 'Payment Initiated' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_SUCCESSFUL || tag === PAYMENT_STATUS.PAID) {
      return { theme: 'light-success', text: 'Transaction Successful' };
    }
    return { theme: 'light-primary', text: tag };
  };

  const getTotalAmount = (payment) => {
    if (payment?.amount) {
      if (payment?.application_fee) {
        return payment.amount + payment.application_fee;
      }
      return payment.amount;
    }
    return 0;
  };

  const PAYMENT_TYPES = {
    CHECKOUT: 'CHECKOUT',
    TRANSFER: 'TRANSFER',
  };

  const handleCopyToClipboard = (text) => {
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Card className="gray-card p-0">
      <div className="p-2 pb-0">
        <CardText className="fs-4 mb-0 fw-bold">Payment History</CardText>
      </div>
      <hr />
      <div className="p-2 pt-1 w-100">
        <Table responsive className="milestone-table w-100">
          <thead>
            <tr>
              {user?.user_type === userTypes.client && <th>TRANSACTION ID</th>}
              <th>MILESTONE</th>
              <th>From</th>
              {isTalent || isTeam ? null : <th>To</th>}
              <th>Type</th>
              <th>Status</th>
              {isTalent || isTeam ? null : <th>Platform Fee</th>}
              <th>
                {isTalent || isTeam ? 'Amount' : 'Final Amount'}
                {isTalent || isTeam ? (
                  ''
                ) : (
                  <>
                    <Info size={14} color={theme.infoIcon} id="amount-info" className="ms-50" />
                    <UncontrolledTooltip placement="top" target="amount-info">
                      <p className="m-0">Final Amount = Platform Fee + Milestone Amount </p>
                    </UncontrolledTooltip>
                  </>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item) => (
              <tr key={item?._id}>
                {user?.user_type === userTypes.client ? (
                  <td>
                    <div className="d-flex flex-column">
                      {item?.transaction_id?.length > 8 && (
                        <UncontrolledTooltip placement="top" target={item?.transaction_id.replace(/^[^a-zA-Z_]/, '_')}>
                          {isCopied ? 'Copied!' : item?.transaction_id}
                        </UncontrolledTooltip>
                      )}
                      <span
                        className="fw-bold"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '80px', whiteSpace: 'nowrap' }}
                        id={item?.transaction_id.replace(/^[^a-zA-Z_]/, '_')}
                        onClick={() => handleCopyToClipboard(item?.transaction_id)}
                      >
                        {item?.transaction_id}
                      </span>
                      <span>{formatDate(item?.created_at)}</span>
                    </div>
                  </td>
                ) : null}
                <td>{item?.milestone?.name}</td>
                <td>{item?.payment_type === PAYMENT_TYPES.CHECKOUT ? 'Client' : 'Trumio'}</td>
                {isTalent || isTeam ? null : (
                  <td>
                    {item?.payment_type === PAYMENT_TYPES.CHECKOUT
                      ? 'Trumio'
                      : `${item?.payment_to?.first_name} ${item?.payment_to?.last_name}`}
                  </td>
                )}
                <td>{item?.payment_type === PAYMENT_TYPES.CHECKOUT ? 'Payment Deposited' : 'Pay Out'}</td>
                <td>
                  <Badge color={getTagSettings(item?.status).theme}>{getTagSettings(item?.status).text}</Badge>
                </td>
                {isTalent || isTeam ? null : <td>{item?.application_fee ? `$ ${item?.application_fee}` : '-'}</td>}
                <td>$ {getTotalAmount(item)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

export default PaymentHistoryTable;
