import React from 'react';
import { DollarSign, File, ThumbsUp, Users } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';

const PrimaryFilter = ({ isTab }) => (
  <Row>
    <Col>
      <Statbox
        isActive
        isMarketPlaceTab
        title="-"
        desc="All Projects"
        icon={<DollarSign height={20} />}
        color="light-warning"
        className="stat-box"
      />
    </Col>
    <Col>
      <Statbox
        isMarketPlaceTab
        title="-"
        desc="Completed Projects"
        icon={<ThumbsUp height={20} />}
        color="light-turquoise"
        className="stat-box"
      />
    </Col>
    <Col>
      <Statbox
        className="stat-box"
        isMarketPlaceTab
        title="-"
        desc="Completed Projects"
        icon={<File height={20} />}
        color="light-blue"
      />
    </Col>
    <Col>
      <Statbox
        className="stat-box"
        isMarketPlaceTab
        title="-"
        desc="Completed Projects"
        icon={<Users height={20} />}
        color="light-purple"
      />
    </Col>
    {!isTab && (
      <Col>
        <div />
      </Col>
    )}
  </Row>
);

PrimaryFilter.propTypes = {
  isTab: PropTypes.bool,
};
PrimaryFilter.defaultProps = {
  isTab: false,
};

export default PrimaryFilter;
