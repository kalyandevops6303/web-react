import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, Input, Label, Row } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import html2pdf from 'html2pdf.js';
import { ArrowLeft } from 'react-feather';
import DownloadImg from '@src/assets/images/download.png';
import EditImg from '@src/assets/images/edit.png';
import { BackButtonContainer, BackIconContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';
import LeftSidebarProfile from '../user-details/overview/LeftSidebarProfile';
import NameInfo from '../../@core/components/name-info';
import EditContractModal from '../modals/EditContractModal';
import TerminateContractModal from '../modals/TerminateContractModal';
import { ContractDetailsWrap } from './style';
import { currentProfile, dummyText } from './overview/constants';

const ContractView = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const toggleModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleTerminateModal = () => {
    setIsTerminateModalOpen(!isTerminateModalOpen);
  };

  const downloadPdf = (element) => {
    const opt = {
      margin: 10,
      filename: 'project_name_contract.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <ContractDetailsWrap>
      <BackButtonContainer className="p-0 mb-1">
        <div onClick={() => navigate(-1)} className="p-0 d-flex">
          <BackIconContainer>
            <ArrowLeft size={18} color={theme.white} />
          </BackIconContainer>
          <h4 className="m-0 fw-light blue-text mt-25 mx-50">Sign Contract</h4>
        </div>
      </BackButtonContainer>
      <Row>
        <Col lg="3">
          <LeftSidebarProfile isInvited isClient={false} data={currentProfile} isEditable={false} />
        </Col>
        <Col lg="9">
          <Card className="gray-bg ">
            <CardTitle className="main-card-title gray-bg">Standard Contract</CardTitle>
            <CardBody>
              <Card>
                <CardBody className="contract-card-body">
                  <div className="d-flex justify-content-between ">
                    <CardTitle className="mb-1"> Contract</CardTitle>
                    <div className="d-flex gap-1 align-items-center mb-75">
                      <CardText className="terminate me-1" onClick={toggleTerminateModal}>
                        Terminate
                      </CardText>
                      {isTerminateModalOpen && (
                        <TerminateContractModal toggleModal={toggleTerminateModal} modal={isTerminateModalOpen} />
                      )}
                      <span className="icon-bg cursor-pointer" onClick={toggleModal}>
                        <img src={EditImg} alt="edit" />
                      </span>
                      {isEditModalOpen && (
                        <EditContractModal toggleModal={toggleModal} data={dummyText} modal={isEditModalOpen} />
                      )}
                      <span className="icon-bg cursor-pointer" onClick={() => downloadPdf(dummyText)}>
                        <img src={DownloadImg} alt="download" />
                      </span>
                    </div>
                  </div>
                  <div className="contract-text-container">{ReactHtmlParser(dummyText)}</div>
                </CardBody>
              </Card>
              <div className="d-flex justify-content-between checkbox-wrap">
                <Label className="checkbox-label" for="contract-sign">
                  <Input className="me-75" type="checkbox" id="contract-sign" name="agreeTerms" />I have read terms and
                  conditions
                </Label>
              </div>

              <div className="team-sign-section mt-2">
                <h6 className="fw-bolder">Client</h6>
                <div className="d-flex justify-content-between mb-1">
                  <NameInfo name="James c" info="CEO" />
                  <div>
                    <Button color="primary" className="btn-sm-block mb-75">
                      Confirm Agreement
                    </Button>
                    <CardText className="mb-1">Sign on: 10/10/2021</CardText>
                  </div>
                </div>
              </div>

              <div className="team-sign-section mt-2">
                <h6 className="fw-bolder">Team</h6>
                <div className="d-flex justify-content-between mb-1">
                  <NameInfo name="James c" info="CEO" />
                  <div>
                    <Button color="primary" className="btn-sm-block mb-75">
                      Confirm Agreement
                    </Button>
                    <CardText className="mb-1">Sign on: 10/10/2021</CardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <NameInfo name="James c" info="CEO" />
                  <div>
                    <Button color="primary" className="btn-sm-block mb-75">
                      Confirm Agreement
                    </Button>
                    <CardText className="mb-1">Sign on: 10/10/2021</CardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <NameInfo name="James c" info="CEO" />
                  <div>
                    <Button color="primary" className="btn-sm-block mb-75">
                      Confirm Agreement
                    </Button>
                    <CardText className="mb-1">Sign on: 10/10/2021</CardText>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ContractDetailsWrap>
  );
};

export default ContractView;
