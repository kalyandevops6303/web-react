/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';
import TopStatCards from './overview/TopStatCards';
import { clearPaymentFullViewData } from '../../redux/reducers/paymentFullView';
import PaymentHistory from './overview/PaymentHistory';

const PaymentFullView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveNavTab(''));

    return () => {
      dispatch(clearPaymentFullViewData());
    };
  }, []);

  return (
    <>
      <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Payments' }]} />

      <TopStatCards />

      <PaymentHistory />
    </>
  );
};

export default PaymentFullView;
