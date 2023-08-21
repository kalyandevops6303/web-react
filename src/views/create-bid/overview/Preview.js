import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardBody, CardHeader, CardText, Col, Row, Table, UncontrolledTooltip } from 'reactstrap';
import { ChevronLeft, ChevronRight, FileText, Info } from 'react-feather';
import { PreviewSectionWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import { UploadIconContainer } from '../../Onboarding/style';
import BidSubmittedModal from './BidSubmittedModal';
import { getBidDetails } from '../../../redux/actions/createBidActions';
import { bidDetails, bidDetailsLoading } from '../../../redux/selectors/createBidSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const Preview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [bidSubmittedModal, setBidSubmittedModal] = useState(null);

  const bidDetailsIsLoading = useSelector(bidDetailsLoading);
  const bidDetailsData = useSelector(bidDetails);

  const toggleBidSubmittedModal = () => {
    setBidSubmittedModal(!bidSubmittedModal);
  };

  const renderFilePreview = () => <FileText size="18" className="me-75 mb-50" />;

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
    }
  };

  const renderFormattedDate = (date) => {
    const formattedDate = date
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1 px-2">
        {bidDetailsData?.documents.map((file, index) => (
          <Row
            key={file.file_key}
            className={
              // eslint-disable-next-line no-unsafe-optional-chaining
              index !== bidDetailsData?.documents?.length - 1
                ? 'd-flex align-items-center mb-1'
                : 'd-flex align-items-center'
            }
          >
            <Col sm="6" md="6" lg="8">
              {renderFilePreview()}
              {file.file_name}
            </Col>
            <Col sm="2" md="4" lg="2">
              {renderFileSize(file.size)}
            </Col>
            <Col sm="2" md="2" lg="2" className="d-flex justify-content-end">
              {renderFormattedDate(new Date(file.created_at))}
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );

  useEffect(() => {
    dispatch(getBidDetails(params.bidId, () => {}));
  }, []);

  return (
    <PreviewSectionWrapper>
      {bidSubmittedModal && <BidSubmittedModal modal={bidSubmittedModal} toggleModal={toggleBidSubmittedModal} />}
      {bidDetailsIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <>
          <Card className="mt-2">
            <CardHeader className="py-75">
              <h4 className="m-0 mt-75">Project Bid Estimate</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value mb-25">{bidDetailsData?.total_estimated_duration?.duration}w</CardText>
                <div className="d-flex align-items-center">
                  <CardText className="key m-0">Estimated Duration</CardText>
                  <Info size={14} color={theme.infoIcon} id="duration-info" className="ms-50" />
                </div>
              </div>
              <div>
                <CardText className="value mb-25">${bidDetailsData?.total_estimated_cost}</CardText>
                <div className="d-flex align-items-center">
                  <CardText className="key m-0">Talent Cost</CardText>
                  <Info size={14} color={theme.infoIcon} id="cost-info" className="ms-50" />
                  <UncontrolledTooltip placement="right" target="cost-info">
                    <p className="m-0">The amt that adds up to is same goes to the talent cost</p>
                  </UncontrolledTooltip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="main-card-body">
              <CardText className="milestone-title font-medium-3 fw-bold mb-1">Milestones</CardText>
              <Card className="white-card-bg m-0">
                <CardBody className="p-0">
                  <Table responsive className="milestone-table">
                    <thead>
                      <tr>
                        <th>Payment For</th>
                        <th>Milestone Name</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bidDetailsData?.milestones?.map((milestone, index) => (
                        <tr key={milestone._id}>
                          <td className="fw-bolder">Milestone # {index + 1}</td>
                          <td className="fw-light">{milestone.name}</td>
                          <td className="text-end">${milestone.estimated_cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </CardBody>
          </Card>

          {bidDetailsData?.documents?.length > 0 && fileList()}

          <div className="d-flex justify-content-between align-items-center">
            <div
              className="d-flex align-items-center upload-button cursor-pointer"
              onClick={() =>
                navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/milestone`)
              }
            >
              <UploadIconContainer>
                <ChevronLeft size={18} color={theme.activeNavPillText} />
              </UploadIconContainer>
              <h5 className="fw-bold">Back</h5>
            </div>
            <Button color="primary" onClick={() => setBidSubmittedModal(true)}>
              <span className="me-50">Save & Continue</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </>
      )}
    </PreviewSectionWrapper>
  );
};

export default Preview;
