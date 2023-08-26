import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

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
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChevronDown, Eye, MoreVertical, Paperclip, Search } from 'react-feather';
import DataTable from 'react-data-table-component';
import Rating from 'react-rating';
import hat from '@src/assets/images/hat.png';
import Invited from '@src/assets/images/invited.png';
import Avatar from '@components/avatar';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { selectThemeColors } from '../../../utility/Utils';
import { AccordionHeadStyle } from '../style';
import theme from '../../../configs/themeVariables';
import { getReceivedBids } from '../../../redux/actions/projectDetailsAction';

const ReceivedBids = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const receivedBids = useSelector((state) => state.projectDetails.receivedBids);
  const [hasMore, setHasMore] = useState(true);
  const totalInvited = useSelector((state) => state.projectDetails.invitedMemberForProjectByClient);
  const selectReceivedBidsMetadata = useSelector((state) => state.projectDetails.receivedBidsMetaData);
  const selectReceivedBidscurrentPreview = useSelector((state) => state.dashboard.receivedBidsCurrentPreview);
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
    dispatch(getReceivedBids({ metadata, search_text: searchText, bid_status: status, project_id: param?.projectId }));
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
      name: 'NAME',
      sortable: true,
      minWidth: '28%',
      selector: (row) => row.name,
    },
    {
      name: 'RATING',
      sortable: true,
      minWidth: '16%',
      selector: (row) => row.rating,
    },
    {
      name: 'BID AMT',
      sortable: true,
      minWidth: '14%',
      selector: (row) => row.bid,
    },
    {
      name: 'ATTACHMENTS',
      sortable: true,
      minWidth: '18%',
      selector: (row) => row.attachments,
    },
    {
      name: 'STATUS',
      sortable: true,
      minWidth: '12%',
      selector: (row) => row.status,
    },

    {
      name: 'ACTION',
      sortable: true,
      minWidth: '6%',
      selector: (row) => row.action,
    },
  ];

  const handleRedirectTobidDetails = (item) => {
    navigate(`${item?._id}`);
  };

  const receivedBidsDataset = [];
  receivedBids?.map((item) =>
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
              <span className="font-weight-bold d-block table-user-name">{item?.name}</span>
              <span className="table-user-sub d-none">{item?.name}</span>
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
      status: <span>{item?.status}</span>,
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
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Reviewed', value: 'REVIEWED' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Declined', value: 'DECLINED' },
  ];
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    e.preventDefault();
  };

  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <AccordionHeadStyle>
          <span className="title-head">Received bids</span>
          <div className="d-flex gap-1 aling-items-center">
            <CardText className="d-none view-all-cta">Give rating</CardText>
            <div>
              <span className="key">Received</span>
              <CardText className="value">{selectReceivedBidsMetadata?.total_records}</CardText>
            </div>
            <div className="me-1">
              <span className="key">Invited</span>
              <CardText className="value">{totalInvited}</CardText>
            </div>
          </div>
        </AccordionHeadStyle>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <div className="accordion-body-desc">
          <CardText className="desc mb-0">
            Your proposal request has reached the best solution partners around the globe. Below are the list of
            solution partner that have submitted bid for your proposal request.
          </CardText>
          <Row className="justify-content-between w-100 mb-2">
            <Col className="d-flex align-items-end" sm="12" md="12" lg="4">
              <InputGroup className="input-group-merge">
                <InputGroupText className="ps-1 pe-50">
                  <Search size={14} color={theme.textMuted} />
                </InputGroupText>
                <Input placeholder="Search talent name" onChange={debounce(handleSearchTextChange, 300)} />
              </InputGroup>
            </Col>
            <Col sm="12" md="12" lg="3">
              <Label className="form-label">Project Status</Label>
              <Select
                options={statusOption}
                classNamePrefix="select"
                placeholder="Select type"
                theme={selectThemeColors}
                onChange={(e) => setStatus(e.value)}
              />
            </Col>
          </Row>
          <CardText className="d-none">10/500 Invited</CardText>
        </div>

        <div className="react-dataTable mt-1" style={{ maxHeight: '400px' }} id="scrollDivForReceivedBids">
          <InfiniteScroll
            dataLength={receivedBids?.length}
            next={fetchMore}
            hasMore={hasMore}
            endMessage={
              <div className="d-flex justify-content-center ">
                {receivedBids?.length > 0 ? <span className="mt-2 d-none">You have seen it all!</span> : ''}
              </div>
            }
            scrollableTarget="scrollDivForReceivedBids"
            loader={<div className="d-flex justify-content-center">Loading...</div>}
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
      </AccordionBody>
    </AccordionItem>
  );
};

export default ReceivedBids;
