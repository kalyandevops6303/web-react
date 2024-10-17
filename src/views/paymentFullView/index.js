/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';
import TopStatCards from './overview/TopStatCards';
import { clearPaymentFullViewData } from '../../redux/reducers/paymentFullView';
import PaymentHistory from './overview/PaymentHistory';
import { appPermissionsSelector } from '@/redux/selectors/authSelectors';
import PermissionWrapper from '@/PermissionWrapper';

const PaymentFullView = () => {
  const dispatch = useDispatch();

  const appPermissions = useSelector(appPermissionsSelector);

  useEffect(() => {
    dispatch(setActiveNavTab(''));

    return () => {
      dispatch(clearPaymentFullViewData());
    };
  }, []);

  return (
   <div className='trumio'>
      <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.PAYMENT_METRICS']}>
        <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Payments' }]} />

        <TopStatCards />

        <PaymentHistory />
      </PermissionWrapper>
    </div>
  );
};

export default PaymentFullView;
