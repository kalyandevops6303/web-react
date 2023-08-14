import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, Col, Row, Table, UncontrolledTooltip } from 'reactstrap';
import { ChevronLeft, ChevronRight, FileText, Info } from 'react-feather';
import { PreviewSectionWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import { UploadIconContainer } from '../../Onboarding/style';

const Preview = () => {
  const renderFilePreview = (file) => {
    if (file?.type?.startsWith('image')) {
      return <img className="rounded me-75" alt={file.name} src={URL.createObjectURL(file)} height="18" width="18" />;
      // eslint-disable-next-line
    } else {
      return <FileText size="18" className="me-75 mb-50" />;
    }
  };

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
      <Card className="p-1">
        {/* {files.map((file, index) => ( */}
        <Row
        //   key={file.file.name}
        //   className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
        >
          <Col sm="6" md="6" lg="8">
            {renderFilePreview('Project.pdf')}
            Project.pdf
          </Col>
          <Col sm="2" md="4" lg="2">
            {renderFileSize(100000)}
          </Col>
          <Col sm="2" md="2" lg="2" className="d-flex justify-content-end">
            {renderFormattedDate(new Date())}
          </Col>
        </Row>
        {/* ))} */}
      </Card>
    </div>
  );

  return (
    <PreviewSectionWrapper>
      <Card className="mt-2">
        <CardHeader className="py-75">
          <h4 className="m-0 mt-75">Project Bid Estimate</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody className="main-card-body bid-eta">
          <div>
            <CardText className="value mb-25">10w</CardText>
            <div className="d-flex align-items-center">
              <CardText className="key m-0">Estimated Duration</CardText>
              <Info size={14} color={theme.infoIcon} id="duration-info" className="ms-50" />
            </div>
          </div>
          <div>
            <CardText className="value mb-25">$3000</CardText>
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
                  <tr>
                    <td className="fw-bolder">Milestone # 1</td>
                    <td className="fw-light">First prototype design for v1.0</td>
                    <td className="text-end">$10,000</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone # 2</td>
                    <td className="fw-light">Alpha release for v1.0 modules</td>
                    <td className="text-end">$10,000</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone # 3</td>
                    <td className="fw-light">System test pass for v1.0</td>
                    <td className="text-end">$10,000</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      {fileList()}

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center upload-button cursor-pointer">
          <UploadIconContainer>
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </UploadIconContainer>
          <h5 className="fw-bold">Back</h5>
        </div>
        <Button color="primary">
          <span className="me-50">Save & Continue</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </PreviewSectionWrapper>
  );
};

export default Preview;
