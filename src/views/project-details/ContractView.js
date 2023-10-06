import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import TerminateContractModal from '../modals/TerminateContractModal';
import { ContractDetailsWrap } from './style';
import { currentProfile } from './overview/constants';
import { projectDetails, selectDocument } from '../../redux/selectors/projectDetailsSelectors';
import { getDocument, sendDocument, signContractByTalent } from '../../redux/actions/projectDetailsAction';
import { selectSavedUserData, selectUserType } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ConfirmContractModal from '../modals/ConfirmContractModal';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

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
      filename: `project_name_${getDocType()?.toLocaleLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  useEffect(() => {
    dispatch(getDocument({ document_id: param?.docId || '', project_id: param?.projectId, doc_type: getDocType() }));
  }, []);

  const handleOpenAcceptModal = (worker) => {
    if (!checked) {
      setCheckError(true);
    } else {
      setIsAcceptModalOpen(true);
      setAcceptModalData({ name: worker?.name, user_id: worker?.user_id, role: worker?.role });
    }
  };

  const handleSendDocByClient = () => {
    dispatch(
      sendDocument({
        project_id: param?.projectId,
        doc_type: getDocType(),
        validity: DateTime.now().plus({ months: 1 }).toFormat('dd-MM-yyyy'),
        data: documentData,
        onSuccess: () => setIsAcceptModalOpen(false),
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
        onSuccess: () => setIsAcceptModalOpen(false),
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
    const user = array?.find((item) => item.user_id === userId);
    if (user) {
      return !user.is_signed;
    }
    return false;
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

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
              <Card>
                <CardBody className="contract-card-body">
                  <div className="d-flex justify-content-between ">
                    <CardTitle className="mb-1"> {CapitalizeDocType()}</CardTitle>
                    <div className="d-flex gap-1 align-items-center mb-75">
                      {document?.is_contract_sent && isContractView && isFreshDoc && userType === userTypes.client && (
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
                      )}
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
                      {!document?.is_terminated && isFreshDoc && userType === userTypes.client && (
                        <span className="icon-bg cursor-pointer" onClick={toggleModal}>
                          <img src={EditImg} alt="edit" />
                        </span>
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
                        I have read Terms and Conditions
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
                  <div key={worker?.user_id} className="d-flex justify-content-between mb-1">
                    <NameInfo
                      img={worker?.image_uri}
                      name={`${worker?.first_name} ${worker?.last_name}`}
                      info={worker?.role}
                    />
                    <div>
                      {userData?._id === worker?.user_id ? (
                        <Button
                          style={{ minWidth: '14.5rem' }}
                          onClick={() =>
                            handleOpenAcceptModal({
                              name: `${worker?.first_name} ${worker?.last_name}`,
                              role: worker?.role,
                            })
                          }
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
