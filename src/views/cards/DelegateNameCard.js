import React from 'react';
import { DropdownItem, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '../../@core/components/avatar';
import theme from '../../configs/themeVariables';

const DelegateNameCard = ({ img, companyName, userName, icon, userType }) => (
  <DropdownItem
    className="d-flex justify-content-between align-items-center p-50 my-50"
    style={icon ? { backgroundColor: `${theme.lightOrangeColor}` } : {}}
  >
    <section className="user-info-avatar px-25 d-flex align-items-center">
      <Avatar img={img || defaultAvatar} imgHeight="40" imgWidth="40" />
      <div className="user-info ms-1 ms user-nav">
        <span className="user-name fw-bold text-start d-block" id="username">
          {userName}
        </span>
        {userName?.length > 15 && (
          <UncontrolledTooltip placement="right" target="username">
            <div className="d-flex flex-column align-items-start">
              <p className="text-start m-0">{userName}</p>
            </div>
          </UncontrolledTooltip>
        )}
        {companyName && (
          <span className="w-100 font-small-3 d-block user-status text-start">{capitalize(companyName)}</span>
        )}
        {userType && (
          <span className="w-100 mt-25 font-small-3 d-block user-status text-start">{capitalize(userType)}</span>
        )}
      </div>
    </section>
    <div className="d-flex align-items-center">{icon && <img src={icon} alt="icon" />}</div>
  </DropdownItem>
);

DelegateNameCard.propTypes = {
  img: PropTypes.string,
  companyName: PropTypes.string,
  userName: PropTypes.string,
  userType: PropTypes.string,
  icon: PropTypes.elementType,
};

DelegateNameCard.defaultProps = {
  img: '',
  companyName: '',
  userName: '',
  userType: '',
  icon: null,
};

export default DelegateNameCard;
