/* eslint-disable react/require-default-props */
import React from 'react';
import { CardBody, CardText } from 'reactstrap';
// import PropTypes from 'prop-types';
// import Avatar from '@components/avatar';
import { StatboxWrap } from '@/views/user-details/overview/style';
import { Elevate } from '@/views/styled';

interface StatboxProps {
  onClick?: () => void;
  isActive?: boolean;
  elevate?: boolean;
  className?: string;
  title: string | React.ReactNode;
  desc?: string;
}

const Statbox: React.FC<StatboxProps> = ({ onClick, isActive, title, desc }) => (
  <StatboxWrap
    onClick={onClick}
    // className={className}
    isActive={isActive}
    // time={desc === 'Availability'}
    // iconAbsent={iconAbsent ? true : false}
  >
    <Elevate>
      <CardBody className="flex flex-col items-start flex-shrink-0 px-5 py-4 gap-3">
        {/* <div className="d-flex align-items-center justify-content-between"> */}
        <div className="my-auto">
          <h3 className="text-[26px] font-semibold">{title}</h3>
          <CardText className="mb-0 stat-desc">{desc}</CardText>
          {/* </div> */}
          {/* {!iconAbsent && <Avatar color={color} icon={icon} className="stat-avatar" />} */}
        </div>
      </CardBody>
    </Elevate>
  </StatboxWrap>
);

// Statbox.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string,
//   isActive: PropTypes.bool,
//   isMarketPlaceTab: PropTypes.bool,
//   title: PropTypes.string || PropTypes.element,
//   icon: PropTypes.element,
//   desc: PropTypes.string,
//   color: PropTypes.string,
//   elevate: PropTypes.bool,
// };

export default Statbox;
