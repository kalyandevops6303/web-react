import React from 'react';
import { DropdownItem, UncontrolledTooltip } from 'reactstrap';
import Proptypes from 'prop-types';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import capitalize from '../../../lib/capitalize';

const DelegateProfileCard = ({ savedUserDetails, handleSwitch, userDetailsData, savedUserName }) => (
  <DropdownItem
    className="d-flex justify-content-between"
    onClick={() => handleSwitch(savedUserDetails, savedUserDetails?._id === userDetailsData?._id)}
  >
    <section className="user-info-avatar d-flex align-items-center">
      <Avatar
        img={
          savedUserDetails?.client_info?.image_uri.length > 0 ? savedUserDetails?.client_info?.image_uri : defaultAvatar
        }
        imgHeight="40"
        imgWidth="40"
      />
      <div className="user-info ms-1 ms user-nav">
        <span className="mb-50 user-name fw-bold text-start d-block" id="username">
          {savedUserName}
        </span>
        {savedUserName?.length > 15 && (
          <UncontrolledTooltip placement="right" target="username">
            <div className="d-flex flex-column align-items-start">
              <p className="text-start m-0">{savedUserName}</p>
            </div>
          </UncontrolledTooltip>
        )}
        <span className="w-100 font-small-3 d-block user-status text-start">
          {savedUserDetails?.user_type ? capitalize(savedUserDetails?.user_type) : ''}
        </span>
      </div>
    </section>
  </DropdownItem>
);

export default DelegateProfileCard;

DelegateProfileCard.propTypes = {
  savedUserDetails: Proptypes.object.isRequired,
  savedUserName: Proptypes.object.isRequired,
  userDetailsData: Proptypes.object.isRequired,
  handleSwitch: Proptypes.func.isRequired,
};
