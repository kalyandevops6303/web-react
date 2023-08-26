/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from 'react-feather';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import { DateTime } from 'luxon';
import PdfIcon from '@src/assets/images/pdfimg.png';
import LeftSidebarProfile from '../user-details/overview/LeftSidebarProfile';
import theme from '../../configs/themeVariables';
import { BidDetailsWrap } from './style';
import { getBidDetails, updateBidStatus } from '../../redux/actions/projectDetailsAction';
import { userTypes } from '../../utility/constants/Constant';
import { formatFileSize } from '../../utility/Utils';

const BidDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [bidStatus, setBidStatus] = useState('');
  const [isBidStatusUpating, setIsBidStatusUpating] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);

  useEffect(() => {
    dispatch(getBidDetails({ bid_id: param?.bidId }));
  }, []);

  const handleUpadteStatus = (status) => {
    setIsBidStatusUpating(true);
    dispatch(
      updateBidStatus({
        bid_id: param?.bidId,
        assign: status === 'ACCEPTED',
        onSuccess: () => {
          setIsBidStatusUpating(false);
          setBidStatus(status);
        },
        onError: () => setIsBidStatusUpating(false),
      }),
    );
  };

  return (
    <BidDetailsWrap>
      <div className="d-flex justify-content-between mb-1">
        <BreadCrumbs data={[{ title: 'Bid Details' }]} />
        {isBidStatusUpating ? (
          'Updating...'
        ) : bidStatus || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'DECLINED' ? (
          <span className="d-flex align-items-center">{`${bidStatus || bidInfo?.status}`}</span>
        ) : (
          <div className="d-flex gap-2 align-items-center">
            <CardText onClick={() => handleUpadteStatus('REJECTED')} className="report-text m-0 text-center fw-bold">
              Reject
            </CardText>
            <span>
              <Button onClick={() => handleUpadteStatus('ACCEPTED')} className="d-contents" color="primary">
                Accept
              </Button>
            </span>
          </div>
        )}
      </div>

      <Row>
        <Col lg="3">
          <LeftSidebarProfile
            isProjectDetailsView
            isTeamView={bidInfo?.user_details?.user_type === userTypes.team}
            isInvited={false}
            isTalentView={bidInfo?.user_details?.user_type === userTypes.talent}
            isClient={false}
            data={bidInfo?.user_details}
            isEditable={false}
          />
        </Col>
        <Col lg="9">
          <Card>
            <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value">${bidInfo?.total_estimated_cost}</CardText>
                <CardText className="key">Total Bid Amount</CardText>
              </div>
              <div>
                <CardText className="value">
                  {bidInfo?.total_estimated_duration?.duration}
                  {bidInfo?.total_estimated_duration?.duration_type &&
                    bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                </CardText>
                <CardText className="key">Estimation Duration</CardText>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="main-card-body">
              <CardText className="milestone-title d-block mb-1">Milestone</CardText>
              <Table responsive className="milestone-table">
                <thead>
                  <tr>
                    <th>Payment for</th>
                    <th>Milestone Tag</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bidInfo?.milestones?.map((item) => (
                    <tr key={item?._id}>
                      <td className="fw-bolder">{item?.name}</td>
                      <td>{item?.description}</td>
                      <td>${item?.estimated_cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card>
            {bidInfo?.documents?.map((item) => (
              <a
                key={item?.created_at}
                className="text-decoration-none"
                href={item?.download_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardBody className="d-flex align-items-center">
                  <img src={PdfIcon} alt="pdficon" />
                  <div className="d-flex justify-content-between w-100 ms-1 font-weight-bold">
                    <CardText className="mb-0">{item?.file_name}</CardText>
                    <div className="d-flex gap-4">
                      <CardText className="mb-0">{formatFileSize(item?.size)}</CardText>
                      <CardText className="mb-0">
                        {item?.created_at ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') : '-'}
                      </CardText>
                    </div>
                  </div>
                </CardBody>
              </a>
            ))}
          </Card>

          <div className="d-flex justify-content-between mb-1">
            <div className="back-wrap" onClick={handleBack}>
              <span className="chevron-left-bg">
                <ChevronLeft size={22} color={theme.acceptColor} />
              </span>
              <CardText className="back-text">Back</CardText>
            </div>
            {isBidStatusUpating ? (
              'Updating...'
            ) : bidStatus || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'DECLINED' ? (
              <span className="d-flex align-items-center">{`${bidStatus || bidInfo?.status}`}</span>
            ) : (
              <div className="d-flex gap-2 align-items-center">
                <CardText
                  onClick={() => handleUpadteStatus('REJECTED')}
                  className="report-text m-0 text-center fw-bold"
                >
                  Reject
                </CardText>
                <span>
                  <Button onClick={() => handleUpadteStatus('ACCEPTED')} className="d-contents" color="primary">
                    Accept
                  </Button>
                </span>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </BidDetailsWrap>
  );
};

export default BidDetails;
