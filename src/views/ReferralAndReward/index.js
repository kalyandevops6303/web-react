/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'reactstrap';
import { ChevronDown, User } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DataTable from 'react-data-table-component';
import { NotesContainer, TableContainer } from './style';
import Statbox from '../user-details/overview/Statbox';
import DateTime from '../../lib/date-time';
import InfiniteScroll from '../../lib/infinite-scroll';
import ReferNowModal from './overview/ReferNowModal';
import { getAllReferrals } from '../../redux/actions/referralAndRewardActions';
import { allReferrals, allReferralsLoading } from '../../redux/selectors/referralAndRewardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { roundOfAmount } from '../../utility/Utils';

const ReferralAndReward = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allReferralsIsLoading = useSelector(allReferralsLoading);
  const allReferralsData = useSelector(allReferrals);

  const routesMatch = useMatch('/referral-reward/all');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);
  const [referNowModal, setReferNowModal] = useState(null);

  const toggleReferNowModal = () => {
    setReferNowModal(!referNowModal);
  };

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/referral-reward/${props}`);
  };

  useEffect(() => {
    if (primaryFilter === 'all') {
      dispatch(getAllReferrals(1, 10, []));
    }
  }, [primaryFilter]);

  const loadNewReferrals = () => {
    if (primaryFilter === 'all') {
      // eslint-disable-next-line no-unsafe-optional-chaining
      dispatch(getAllReferrals(allReferralsData?.metadata?.current_page + 1, 10, allReferralsData?.data));
    }
  };

  // eslint-disable-next-line consistent-return
  const showStatusBadge = (status) => {
    if (status === 'INVITED') {
      return (
        <Badge pill color="light-warning">
          Invited
        </Badge>
      );
      // eslint-disable-next-line no-else-return
    } else if (status === 'ACTIVE') {
      return (
        <Badge pill color="light-success">
          Active
        </Badge>
      );
    } else if (status === 'EXPIRED') {
      return (
        <Badge pill color="light-danger">
          Expired
        </Badge>
      );
    }
  };

  const tableColumns = [
    {
      name: 'REFERRAL NAME',
      sortable: false,
      minWidth: '40%',
      selector: (row) => row.email,
    },
    {
      name: 'JOIN DATE',
      sortable: false,
      minWidth: '25%',
      selector: (row) => row.joinDate,
    },
    {
      name: 'STATUS',
      sortable: false,
      minWidth: '25%',
      selector: (row) => row.status,
      center: true,
    },
    {
      name: 'AMOUNT',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.amount,
      right: true,
    },
  ];

  const allReferralsDataset = [];
  allReferralsData?.data?.map((item) =>
    allReferralsDataset.push({
      email: (
        <div className="d-flex gap-75 align-items-center">
          <Avatar
            img={
              item?.referral_to?.user_type === userTypes.talent
                ? item?.referral_to?.talent_details?.image_uri || defaultAvatar
                : item?.referral_to?.client_details?.image_uri || defaultAvatar
            }
            imgHeight="32"
            imgWidth="32"
          />
          <div>
            <p className="mb-0 fw-bolder table-data">{item?.referral_to?.email}</p>
            {(item?.status === 'ACTIVE' || item?.status === 'EXPIRED') && (
              <p className="mb-0 table-data">
                {item?.referral_to?.user_type === userTypes.talent
                  ? `${item?.referral_to?.talent_details?.first_name} ${item?.referral_to?.talent_details?.last_name}`
                  : `${item?.referral_to?.client_details?.first_name} ${item?.referral_to?.client_details?.last_name}`}
              </p>
            )}
          </div>
        </div>
      ),
      joinDate: (
        <p className="mb-0 table-data">
          {item?.referral_to?.joined_date > 0
            ? DateTime.fromMillis(item?.referral_to?.joined_date).toFormat('MM/dd/yyyy')
            : '-'}
        </p>
      ),
      status: <p className="mb-0 table-data">{showStatusBadge(item?.status)}</p>,
      amount: <p className="mb-0 table-data">$ {roundOfAmount(item?.amount)}</p>,
    }),
  );

  return (
    <>
      {referNowModal && <ReferNowModal modal={referNowModal} toggleModal={toggleReferNowModal} />}
      <BreadCrumbs data={[{ title: 'Dashboard' }, { title: 'Rewards', link: '#' }]} />
      <div className="d-flex justify-content-between align-items-start">
        <Row className="primary-row w-50">
          <Col sm="12" md="6" lg="5" onClick={() => handlePrimaryChangeFilter('all')}>
            <Statbox
              isMarketPlaceTab
              isActive={primaryFilter === 'all'}
              title={allReferralsData?.metadata?.total_records}
              desc="Referral Rewards"
              icon={<User size={40} />}
              color="light-info"
              className="stat-box cursor-pointer"
            />
          </Col>
        </Row>
        <Button color="primary" onClick={() => setReferNowModal(true)}>
          Refer Now
        </Button>
      </div>
      <NotesContainer className="p-2">
        <p className="notes-heading">Note:</p>
        <p>
          For Rewards rules please visit{' '}
          <a target="_blank" href="https://trumio.ai" rel="noreferrer">
            www.trumio.ai
          </a>{' '}
          and review our FAQ's.
        </p>
        {/* <ul className="m-0">
          <li className="notes-info">
            The fixed cost will be equally distributed between each talent Referral recorded to user for 180 days for
            start of transaction
          </li>
          <li className="notes-info">
            If no earnings are recorded within 180 days, the referred user becomes “unreferred”
          </li>
          <li className="notes-info">
            If transactions start within 180 days, user continues to earn rewards for 2 years
          </li>
          <li className="notes-info">
            If referred Talent and Client join the platform and earn &gt;$100 on the platform Talent earns $1 for every
            $100 of contract value
          </li>
          <li className="notes-info">
            Invite any user, get a fixed percentage after the invited user either spends or earns above $100 in the
            platform within the first 180 days for the next 2 years.
          </li>
        </ul> */}
      </NotesContainer>

      {allReferralsIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <TableContainer className="mt-3">
          <InfiniteScroll
            dataLength={allReferralsData?.data?.length || 0}
            next={loadNewReferrals}
            hasMore={allReferralsData?.metadata?.has_next_page}
          >
            <DataTable
              noHeader
              pagination={false}
              columns={tableColumns}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              data={allReferralsDataset}
              classNamePrefix="react-dataTable"
            />
          </InfiniteScroll>
        </TableContainer>
      )}
    </>
  );
};

export default ReferralAndReward;
