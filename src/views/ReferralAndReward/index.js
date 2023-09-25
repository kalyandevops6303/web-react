import React, { useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { useMatch, useNavigate } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'reactstrap';
import { ChevronDown, User } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DataTable from 'react-data-table-component';
import { NotesContainer, TableContainer } from './style';
import Statbox from '../user-details/overview/Statbox';
import DateTime from '../../lib/date-time';

const ReferralAndReward = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const allDisputesIsLoading = useSelector(allDisputesLoading);
  // const allDisputesData = useSelector(allDisputes);
  // const selectUserDetails = useSelector(selectUserData);
  // const disputesCountData = useSelector(disputesCount);

  const routesMatch = useMatch('/referral-reward/all');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/referral-reward/${props}`);
  };

  const DATA = [
    {
      _id: 1,
      email: 'nilesh.dangi@wowlabz.com',
      joinData: 1695633392000,
      status: 'ACTIVE',
      amount: 100,
      company_name: 'Wow Labz',
    },
    {
      _id: 2,
      email: 'nilesh.dangi@wowlabz.com',
      joinData: 1695633392000,
      status: 'INVITED',
      amount: 0,
      role: 'Frontend Developer',
    },
    {
      _id: 3,
      email: 'nilesh.dangi@wowlabz.com',
      joinData: 1695633392000,
      status: 'EXPIRED',
      amount: 570,
      role: 'DevOps Engineer',
    },
  ];

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
      selector: (row) => row.joinData,
    },
    {
      name: 'STATUS',
      sortable: false,
      minWidth: '25%',
      selector: (row) => row.status,
    },
    {
      name: 'AMOUNT',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.amount,
      right: true,
    },
  ];

  const receivedBidsDataset = [];
  DATA?.map((item) =>
    receivedBidsDataset.push({
      email: (
        <div className="d-flex gap-75 align-items-center">
          <Avatar img={item?.logo || defaultAvatar} imgHeight="32" imgWidth="32" />
          <div>
            <p className="mb-0 fw-bolder table-data">{item?.email}</p>
            <p className="mb-0 table-data">{item?.role ? item?.role : item?.company_name}</p>
          </div>
        </div>
      ),
      joinData: <p className="mb-0 table-data">{DateTime.fromMillis(item?.joinData).toFormat('MM/dd/yyyy')}</p>,
      status: <p className="mb-0 table-data">{showStatusBadge(item?.status)}</p>,
      amount: <p className="mb-0 table-data">{item?.amount} $</p>,
    }),
  );

  return (
    <>
      <BreadCrumbs data={[{ title: 'Dashboard' }, { title: 'Rewards', link: '#' }]} />
      <div className="d-flex justify-content-between align-items-start">
        <Row className="primary-row w-50">
          <Col sm="12" md="6" lg="5" onClick={() => handlePrimaryChangeFilter('all')}>
            <Statbox
              isMarketPlaceTab
              isActive={primaryFilter === 'all'}
              title={14}
              desc="Referral Rewards"
              icon={<User size={40} />}
              color="light-info"
              className="stat-box cursor-pointer"
            />
          </Col>
        </Row>
        <Button color="primary">Refer Now</Button>
      </div>
      <NotesContainer className="p-2">
        <p className="notes-heading">Note:</p>
        <ul className="m-0">
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
        </ul>
      </NotesContainer>

      <TableContainer className="mt-3">
        <DataTable
          noHeader
          pagination={false}
          columns={tableColumns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          data={receivedBidsDataset}
          classNamePrefix="react-dataTable"
        />
      </TableContainer>
    </>
  );
};

export default ReferralAndReward;
