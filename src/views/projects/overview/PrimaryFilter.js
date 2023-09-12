import React, { useEffect } from 'react';
import { Calendar, CheckSquare, FileMinus, Layers, UserX } from 'react-feather';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import Statbox from '../../user-details/overview/Statbox';
import { getItem } from '../../../utility/localStorageControl';
import { getCardInfo } from '../../../redux/actions/marketPlaceActions';

const PrimaryFilter = ({ selected, handlePrimaryChangeFilter }) => {
  const dispatch = useDispatch();
  // const selectCardData = useSelector((state) => state.marketPlace.cardData);

  const userData = getItem('userData');

  useEffect(() => {
    dispatch(getCardInfo({ userType: userData?.user_type, onSuccess: () => {}, onError: () => {} }));
  }, []);

  return (
    <Row className="primary-row">
      <Col onClick={() => handlePrimaryChangeFilter('ongoing')}>
        <Statbox
          isActive={selected === 'ongoing'}
          isMarketPlaceTab
          title={0}
          desc="Ongoing"
          icon={<Layers height={22} alt="money" />}
          color="light-turquoise"
          className="stat-box cursor-pointer"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter('upcoming')}>
        <Statbox
          isActive={selected === 'upcoming'}
          isMarketPlaceTab
          title={0}
          desc="Upcoming"
          icon={<Calendar height={20} />}
          color="light-blue"
          className="stat-box cursor-pointer"
        />
      </Col>

      <Col onClick={() => handlePrimaryChangeFilter('completed')}>
        <Statbox
          isActive={selected === 'completed'}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={0}
          desc="Completed"
          icon={<CheckSquare height={20} />}
          color="light-success"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter('terminated')}>
        <Statbox
          isActive={selected === 'terminated'}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={0}
          desc="Terminated"
          icon={<FileMinus height={20} />}
          color="light-danger"
        />
      </Col>
      <Col onClick={() => handlePrimaryChangeFilter('dispute')}>
        <Statbox
          isActive={selected === 'dispute'}
          className="stat-box cursor-pointer"
          isMarketPlaceTab
          title={0}
          desc="Dispute"
          icon={<UserX height={20} />}
          color="light-danger"
        />
      </Col>
    </Row>
  );
};

PrimaryFilter.propTypes = {
  selected: PropTypes.string,
  handlePrimaryChangeFilter: PropTypes.func,
};
PrimaryFilter.defaultProps = {
  selected: 'upcoming',
  handlePrimaryChangeFilter: () => {},
};

export default PrimaryFilter;
