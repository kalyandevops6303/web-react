import React, { useEffect } from 'react';
import { Calendar, CheckSquare, FileMinus, Layers, UserX } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getItem } from '../../../utility/localStorageControl';
import { getCardInfo } from '../../../redux/actions/projectActions';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter }) => {
  const dispatch = useDispatch();
  const selectCardData = useSelector((state) => state.project.cardData);

  // const userData = useSelector(selectAuthUserData);
  const userData = getItem('userData');

  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {} }));
  }, []);

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter('ONGOING')}>
        <Statbox
          isActive={selected === 'ongoing'}
          isMarketPlaceTab
          title={selectCardData?.ongoing || 0}
          desc="Ongoing"
          icon={<Layers height={20} />}
          color="light-info"
          className="stat-box cursor-pointer"
        />
      </Col>
      {/* {userType === userTypes.client && ( */}
      <>
        <Col onClick={() => handlePrimaryChangeFilter('UPCOMING')}>
          <Statbox
            isActive={selected === 'upcoming'}
            isMarketPlaceTab
            title={selectCardData?.upcoming || 0}
            desc="Upcoming"
            icon={<Calendar height={20} />}
            color="light-blue"
            className="stat-box cursor-pointer"
          />
        </Col>
        <Col onClick={() => handlePrimaryChangeFilter('COMPLETED')}>
          <Statbox
            isActive={selected === 'completed'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.completed || 0}
            desc="Completed"
            icon={<CheckSquare height={20} />}
            color="light-green"
          />
        </Col>
      </>
      {/* )} */}
      {/* {userType === userTypes.talent && ( */}
      <>
        <Col onClick={() => handlePrimaryChangeFilter('TERMINATED')}>
          <Statbox
            isActive={selected === 'terminated'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.terminated || 0}
            desc="Terminated"
            icon={<FileMinus height={20} />}
            color="light-dark-red"
          />
        </Col>
        <Col onClick={() => handlePrimaryChangeFilter('DISPUTE')}>
          <Statbox
            isActive={selected === 'dispute'}
            className="stat-box cursor-pointer"
            isMarketPlaceTab
            title={selectCardData?.dispute || 0}
            desc="Dispute"
            icon={<UserX height={20} />}
            color="light-red"
          />
        </Col>
      </>
      {/* )} */}
      {/* {!isTab && (
        <>
          <Col>
            <div />
          </Col>
          <Col>
            <div />
          </Col>
        </>
      )} */}
    </Row>
  );
};

PrimaryFilter.propTypes = {
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
};
PrimaryFilter.defaultProps = {
  selected: 'all-listings',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
