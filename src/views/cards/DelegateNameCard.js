import React from 'react';
import { DropdownItem, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '../../@core/components/avatar';

const DelegateNameCard = ({ img, userType, userName }) => (
  <DropdownItem className="d-flex justify-content-between">
    <section className="user-info-avatar d-flex align-items-center">
      <Avatar img={img || defaultAvatar} imgHeight="40" imgWidth="40" />
      <div className="user-info ms-1 ms user-nav">
        <span className="mb-50 user-name fw-bold text-start d-block" id="username">
          {userName}
        </span>
        {userName?.length > 15 && (
          <UncontrolledTooltip placement="right" target="username">
            <div className="d-flex flex-column align-items-start">
              <p className="text-start m-0">{userName}</p>
            </div>
          </UncontrolledTooltip>
        )}
        <span className="w-100 font-small-3 d-block user-status text-start">{capitalize(userType)}</span>
      </div>
    </section>
  </DropdownItem>
);

DelegateNameCard.propTypes = {
  img: PropTypes.string,
  userType: PropTypes.string,
  userName: PropTypes.string,
};

DelegateNameCard.defaultProps = {
  img: '',
  userType: '',
  userName: '',
};

export default DelegateNameCard;
