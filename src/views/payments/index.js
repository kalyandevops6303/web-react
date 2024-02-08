/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React from 'react';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import DataTable from 'react-data-table-component';
import { Badge, CardBody, CardText, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { Calendar, CheckSquare, Info } from 'react-feather';
import Avatar from '@components/avatar';
// eslint-disable-next-line no-unused-vars
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import { StatboxWrap } from '../user-details/overview/style';
import { userTypes } from '../../utility/constants/Constant';
import { selectUserData } from '../../redux/selectors/authSelectors';
import theme from '../../configs/themeVariables';
import { TableContainer } from './style';

const paymentHistoryData = {
  data: [
    {
      transaction_id: 5392,
      transaction_date: 1707371187000,
      project_name: 'Project Name Project Name Project Name Project Name Project Name Project Name ',
      milestone_seq: 1,
      client_image:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/651e7b259daa42acbebc1f3d/b5272eb2-d93d-48be-95db-b4e62cc22276.jpg',
      client_name: 'John Doe',
      team_name: 'Dopers',
      team_logo:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/f5c246e2-bdbb-4008-b3e8-cfe2fd8b237d.png',
      status: 'PAID',
      cost: 10089,
      from: 'Trumio',
      talent_name: 'Pro Player',
      talent_image:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/d840b389-66ff-4d57-a2ec-351737a167f3.png',
      pay_type: 'Credit',
    },
    {
      transaction_id: 5398,
      transaction_date: 1607341187000,
      project_name: 'Project Name',
      milestone_seq: 1,
      client_image:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/f5c246e2-bdbb-4008-b3e8-cfe2fd8b237d.png',
      client_name: 'John Doe',
      team_name: 'Team Bulb Team Bulb Team Bulb Team Bulb',
      team_logo:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/651e7b259daa42acbebc1f3d/b5272eb2-d93d-48be-95db-b4e62cc22276.jpg',
      team_members: [
        {
          name: 'abc',
          image:
            'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/d840b389-66ff-4d57-a2ec-351737a167f3.png',
          id: 1,
        },
        {
          name: 'def',
          image: '',
          id: 2,
        },
        {
          name: 'ghi',
          image:
            'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/651e7b259daa42acbebc1f3d/b5272eb2-d93d-48be-95db-b4e62cc22276.jpg',
          id: 3,
        },
        {
          name: 'jkl',
          image:
            'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/f5c246e2-bdbb-4008-b3e8-cfe2fd8b237d.png',
          id: 4,
        },
        { name: 'mno', image: '', id: 5 },
      ],
      status: 'PROCESSING',
      cost: 10089,
      from: 'Me',
      pay_type: 'Debit',
    },
    {
      transaction_id: 5392,
      transaction_date: 1708371187000,
      project_name: 'Project Name',
      milestone_seq: 1,
      client_image:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/d840b389-66ff-4d57-a2ec-351737a167f3.png',
      client_name: 'John Doe John Doe John Doe',
      team_name: '',
      talent_name: 'Pro Player',
      talent_image:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/651e7b259daa42acbebc1f3d/b5272eb2-d93d-48be-95db-b4e62cc22276.jpg',
      status: 'PAYMENT FAILED',
      cost: 10089,
      from: 'Trumio',
      pay_type: 'Credit',
    },
  ],
};

const Payments = () => {
  const userData = useSelector(selectUserData);

  const earningsTooltipText = () => {
    if (userData?.user_type === userTypes.client) {
      return 'Total of all your completed payments. This includes funds + platform fee.';
    } else if (userData?.user_type === userTypes.talent) {
      return 'Your total earnings till date.';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.team) {
      return 'Your total earnings in this team till date.';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.club) {
      return 'Your total earnings in this club till date.';
    }
  };

  const upcomingPaymentTooltipText = () => {
    if (userData?.user_type === userTypes.client) {
      return 'Total of funds + platform fee for upcoming projects and milestones.';
    } else if (userData?.user_type === userTypes.talent) {
      return 'Your total upcoming payments for funded projects and milestones';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.team) {
      return 'Your total upcoming payments for funded projects and milestones with this team';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.club) {
      return 'Your total upcoming payments for funded projects and milestones with this club.';
    }
  };

  const showStatusBadge = (status) => {
    if (status === 'PAID') {
      return (
        <Badge pill color="light-success">
          Paid
        </Badge>
      );
      // eslint-disable-next-line no-else-return
    } else if (status === 'PROCESSING') {
      return (
        <Badge pill color="light-warning">
          Processing
        </Badge>
      );
    } else if (status === 'PAYMENT FAILED') {
      return (
        <Badge pill color="light-danger">
          Payment Failed
        </Badge>
      );
    }
  };

  const showTeamMembers = (members, name, logo, talentName) => {
    // eslint-disable-next-line no-unused-vars
    const teamMembers = members
      ? members?.map((member) => ({
          user_id: member?.id,
          user_type: userTypes.talent,
          title: member?.name,
          img: member?.image || defaultAvatar,
          placement: 'bottom',
          imgHeight: 28,
          imgWidth: 28,
        }))
      : [];

    return (
      <div className="d-flex align-items-center">
        {/* {teamMembers?.length > 3 ? (
          <AvatarGroup size="sm" data={teamMembers?.slice(0, 3)} />
        ) : (
          <AvatarGroup size="sm" data={teamMembers} />
        )} */}
        {(logo || name) && talentName ? (
          <>
            <Avatar img={logo || defaultAvatar} imgHeight="28" imgWidth="28" className="avatar-logo" />
            <div className="ms-75">
              <p className="mb-0 font-small-4 fw-bold name-ellipsis">{talentName}</p>
              <p className="mb-0 font-small-3 name-ellipsis">Team - {name}</p>
            </div>
          </>
        ) : (
          <>
            <Avatar img={logo || defaultAvatar} imgHeight="28" imgWidth="28" className="avatar-logo" />
            <p className="mb-0 font-small-4 fw-bold ms-75 name-ellipsis">{name}</p>
          </>
        )}
      </div>
    );
  };

  const talentTableColumns = [
    {
      name: 'Transaction ID',
      sortable: false,
      minWidth: '12%',
      selector: (row) => row.transaction_id,
    },
    {
      name: 'Project Name',
      sortable: false,
      minWidth: '23%',
      selector: (row) => row.project_name,
    },
    {
      name: 'Milestone',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.milestone_seq,
    },
    {
      name: 'Client',
      sortable: false,
      minWidth: '15%',
      selector: (row) => row.client_name,
    },
    {
      name: 'Team',
      sortable: false,
      minWidth: '20%',
      selector: (row) => row.team_name,
    },
    {
      name: 'Status',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.status,
    },
    {
      name: 'Cost',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.cost,
    },
  ];

  const clientTableColumns = [
    {
      name: 'Transaction ID',
      sortable: false,
      minWidth: '12%',
      selector: (row) => row.transaction_id,
    },
    {
      name: 'Project Name',
      sortable: false,
      minWidth: '20%',
      selector: (row) => row.project_name,
    },
    {
      name: 'Milestone',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.milestone_seq,
    },
    {
      name: 'From',
      sortable: false,
      minWidth: '8%',
      selector: (row) => row.from,
    },
    {
      name: 'To',
      sortable: false,
      minWidth: '20%',
      selector: (row) => row.team_name,
    },
    {
      name: 'Status',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.status,
    },
    {
      name: 'Pay Type',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.pay_type,
    },
    {
      name: 'Total Cost',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.cost,
    },
  ];

  const teamTableColumns = [
    {
      name: 'Transaction ID',
      sortable: false,
      minWidth: '17%',
      selector: (row) => row.transaction_id,
    },
    {
      name: 'Project Name',
      sortable: false,
      minWidth: '33%',
      selector: (row) => row.project_name,
    },
    {
      name: 'Milestone',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.milestone_seq,
    },
    {
      name: 'Client',
      sortable: false,
      minWidth: '20%',
      selector: (row) => row.client_name,
    },
    {
      name: 'Status',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.status,
    },
    {
      name: 'Cost',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.cost,
    },
  ];

  const paymentHistoryDataset = [];
  paymentHistoryData?.data?.map((item) =>
    paymentHistoryDataset.push({
      transaction_id: (
        <div>
          <p className="mb-0 fw-bolder font-small-4">#{item?.transaction_id}</p>
          <p className="mb-0 font-small-2">{DateTime.fromMillis(item?.transaction_date).toFormat('dd MMM yy')}</p>
        </div>
      ),
      project_name: <p className="mb-0 font-small-4 name-ellipsis">{item?.project_name}</p>,
      milestone_seq: <p className="mb-0 font-small-4">Milestone #{item?.milestone_seq}</p>,
      from: <p className="mb-0 font-small-4">{item?.from}</p>,
      client_name: (
        <div className="d-flex align-items-center">
          <Avatar img={item?.client_image || defaultAvatar} imgHeight="28" imgWidth="28" className="avatar-logo" />
          <p className="mb-0 font-small-4 fw-bold ms-75 name-ellipsis">{item?.client_name}</p>
        </div>
      ),
      team_name: <>{showTeamMembers(item?.team_members, item?.team_name, item?.team_logo, item?.talent_name)}</>,
      status: <>{showStatusBadge(item?.status)}</>,
      pay_type: <p className="mb-0 font-small-4">{item?.pay_type}</p>,
      cost: <p className="mb-0 font-small-4">${item?.cost}</p>,
    }),
  );

  const getTableColumns = () => {
    if (userData?.user_type === userTypes.client) {
      return clientTableColumns;
    } else if (userData?.user_type === userTypes.talent) {
      return talentTableColumns;
    } else if (userData?.user_type === userTypes.team) {
      return teamTableColumns;
    }
  };

  return (
    <>
      <BreadCrumbs data={[{ title: 'Dashboard' }, { title: 'Payments' }]} />
      <Row>
        <Col sm="12" md="4" lg="3">
          <StatboxWrap isMarketPlaceTab>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <div className="my-auto">
                  <h3 className="fw-bolder">$1000</h3>
                  <CardText className="mb-0 stat-desc">
                    {userData?.user_type === userTypes.client ? 'Released Payments' : 'Earnings'}
                    <Info size={16} color={theme.infoIcon} id="earnings" className="ms-25" />
                    <UncontrolledTooltip target="earnings">{earningsTooltipText()}</UncontrolledTooltip>
                  </CardText>
                </div>
                <Avatar color="light-green" icon={<CheckSquare size={24} />} className="stat-avatar" />
              </div>
            </CardBody>
          </StatboxWrap>
        </Col>
        <Col sm="12" md="4" lg="3">
          <StatboxWrap isMarketPlaceTab>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <div className="my-auto">
                  <h3 className="fw-bolder">$500</h3>
                  <CardText className="mb-0 stat-desc">
                    Upcoming Payment
                    <Info size={16} color={theme.infoIcon} id="upcoming" className="ms-25" />
                    <UncontrolledTooltip target="upcoming">{upcomingPaymentTooltipText()}</UncontrolledTooltip>
                  </CardText>
                </div>
                <Avatar color="light-blue" icon={<Calendar size={24} />} className="stat-avatar" />
              </div>
            </CardBody>
          </StatboxWrap>
        </Col>
      </Row>
      <p className="fw-bold font-medium-3 mt-1">Payment History</p>
      <TableContainer className="mt-3">
        <DataTable
          noHeader
          pagination={false}
          columns={getTableColumns()}
          className="react-dataTable"
          data={paymentHistoryDataset}
          classNamePrefix="react-dataTable"
        />
      </TableContainer>
    </>
  );
};

export default Payments;
