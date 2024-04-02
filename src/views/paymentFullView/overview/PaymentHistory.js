/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../../lib/date-time';
import InfiniteScroll from '../../../lib/infinite-scroll';
import { userTypes } from '../../../utility/constants/Constant';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import theme from '../../../configs/themeVariables';
import { TableContainer, ExpandRowDisabled, ClientTableContainer } from '../style';
import { getPaymentHistory } from '../../../redux/actions/paymentFullViewActions';
import { paymentHistory, paymentHistoryLoading } from '../../../redux/selectors/paymentFullViewSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import capitalize from '../../../lib/capitalize';

const PaymentHistory = () => {
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const paymentHistoryData = useSelector(paymentHistory);
  const paymentHistoryIsLoading = useSelector(paymentHistoryLoading);

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
    } else if (status === 'PAYMENT_FAILED') {
      return (
        <Badge pill color="light-danger">
          Payment Failed
        </Badge>
      );
    }
  };

  const showTeamDetails = (name, logo) => (
    <div className="d-flex align-items-center">
      {name && logo ? (
        <>
          <Avatar img={logo || defaultAvatar} imgHeight="28" imgWidth="28" className="avatar-logo" />
          <p className="mb-0 font-small-4 fw-bold ms-75 name-ellipsis">{name}</p>
        </>
      ) : null}
    </div>
  );

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
      minWidth: '15%',
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
      minWidth: '15%',
      selector: (row) => row.team_name,
    },
    {
      name: 'Status',
      sortable: false,
      minWidth: '10%',
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
      minWidth: '18%',
      selector: (row) => row.project_name,
    },
    {
      name: 'Milestone',
      sortable: false,
      minWidth: '15%',
      selector: (row) => row.milestones,
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
      minWidth: '15%',
      selector: (row) => row.to,
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
      minWidth: '8%',
      selector: (row) => row.total_cost,
      right: true,
    },
    {
      name: '',
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (row.disabled ? <ExpandRowDisabled /> : null),
      minWidth: '4%',
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
      minWidth: '28%',
      selector: (row) => row.project_name,
    },
    {
      name: 'Milestone',
      sortable: false,
      minWidth: '15%',
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
      name: 'Amount',
      sortable: false,
      minWidth: '10%',
      selector: (row) => row.amount,
      right: true,
    },
  ];

  const expandableIcon = {
    collapsed: <ChevronDown size={24} color={theme.gray} className="mt-50" />,
    expanded: <ChevronUp size={24} color={theme.gray} className="mt-50" />,
  };

  const paymentHistoryDataset = [];
  paymentHistoryData?.data
    ?.map((cell) => {
      let disabled = true;
      if (cell?.from === 'Me' && cell?.to === 'Trumio') {
        disabled = false;
      }
      return { ...cell, disabled };
    })
    ?.map((item) =>
      paymentHistoryDataset.push({
        transaction_id: (
          <div>
            <p className="mb-0 fw-bolder font-small-4" id={`tooltip-${item?.transaction_id}`}>
              #{item?.transaction_id}
            </p>
            <p className="mb-0 font-small-2">{DateTime.fromMillis(item?.created_at).toFormat('dd MMM yy')}</p>
            <UncontrolledTooltip target={`tooltip-${item?.transaction_id}`} autohide={false}>
              {item?.transaction_id}
            </UncontrolledTooltip>
          </div>
        ),
        project_name: (
          <>
            <p className="mb-0 font-small-4 name-ellipsis" id={`project-${item?.transaction_id}`}>
              {item?.project_name}
            </p>
            <UncontrolledTooltip target={`project-${item?.transaction_id}`}>{item?.project_name}</UncontrolledTooltip>
          </>
        ),
        milestone_seq: <p className="mb-0 font-small-4">Milestone #{item?.milestone?.seq}</p>,
        milestones: (
          <p className="mb-0 font-small-4">
            Milestone #{item?.milestones && item?.milestones[0]?.seq}
            {item?.milestones?.length - 1 > 0 && (
              <span className="ms-50 extra-milestones px-50 fw-bolder font-small-3">
                + {item?.milestones?.length - 1}
              </span>
            )}
          </p>
        ),
        from: <p className="mb-0 font-small-4">{item?.from}</p>,
        to: (
          <div>
            {typeof item?.to === 'string' ? (
              <p className="mb-0 font-small-4">{item?.to}</p>
            ) : (
              <div className="d-flex align-items-center">
                <Avatar
                  img={item?.to?.image_uri || defaultAvatar}
                  imgHeight="28"
                  imgWidth="28"
                  className="avatar-logo"
                />
                <div>
                  <p className="mb-0 font-small-4 fw-bold ms-75 name-ellipsis">
                    {item?.to?.first_name} {item?.to?.last_name}
                  </p>
                  {item?.to?.team_name && (
                    <p className="mb-0 font-small-3 ms-75 name-ellipsis">{item?.to?.team_name}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ),
        client_name: (
          <div className="d-flex align-items-center">
            <Avatar
              img={item?.client?.image_uri || defaultAvatar}
              imgHeight="28"
              imgWidth="28"
              className="avatar-logo"
            />
            <p className="mb-0 font-small-4 fw-bold ms-75 name-ellipsis">
              {item?.client?.first_name} {item?.client?.last_name}
            </p>
          </div>
        ),
        team_name: <>{showTeamDetails(item?.team?.name, item?.team?.logo)}</>,
        status: <>{showStatusBadge(item?.status)}</>,
        pay_type: <p className="mb-0 font-small-4">{capitalize(item?.pay_type)}</p>,
        total_cost: <p className="mb-0 font-small-4">${item?.total_cost}</p>,
        amount: <p className="mb-0 font-small-4">${item?.amount}</p>,
        disabled: userData?.user_type === userTypes.client ? item?.disabled : true,
        expandedMilestonesData: item?.milestones || [],
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const ExpandedComponent = ({ data }) => {
    const milestones = data?.expandedMilestonesData;

    return (
      <div className="expanded-view">
        {milestones?.map((milestone) => (
          <div className="expanded-details d-flex" key={milestone?._id}>
            <div className="empty-container pe-2" />
            <div className="details-container ps-1 d-flex align-items-center justify-content-between py-1">
              <p className="m-0">Milestone #{milestone?.seq}</p>
              <div className="d-flex justify-content-between additional-details">
                <div>
                  <p className="mb-50">Talent Amount</p>
                  <p className="m-0">Platform Fee</p>
                </div>
                <div className="text-end">
                  <p className="mb-50">
                    ${milestone?.amount % 1 !== 0 ? milestone?.amount?.toFixed(2) : milestone?.amount?.toFixed(0)}
                  </p>
                  <p className="m-0">
                    $
                    {milestone?.platform_fee % 1 !== 0
                      ? milestone?.platform_fee?.toFixed(2)
                      : milestone?.platform_fee?.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  ExpandedComponent.propTypes = {
    data: Proptypes.object,
  };

  ExpandedComponent.defaultProps = {
    data: {},
  };

  const loadNewPaymentHistoryData = () => {
    dispatch(
      getPaymentHistory({
        // eslint-disable-next-line no-unsafe-optional-chaining
        page: paymentHistoryData?.metadata?.current_page + 1,
        pageSize: 10,
        oldData: paymentHistoryData?.data,
      }),
    );
  };

  useEffect(() => {
    dispatch(getPaymentHistory({ page: 1, pageSize: 10, oldData: [] }));
  }, []);

  return (
    <>
      <p className="fw-bold font-medium-3 mt-1">Payment History</p>
      {paymentHistoryIsLoading ? (
        <ComponentSpinner />
      ) : (
        <TableContainer className="mt-3 mb-2">
          <InfiniteScroll
            dataLength={paymentHistoryData?.data?.length || 0}
            next={loadNewPaymentHistoryData}
            hasMore={paymentHistoryData?.metadata?.has_next_page}
            loader={<div className="d-flex justify-content-center py-1">Loading...</div>}
          >
            {userData?.user_type === userTypes.client ? (
              <ClientTableContainer>
                <DataTable
                  noHeader
                  pagination={false}
                  columns={getTableColumns()}
                  className="react-dataTable"
                  data={paymentHistoryDataset}
                  classNamePrefix="react-dataTable"
                  expandableRows
                  expandableRowsComponent={ExpandedComponent}
                  expandOnRowClicked
                  expandableIcon={expandableIcon}
                  expandableRowDisabled={(row) => row.disabled}
                />
              </ClientTableContainer>
            ) : (
              <DataTable
                noHeader
                pagination={false}
                columns={getTableColumns()}
                className="react-dataTable"
                data={paymentHistoryDataset}
                classNamePrefix="react-dataTable"
              />
            )}
          </InfiniteScroll>
        </TableContainer>
      )}
    </>
  );
};

export default PaymentHistory;
