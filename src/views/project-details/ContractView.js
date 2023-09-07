import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, FormFeedback, Input, Label, Row } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import html2pdf from 'html2pdf.js';
import { ArrowLeft } from 'react-feather';
import DownloadImg from '@src/assets/images/download.png';
import EditImg from '@src/assets/images/edit.png';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { BackButtonContainer, BackIconContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';
import LeftSidebarProfile from './overview/LeftSidebarProjectDetails';
import NameInfo from '../../@core/components/name-info';
import EditContractModal from '../modals/EditContractModal';
import TerminateContractModal from '../modals/TerminateContractModal';
import { ContractDetailsWrap } from './style';
import { currentProfile } from './overview/constants';
import { projectDetails, selectDocument } from '../../redux/selectors/projectDetailsSelectors';
import { getDocument, sendDocument, signContractByTalent } from '../../redux/actions/projectDetailsAction';
import { selectSavedUserData, selectUserType } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ConfirmContractModal from '../modals/ConfirmContractModal';

const ContractView = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [terminateData, setTerminateData] = useState();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [acceptModalData, setAcceptModalData] = useState();
  const projectInfo = useSelector(projectDetails);
  const userType = useSelector(selectUserType);
  const userData = useSelector(selectSavedUserData);
  const param = useParams();
  const dispatch = useDispatch();
  const document = useSelector(selectDocument);
  const [documentData, setDocumentData] = useState(document?.contract);
  const [checked, setChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const toggleModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  useEffect(() => {
    setDocumentData(document?.contract);
  }, [document]);

  const toggleTerminateModal = () => {
    setIsTerminateModalOpen(!isTerminateModalOpen);
    setTerminateData(document);
  };

  const toggleAcceptModal = () => {
    setIsAcceptModalOpen(false);
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

  useEffect(() => {
    dispatch(getDocument({ project_id: param?.projectId, doc_type: 'CONTRACT' }));
  }, []);

  const handleOpenAcceptModal = (userId) => {
    if (!checked) {
      setCheckError(true);
    } else {
      setIsAcceptModalOpen(true);
      setAcceptModalData({ userId });
    }
  };

  const handleSendDocByClient = () => {
    dispatch(
      sendDocument({
        project_id: param?.projectId,
        doc_type: 'CONTRACT',
        validity: DateTime.now().plus({ months: 1 }).toFormat('dd-MM-yyyy'),
        data: documentData,
        onSuccess: () => setIsAcceptModalOpen(false),
      }),
    );
  };
  const handleSignDoc = (id) => {
    // if (!checked) {
    //   setCheckError(true);
    // } else {
    dispatch(
      signContractByTalent({
        project_id: param?.projectId,
        doc_type: 'CONTRACT',
        user_id: id,
        onSuccess: () => setIsAcceptModalOpen(false),
      }),
    );
    // }
  };
  const onCheckChange = () => {
    setChecked(!checked);
    setCheckError(false);
  };

  const moveAllObjectsToBeginning = (array, targetId) => {
    if (array?.length < 1) {
      return [];
    }
    const targetObjects = array?.filter((item) => item.user_id === targetId);
    if (targetObjects?.length > 0) {
      const newArray = array?.filter((item) => item.user_id !== targetId); // Create a new array without matching objects
      newArray.unshift(...targetObjects); // Add all matching objects to the beginning
      return newArray; // Return the new array
    }
    return array; // Return the original array if no matching objects are found
  };
  const updatedWorkers = moveAllObjectsToBeginning(document?.workers, userData?._id);

  const isUserNotSigned = (array, userId) => {
    const user = array?.find((item) => item.user_id === userId);
    if (user) {
      return !user.is_signed;
    }
    return false;
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
                      {userType === userTypes.client && (
                        <CardText className="terminate me-1" onClick={toggleTerminateModal}>
                          Terminate
                        </CardText>
                      )}
                      {isTerminateModalOpen && (
                        <TerminateContractModal
                          terminateData={terminateData}
                          toggleModal={toggleTerminateModal}
                          modal={isTerminateModalOpen}
                        />
                      )}
                      {isAcceptModalOpen && (
                        <ConfirmContractModal
                          terminateData={acceptModalData}
                          toggleModal={toggleAcceptModal}
                          modal={isAcceptModalOpen}
                          onAccept={
                            userType === userTypes.client
                              ? handleSendDocByClient
                              : () => handleSignDoc(acceptModalData?.userId)
                          }
                        />
                      )}
                      <span className="icon-bg cursor-pointer" onClick={toggleModal}>
                        <img src={EditImg} alt="edit" />
                      </span>

                      {isEditModalOpen && (
                        <EditContractModal
                          setDocumentData={setDocumentData}
                          toggleModal={toggleModal}
                          data={documentData}
                          modal={isEditModalOpen}
                        />
                      )}
                      <span className="icon-bg cursor-pointer" onClick={() => downloadPdf(documentData)}>
                        <img src={DownloadImg} alt="download" />
                      </span>
                    </div>
                  </div>
                  <div className="contract-text-container">{ReactHtmlParser(documentData)}</div>
                </CardBody>
              </Card>
              {(document?.is_contract_sent === false || isUserNotSigned(updatedWorkers, userData?._id)) && (
                <div className="d-flex justify-content-between checkbox-wrap">
                  <Label className="checkbox-label" for="contract-sign">
                    <Input
                      onChange={onCheckChange}
                      checked={checked}
                      className="me-75"
                      type="checkbox"
                      id="contract-sign"
                      name="agreeTerms"
                    />
                    I have read terms and conditions
                  </Label>
                </div>
              )}
              {checkError && <FormFeedback>Please confirm that you have read the terms and conditions</FormFeedback>}
              <div className="team-sign-section mt-2">
                <h6 className="fw-bolder">Client</h6>
                <div className="d-flex justify-content-between mb-1">
                  <NameInfo
                    img={projectInfo?.client_details?.image_uri}
                    name={`${projectInfo?.client_details?.first_name} ${projectInfo?.client_details?.last_name}`}
                    info={projectInfo?.client_details?.company_name}
                  />
                  <div>
                    <Button
                      disabled={document?.is_contract_sent}
                      onClick={handleOpenAcceptModal}
                      color="primary"
                      className="btn-sm-block mb-75"
                    >
                      {document?.is_contract_sent ? 'Confirmed Agreement' : 'Confirm Agreement'}
                    </Button>
                    <CardText className="mb-1">Sign on: -</CardText>
                  </div>
                </div>
              </div>

              <div className="team-sign-section mt-2" style={{ maxHeight: '26rem', overflowY: 'auto' }}>
                <h6 className="fw-bolder">Team</h6>
                {updatedWorkers?.map((worker) => (
                  <div key={worker?.user_id} className="d-flex justify-content-between mb-1">
                    <NameInfo
                      img={worker?.image_uri}
                      name={`${worker?.first_name} ${worker?.last_name}`}
                      info={worker?.role}
                    />
                    <div>
                      {userData?._id === worker?.user_id ? (
                        <Button
                          onClick={() => handleOpenAcceptModal(worker?.user_id)}
                          disabled={worker?.is_signed}
                          color="primary"
                          className="btn-sm-block mb-25"
                        >
                          {worker?.is_signed ? 'Confirmed Agreement' : 'Confirm Agreement'}
                        </Button>
                      ) : (
                        <Button disabled color="primary" className="btn-sm-block mb-25">
                          {worker?.is_signed ? 'Confirmed Agreement' : 'Pending Agreement'}
                        </Button>
                      )}

                      <CardText className="mb-50">Sign on: -</CardText>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ContractDetailsWrap>
  );
};

export default ContractView;
