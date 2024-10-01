/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Proptypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Badge, Col, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronDown, ChevronUp, Copy, RefreshCcw } from 'react-feather';
import Avatar from '@components/avatar';
import classNames from 'classnames';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import '../../custom-styles.scss';
import DateTime from '../../../lib/date-time';
import CopyToClipboard from '../../../lib/copy-clipboard';
import InfiniteScroll from '../../../lib/infinite-scroll';
import { PaymentStatusOptions, PayTypeOptions, userTypes } from '../../../utility/constants/Constant';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import theme from '../../../configs/themeVariables';
import { TableContainer, ExpandRowDisabled, ClientTableContainer } from '../style';
import { getPaymentHistory } from '../../../redux/actions/paymentFullViewActions';
import { paymentHistory, paymentHistoryLoading } from '../../../redux/selectors/paymentFullViewSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import capitalize from '../../../lib/capitalize';
import { setItem } from '../../../utility/localStorageControl';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import ShowToastMessage from '../../../@core/components/toast';
import { SUCCESS } from '../../../utility/constants/ToastTypes';
import { roundOfAmount, selectThemeColors } from '../../../utility/Utils';

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(selectUserData);
  const paymentHistoryData = useSelector(paymentHistory);
  const paymentHistoryIsLoading = useSelector(paymentHistoryLoading);

  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const [switchData, setSwitchData] = useState();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

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
    } else if (status === 'FAILED') {
      return (
        <Badge pill color="light-danger">
          Failed
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
      minWidth: '15%',
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
      selector: (row) => row?.status,
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
      minWidth: '15%',
      selector: (row) => row.transaction_id,
    },
    {
      name: 'Project Name',
      sortable: false,
      minWidth: '15%',
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
      selector: (row) => row?.status,
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
      selector: (row) => row?.status,
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
            {item?.transaction_id && (
              <CopyToClipboard
                text={item?.transaction_id}
                onCopy={() => {
                  ShowToastMessage(SUCCESS, 'Transaction Id copied to clipboard');
                }}
              >
                <div
                  className="d-flex align-items-center cursor-pointer"
                  onMouseEnter={() => setSelectedTransactionId(item?.transaction_id)}
                  onMouseLeave={() => setSelectedTransactionId(null)}
                  id={`tooltip-${item?.transaction_id}`}
                >
                  <p className="mb-0 fw-bolder font-small-4">#{item?.transaction_id?.substring(0, 10)}...</p>
                  <Copy
                    size={20}
                    color={selectedTransactionId === item?.transaction_id ? theme.activeNavPillText : theme.infoIcon}
                    className="ms-50"
                  />
                  <UncontrolledTooltip target={`tooltip-${item?.transaction_id}`} autohide={false}>
                    {item?.transaction_id}
                  </UncontrolledTooltip>
                </div>
              </CopyToClipboard>
            )}
            <p className="mb-0 font-small-2">{DateTime.fromMillis(item?.created_at).toFormat('dd MMM yy')}</p>
          </div>
        ),
        project_name: (
          <>
            <p
              className="mb-0 font-small-4 name-ellipsis cursor-pointer"
              id={`project-${item?.transaction_id}`}
              onClick={() => {
                setItem('baseRoute', 'payments');
                if (userData?.user_type === userTypes.talent && '_id' in item?.team) {
                  setSwitchData({
                    entity: 'TEAM',
                    navigateTo: `/project-details/${item?.project_id}/payment`,
                    switchTeamId: item?.team?._id,
                  });
                  setSwitchProfileModal(true);
                } else {
                  navigate(`/project-details/${item?.project_id}/payment`);
                }
              }}
            >
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
              <div
                className="d-flex align-items-center cursor-pointer"
                onClick={() => {
                  setItem('baseRoute', 'payments');
                  navigate(`/profile/talent/${item?.to?.user_id}`);
                }}
              >
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
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => {
              setItem('baseRoute', 'payments');
              navigate(`/profile/client/${item?.client?.user_id}`);
            }}
          >
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
        team_name: (
          <p
            className="mb-0 cursor-pointer"
            onClick={() => {
              setItem('baseRoute', 'payments');
              navigate(`/profile/team/${item?.team?._id}`);
            }}
          >
            {showTeamDetails(item?.team?.name, item?.team?.logo)}
          </p>
        ),
        status: <>{showStatusBadge(item?.status)}</>,
        pay_type: <p className="mb-0 font-small-4">{capitalize(item?.pay_type)}</p>,
        total_cost: <p className="mb-0 font-small-4">${item?.total_cost}</p>,
        amount: <p className="mb-0 font-small-4">${roundOfAmount(item?.amount)}</p>,
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
                  <p className="mb-50">${roundOfAmount(milestone?.amount)} </p>
                  <p className="m-0">${roundOfAmount(milestone?.platform_fee)}</p>
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

  const PaymentHistorySearchSchema = yup.object().shape({
    paymentDate: yup.date().nullable(),
    projectName: yup.string().nullable(),
    paymentStatus: yup.string().nullable(),
    payType: yup.string().nullable(),
  });

  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PaymentHistorySearchSchema),
    defaultValues: {
      paymentDate: null,
      projectName: '',
      paymentStatus: null,
      payType: null,
    },
  });

  useEffect(() => {
    const dateObject = new Date(watch('paymentDate'));
    const timestamp = dateObject.getTime();
    const filters = {
      payment_date: timestamp || null,
      project_name: watch('projectName'),
      payment_status: watch('paymentStatus')?.value,
      payment_type: watch('payType')?.value,
    };
    const debounceTimeout = 500;
    const handler = setTimeout(() => {
      dispatch(getPaymentHistory({ page: 1, pageSize: 10, oldData: [], filters }));
    }, debounceTimeout);
    return () => {
      clearTimeout(handler);
    };
  }, [watch('paymentDate'), watch('projectName'), watch('paymentStatus'), watch('payType')]);

  const handleReset = () => {
    reset();
  };

  return (
    <>
      {switchProfileModal && (
        <SwitchConfirmModal
          entity={switchData?.entity}
          navigateTo={switchData?.navigateTo}
          switchTeamId={switchData?.switchTeamId}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
        />
      )}
      <Row className="d-flex w-100 justify-content-between align-items-center">
        <Col sm="12" md="12" lg="4" className="ps-50 mt-1">
          <p className="fw-bold font-medium-3 mt-1">Payment History</p>
        </Col>

        <Col>
          <Row className="d-flex justify-content-center flex-wrap align-items-center">
            <Col sm="12" md="12" lg="3" className="ps-50">
              <Label className="form-label">Filter By Date</Label>
              <Controller
                control={control}
                id="paymentDate"
                name="paymentDate"
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    placeholder="Select Payment Date"
                    options={{
                      dateFormat: 'M d, Y',
                    }}
                    className={classNames('form-control', {
                      'is-invalid': errors && errors.paymentDate,
                    })}
                  />
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="3">
              <Label className="form-label" for="projectName">
                Project Name
              </Label>
              <Controller
                id="projectName"
                name="projectName"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Enter project name" invalid={errors.projectName && true} />
                )}
              />
            </Col>

            <Col sm="12" md="12" lg="2">
              <Label className="form-label">Status</Label>
              <Controller
                id="paymentStatus"
                name="paymentStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    options={PaymentStatusOptions}
                    classNamePrefix="select"
                    placeholder="Select status"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                  />
                )}
              />
            </Col>

            {userData?.user_type === userTypes?.client && (
              <Col sm="12" md="12" lg="2">
                <Label className="form-label">Pay Type</Label>
                <Controller
                  id="payType"
                  name="payType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      options={PayTypeOptions}
                      classNamePrefix="select"
                      placeholder="Select pay type"
                      theme={selectThemeColors}
                      className={classNames('react-select')}
                    />
                  )}
                />
              </Col>
            )}
            <Col
              sm="12"
              md="12"
              lg="2"
              className="reset-btn d-flex gap-1 pt-50 mt-2 cursor-pointer"
              onClick={handleReset}
            >
              <div className="reset-icon">
                <RefreshCcw size={18} color={theme.activeNavPillText} />
              </div>
              <span className="reset-label">Reset</span>
            </Col>
          </Row>
        </Col>
      </Row>

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
