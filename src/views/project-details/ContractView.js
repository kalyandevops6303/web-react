/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, FormFeedback, Input, Label, Row } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import html2pdf from 'html2pdf.js';
import { ArrowLeft } from 'react-feather';
import DownloadImg from '@src/assets/images/Download.svg';
import EditImg from '@src/assets/images/Edit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { BackButtonContainer, BackIconContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';
import LeftSidebarProfile from './overview/LeftSidebarProjectDetails';
import NameInfo from '../../@core/components/name-info';
import EditContractModal from '../modals/EditContractModal';
import { ContractDetailsWrap } from './style';
import { currentProfile } from './overview/constants';
import { projectDetails, selectDocument } from '../../redux/selectors/projectDetailsSelectors';
import { getDocument, sendDocument, signContractByTalent } from '../../redux/actions/projectDetailsAction';
import { selectSavedUserData, selectUserType } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ConfirmContractModal from '../modals/ConfirmContractModal';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import AlertAndNote from './overview/AlertAndNote';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';

const ContractView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [acceptModalData, setAcceptModalData] = useState();
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const projectInfo = useSelector(projectDetails);
  const userType = useSelector(selectUserType);
  const userData = useSelector(selectSavedUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const isLoading = useSelector((state) => state.projectDetails?.getDocumentLoading);
  const param = useParams();
  const dispatch = useDispatch();
  const document = useSelector(selectDocument);
  const isNDAview = param?.docType === 'nda';
  const isContractView = param?.docType === 'contract';
  const isFreshDoc = !param?.docId;
  const documentRes = isNDAview ? document?.nda : document?.contract;
  const [documentData, setDocumentData] = useState(documentRes);
  const [checked, setChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);

  const bidView = location?.pathname?.split('/')?.slice(0, -2)?.join('/');

  const toggleModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const getDocType = () => {
    if (isNDAview) {
      return 'NDA';
    }
    if (isContractView) {
      return 'CONTRACT';
    }
    return '';
  };
  const CapitalizeDocType = () => {
    if (getDocType() === 'CONTRACT') {
      return 'Contract';
    }
    return getDocType();
  };

  useEffect(() => {
    setDocumentData(documentRes);
  }, [document]);

  const toggleAcceptModal = () => {
    setIsAcceptModalOpen(false);
  };

  const downloadPdf = (element) => {
    const opt = {
      margin: 10,
      filename: `${projectInfo?.details?.name || 'project name'} ${getDocType()?.toLocaleLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  useEffect(() => {
    dispatch(getDocument({ document_id: param?.docId || '', project_id: param?.projectId, doc_type: getDocType() }));
    dispatch(getProfilePercentage());
  }, []);

  const handleOpenAcceptModal = (worker) => {
    if (!checked) {
      setCheckError(true);
    } else {
      setIsAcceptModalOpen(true);
      setAcceptModalData({ name: worker?.name, user_id: worker?.user_id, role: worker?.role });
    }
  };
  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleSendDocByClient = () => {
    dispatch(
      sendDocument({
        project_id: param?.projectId,
        doc_type: getDocType(),
        validity: DateTime.now().plus({ months: 1 }).toFormat('dd-MM-yyyy'),
        data: documentData,
        onSuccess: () => {
          setIsAcceptModalOpen(false);
          navigate(bidView);
        },
      }),
    );
  };
  const handleSignDoc = (data) => {
    dispatch(
      signContractByTalent({
        project_id: param?.projectId,
        doc_type: getDocType(),
        user_id: data?.user_id,
        role: data?.role,
        onSuccess: () => {
          setIsAcceptModalOpen(false);
          navigate(bidView);
        },
      }),
    );
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
    const userRoles = array?.filter((item) => item.user_id === userId);
    if (userRoles?.length > 0) {
      // If any role has is_signed as false, return false
      return !userRoles?.every((role) => role.is_signed);
    }
    // If userRoles is empty, meaning user not found, return false
    return false;
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  // Client View

  // if(is_documents_sent===false && status:ACCEPTED)
  // NDA/CONTRACT view: You have 30(bid_validity) days to sign the document => bid_validity

  // if(is_documents_signed===false && status:ACCEPTED)
  // NDA/CONTRACT view: Talent have 7 (documents_validity) days to sign the document => Extend (documents_validity_extended_by===0)

  // if(is_payment_made===false && status:ACCEPTED)
  // After both party have signed in NDA/Contract view => Note: Client has 7(payment_validity) days to make payment for milestones or project will be terminated (Extend) (payment_validity_extended_by===0)

  // if(is_payment_made===false && status:ACCEPTED)
  // After both party have signed in bid view => CTA => Make payment

  // if contract is sent it cannot be edited

  // Edit to be happen on FE

  // Talent/Team View

  // if(is_documents_signed===false && status:ACCEPTED)
  // NDA/CONTRACT view: Talent have 7(documents_validity) days to sign the document

  // if(is_payment_made===false && status:ACCEPTED)
  // After both party have signed in NDA/Contract view => Note: Client has 7(payment_validity) days to make payment for milestones or project will be terminated

  return (
    <ContractDetailsWrap>
      <BackButtonContainer className="p-0 mb-1">
        <div onClick={() => navigate(-1)} className="p-0 d-flex">
          <BackIconContainer>
            <ArrowLeft size={18} color={theme.white} />
          </BackIconContainer>
          <h4 className="m-0 fw-light blue-text mt-25 mx-50">{`Sign ${CapitalizeDocType()}`}</h4>
        </div>
      </BackButtonContainer>
      <Row>
        <Col lg="3">
          <LeftSidebarProfile isInvited isClient={false} data={currentProfile} isEditable={false} />
        </Col>
        <Col lg="9">
          <Card className="gray-bg ">
            <CardTitle className="main-card-title gray-bg">{`Standard ${CapitalizeDocType()} ${
              !isFreshDoc ? '(View only)' : ''
            }`}</CardTitle>
            <CardBody>
              {/* <div className="contract-info error-banner mb-2 d-flex px-1 py-2">
                <Info size={18} color={theme.red} className="me-50" />
                <p className="font-medium-1 m-0 error">
                  <span className="fw-bolder font-medium-1">Alert :</span> You have exceeded the fixed price cost of the
                  project. Please adjust your cost in order to submit the bid
                </p>
                <CardText
                  className="me-1 ms-2 my-auto cursor-pointer"
                  style={{ width: '10rem', color: theme.activeColor }}
                >
                  Extend validity
                </CardText>
              </div> */}
              <AlertAndNote />
              <Card>
                <CardBody className="contract-card-body">
                  <div className="d-flex justify-content-between ">
                    <CardTitle className="mb-1"> {CapitalizeDocType()}</CardTitle>
                    <div className="d-flex gap-1 align-items-center mb-75">
                      {/* {document?.is_contract_sent && isContractView && isFreshDoc && userType === userTypes.client && (
                        <div>
                          {document?.is_terminated ? (
                            <CardText className="terminate me-1">Terminated</CardText>
                          ) : (
                            <CardText className="terminate me-1" onClick={toggleTerminateModal}>
                              Terminate
                            </CardText>
                          )}
                        </div>
                      )}
                      {isTerminateModalOpen && (
                        <TerminateContractModal
                          modalData={{ name: 'Vigh', role: 'FE', org: 'Wowo', value: '100' }}
                          terminateData={terminateData}
                          toggleModal={toggleTerminateModal}
                          modal={isTerminateModalOpen}
                          docType={getDocType()}
                          project_id={param?.projectId}
                        />
                      )} */}
                      {isAcceptModalOpen && (
                        <ConfirmContractModal
                          modalData={acceptModalData}
                          // terminateData={acceptModalData}
                          toggleModal={toggleAcceptModal}
                          modal={isAcceptModalOpen}
                          onAccept={
                            userType === userTypes.client ? handleSendDocByClient : () => handleSignDoc(acceptModalData)
                          }
                          docType={getDocType()}
                          project_id={param?.projectId}
                        />
                      )}
                      {isFreshDoc &&
                        userType === userTypes.client &&
                        !document?.is_nda_sent &&
                        !document?.is_contract_sent && (
                          <span className="icon-bg cursor-pointer" onClick={toggleModal}>
                            <img src={EditImg} alt="edit" />
                          </span>
                        )}
                      {completeProfileModal && (
                        <CompleteProfileModal
                          modal={completeProfileModal}
                          toggleModal={toggleCompleteProfileModal}
                          modalInfoText="confirm agreement"
                        />
                      )}

                      {isEditModalOpen && (
                        <EditContractModal
                          setDocumentData={setDocumentData}
                          toggleModal={toggleModal}
                          data={documentData}
                          modal={isEditModalOpen}
                          docType={getDocType()}
                          project_id={param?.projectId}
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
              {isFreshDoc && (
                <div>
                  {(document?.is_contract_sent === false ||
                    document?.is_nda_sent === false ||
                    isUserNotSigned(updatedWorkers, userData?._id)) && (
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
                        I have read the terms and conditions of the contract
                      </Label>
                    </div>
                  )}
                </div>
              )}
              {checkError && <FormFeedback>Please confirm that you have read the Terms and Conditions</FormFeedback>}
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
                      style={{ minWidth: '14.5rem' }}
                      disabled={
                        isFreshDoc === false ||
                        userType !== userTypes.client ||
                        document?.is_contract_sent ||
                        document?.is_nda_sent
                      }
                      onClick={() =>
                        handleOpenAcceptModal({
                          name: `${projectInfo?.client_details?.first_name} ${projectInfo?.client_details?.last_name}`,
                          role: projectInfo?.client_details?.company_name,
                        })
                      }
                      color="primary"
                      className="btn-sm-block mb-25 mt-1"
                    >
                      {document?.is_contract_sent || document?.is_nda_sent
                        ? 'Confirmed Agreement'
                        : 'Confirm Agreement'}
                    </Button>
                    {document?.client_signed_document_date ? (
                      <CardText className="">
                        Signed on:{' '}
                        {document?.client_signed_document_date
                          ? DateTime?.fromMillis(document?.client_signed_document_date)?.toFormat('MMM dd, yy')
                          : ''}
                      </CardText>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className="team-sign-section mt-2" style={{ maxHeight: '26rem', overflowY: 'auto' }}>
                <h6 className="fw-bolder">{updatedWorkers?.length > 0 ? 'Team' : ''} </h6>
                {updatedWorkers?.map((worker) => (
                  <div key={worker?.user_id} className="d-flex mb-1 justify-content-between">
                    <NameInfo
                      img={worker?.image_uri}
                      name={worker?.accepted_date > 0 ? `${worker?.first_name} ${worker?.last_name}` : ''}
                      info={worker?.role}
                    />
                    <div>
                      {worker?.accepted_date === 0 ? (
                        <Button
                          disabled={userType === userTypes.client}
                          outline
                          color="primary"
                          type="secondary"
                          className="btn-sm-block mb-25 mt-1"
                          onClick={() => navigate(`/project-details/${projectInfo?._id}/team`)}
                        >
                          {userType === userTypes.client ? 'Member not yet assigned' : 'Assign team member'}
                        </Button>
                      ) : userData?._id === worker?.user_id ? (
                        <Button
                          style={{ minWidth: '14.5rem' }}
                          onClick={() => {
                            if (
                              profilePercentageData?.values_missing?.includes('company_name') ||
                              profilePercentageData?.values_missing?.includes('educational_institute') ||
                              profilePercentageData?.values_missing?.includes('availability') ||
                              profilePercentageData?.values_missing?.includes('payment_account')
                            ) {
                              toggleCompleteProfileModal();
                            } else {
                              handleOpenAcceptModal({
                                name: `${worker?.first_name} ${worker?.last_name}`,
                                role: worker?.role,
                              });
                            }
                          }}
                          disabled={isFreshDoc === false || worker?.is_signed}
                          color="primary"
                          className="btn-sm-block mb-25 mt-1"
                        >
                          {worker?.is_signed ? 'Confirmed Agreement' : 'Confirm Agreement'}
                        </Button>
                      ) : (
                        <Button
                          style={{ minWidth: '14.5rem' }}
                          disabled
                          color="primary"
                          className="btn-sm-block mb-25 mt-1"
                        >
                          {worker?.is_signed ? 'Confirmed Agreement' : 'Pending Agreement'}
                        </Button>
                      )}

                      <CardText className="">
                        <span className={!worker?.is_signed && 'invisible'}>Signed on: </span>
                        {worker?.signed_on ? DateTime?.fromMillis(worker?.signed_on)?.toFormat('MMM dd, yy') : ''}
                      </CardText>
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
