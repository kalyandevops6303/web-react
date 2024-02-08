/* eslint-disable no-undef */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  CardText,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { useNavigate, useParams, useLocation } from 'react-router';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { ChevronDown, Eye, Info, MoreVertical, Paperclip, Search } from 'react-feather';
import DataTable from 'react-data-table-component';
import Rating from 'react-rating';
import hat from '@src/assets/images/hat.png';
import Invited from '@src/assets/images/invited.png';
import Avatar from '@components/avatar';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { selectThemeColors } from '../../../utility/Utils';
import { AccordionHeadStyle, UserNameWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import { getReceivedBids } from '../../../redux/actions/projectDetailsAction';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { CustomBadge } from '../../styled';

const TableWrapper = styled.div`
  .rdt_TableHeadRow {
    &:first-child > div:first-child > div:first-child {
      margin-left: 4rem;
    }
  }
`;

const ReceivedBids = ({ projectName }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedBids = useSelector((state) => state.projectDetails.receivedBids);
  const [hasMore, setHasMore] = useState(true);
  const totalInvited = useSelector((state) => state.projectDetails.invitedMemberForProjectByClient);
  const selectReceivedBidsMetadata = useSelector((state) => state.projectDetails.receivedBidsMetaData);
  const selectReceivedBidscurrentPreview = useSelector((state) => state.projectDetails.receivedBidsPreview);
  const isLoading = useSelector((state) => state.projectDetails.getReceivedBidsLoading);
  const metadata = { page: 1, page_size: 10 };
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setHasMore(true);
    if (
      selectReceivedBidscurrentPreview?.length === 0 ||
      receivedBids?.length === selectReceivedBidsMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [selectReceivedBidscurrentPreview]);

  useEffect(() => {
    dispatch(
      getReceivedBids({ metadata, search_text: searchText, bid_status: status?.value, project_id: param?.projectId }),
    );
  }, [searchText, status]);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectReceivedBidsMetadata?.current_page + 1 || 1,
    };
    dispatch(
      getReceivedBids({
        metadata: newMeteData,
        search_text: searchText,
        bid_status: status,
        project_id: param?.projectId,
      }),
    );
  };

  const tableColumns = [
    {
      name: 'TEAM/TALENT NAME',
      sortable: false,
      minWidth: '27%',
      selector: (row) => row.name,
    },
    {
      name: 'RATING',
      sortable: false,
      minWidth: '17%',
      selector: (row) => row.rating,
    },
    {
      name: (
        <div className="d-flex align-items-center">
          <p className="m-0">COST</p>
          <Info size={14} color={theme.infoIcon} id="cost-info" className="ms-25" />
          <UncontrolledTooltip target="cost-info">
            This is a sum of the talent bid and the Trumio platform fee.
          </UncontrolledTooltip>
        </div>
      ),
      sortable: false,
      minWidth: '13%',
      selector: (row) => row.bid,
    },
    {
      name: 'ATTACHMENTS',
      sortable: false,
      minWidth: '18%',
      selector: (row) => row.attachments,
    },
    {
      name: 'STATUS',
      sortable: false,
      minWidth: '12%',
      selector: (row) => (row.status === 'REJECTED' ? 'REJECTED' : row.status),
    },

    {
      name: 'ACTION',
      sortable: false,
      minWidth: '6%',
      selector: (row) => row.action,
    },
  ];

  const handleRedirectTobidDetails = (item) => {
    const state = {
      projectName,
      link: location?.pathname,
    };
    navigate(`${item?._id}?project_name=${projectName}`, { state });
  };

  const receivedBidsDataset = [];
  receivedBids?.map((item, index) =>
    receivedBidsDataset.push({
      name: (
        <div className="d-flex gap-50 align-items-center">
          <Badge className={`almamator-badge ${!item?.is_alma_mater ? 'invisible' : ''}`}>
            <img src={hat} alt="user-badge" />
          </Badge>
          <Badge className={`invited-badge ${!item?.is_invited ? 'invisible' : ''}`}>
            <img src={Invited} alt="user-badge" />
          </Badge>

          <div className="d-flex gap-1 align-items-center">
            <Avatar img={item?.logo || defaultAvatar} imgHeight="32" imgWidth="32" />
            <div>
              {item?.name.length > 5 ? (
                <>
                  <UncontrolledTooltip target={`tooltip-${index}`}>{item?.name}</UncontrolledTooltip>
                  <UserNameWrapper>
                    <span className="font-weight-bold d-block table-user-name" id={`tooltip-${index}`}>
                      {item?.name}
                    </span>
                    <span className="table-user-sub d-none">{item?.name}</span>
                  </UserNameWrapper>
                </>
              ) : (
                <UserNameWrapper>
                  <span className="font-weight-bold d-block table-user-name" id={`tooltip-${index}`}>
                    {item?.name}
                  </span>
                  <span className="table-user-sub d-none">{item?.name}</span>
                </UserNameWrapper>
              )}
            </div>
          </div>
        </div>
      ),
      rating: (
        <>
          <Rating
            className="mb-25"
            initialRating={0}
            emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
            fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
            readonly
          />
          <div className="table-user-sub">0 Projects</div>
        </>
      ),
      bid: `$${item?.total_estimated_cost}`,
      attachments: (
        <div>
          <Paperclip size={18} color={theme.bodyColor} /> <span>{item?.documents_count}</span>
        </div>
      ),
      status: (
        <CustomBadge>
          <Badge className={`${item?.status} truncate-1`} color="badge">
            {item.status}
          </Badge>
        </CustomBadge>
      ),
      action: (
        <div className="d-flex gap-1">
          <Eye
            className="cursor-pointer"
            onClick={() => handleRedirectTobidDetails(item)}
            size={22}
            color={theme.bodyColor}
          />
          <MoreVertical className="d-none" size={18} color={theme.bodyColor} />
        </div>
      ),
    }),
  );

  const statusOption = [
    { label: 'New', value: 'NEW' },
    { label: 'Reviewed', value: 'REVIEWED' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    e.preventDefault();
  };

  const handleDropdown = (value) => {
    setStatus(value);
  };

  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">Received Bids</span>
          <div className="d-flex gap-1 aling-items-center">
            <CardText className="d-none view-all-cta">Give rating</CardText>
            <div>
              <span className="key">Received</span>
              <CardText className="value text-end">{selectReceivedBidsMetadata?.total_records}</CardText>
            </div>
            <div className="me-1">
              <span className="key">Invited</span>
              <CardText className="value text-end">{totalInvited}</CardText>
            </div>
          </div>
        </AccordionHeadStyle>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <div className="accordion-body-desc">
          <CardText className="desc mb-0">Please review the bids received for your project</CardText>
          <Row className="justify-content-between w-100 mb-2">
            <Col className="d-flex align-items-end" sm="12" md="12" lg="5">
              <InputGroup className="input-group-merge">
                <InputGroupText className="ps-1 pe-50">
                  <Search size={14} color={theme.textMuted} />
                </InputGroupText>
                <Input placeholder="Search team or talent name" onChange={debounce(handleSearchTextChange, 300)} />
              </InputGroup>
            </Col>
            <Col sm="12" md="12" lg="3">
              <Label className="form-label">Bid Status</Label>
              <Select
                isClearable
                value={status}
                options={statusOption}
                classNamePrefix="select"
                placeholder="Select bid status"
                theme={selectThemeColors}
                onChange={handleDropdown}
              />
            </Col>
          </Row>
          <CardText className="d-none">10/500 Invited</CardText>
        </div>

        {isLoading ? (
          <ComponentSpinner />
        ) : (
          <TableWrapper>
            <div
              className="react-dataTable mt-1"
              style={{ overflowY: 'auto', maxHeight: '400px' }}
              id="scrollDivForReceivedBids"
            >
              <InfiniteScroll
                dataLength={receivedBids?.length}
                next={fetchMore}
                hasMore={hasMore}
                scrollableTarget="scrollDivForReceivedBids"
              >
                <DataTable
                  noHeader
                  pagination={false}
                  columns={tableColumns}
                  paginationPerPage={7}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                  data={receivedBidsDataset}
                  classNamePrefix="react-dataTable"
                />
              </InfiniteScroll>
            </div>
          </TableWrapper>
        )}
      </AccordionBody>
    </AccordionItem>
  );
};

ReceivedBids.propTypes = {
  projectName: PropTypes.string,
};
ReceivedBids.defaultProps = {
  projectName: '',
};

export default memo(ReceivedBids);
