/* eslint-disable react/require-default-props */
import React from 'react';
import { CardBody, CardText } from 'reactstrap';
import PropTypes from 'prop-types';
import Avatar from '@components/avatar';
import { StatboxWrap } from './style';
import { Elevate } from '../../styled';

const Statbox = ({ isActive, elevate, className, isMarketPlaceTab, title, icon, desc, color }) => (
  <StatboxWrap
    className={className}
    isActive={isActive}
    isMarketPlaceTab={isMarketPlaceTab}
    time={desc === 'Availability'}
  >
    <Elevate elevate={elevate}>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div className="my-auto">
            <h3 className={`fw-bolder ${desc === 'Availability' && 'time'}`}>{title}</h3>
            <CardText className="mb-0 stat-desc">{desc}</CardText>
          </div>
          <Avatar color={color} icon={icon} className="stat-avatar" />
        </div>
      </CardBody>
    </Elevate>
  </StatboxWrap>
);

Statbox.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isMarketPlaceTab: PropTypes.bool,
  title: PropTypes.string || PropTypes.element,
  icon: PropTypes.element,
  desc: PropTypes.string,
  color: PropTypes.string,
  elevate: PropTypes.bool,
};

export default Statbox;
