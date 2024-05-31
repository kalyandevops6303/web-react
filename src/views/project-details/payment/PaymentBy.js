import React from 'react';
import PropTypes from 'prop-types';

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { PAYMENT_TYPES } from '../../../utility/constants/Constant';

function PaymentBy({ paymentBy = [] }) {
  return (
    <div className="d-flex flex-column" style={{ gap: '50px' }}>
      {paymentBy?.map((item) => {
        if (item?.payment_type === PAYMENT_TYPES.TRANSFER) {
          return (
            <div className="d-flex align-items-center" key={Math.random()}>
              <Avatar
                img={item?.payment_to?.image_uri?.length > 0 ? item?.payment_to?.image_uri : defaultAvatar}
                imgHeight="35"
                imgWidth="35"
                className="me-1"
              />
              <span>{`${item?.payment_to?.first_name} ${item?.payment_to?.last_name}`}</span>
            </div>
          );
        }
        return (
          <span key={Math.random()} style={{ marginBottom: '10px' }}>
            {item?.payment_type === PAYMENT_TYPES.CHECKOUT ? 'By Client' : 'Stripe'}
          </span>
        );
      })}
    </div>
  );
}

PaymentBy.propTypes = {
  paymentBy: PropTypes.array,
};

PaymentBy.defaultProps = {
  paymentBy: [],
};

export default PaymentBy;
