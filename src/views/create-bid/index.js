import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidTalentSteps, createBidTeamSteps, userTypes } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';
import VariableSimpleMilestoneView from './overview/VariableSimpleMilestoneView';
import Preview from './overview/Preview';
import FormStepper from './overview/FormStepper';
import { selectUserData } from '../../redux/selectors/authSelectors';
import FixedSimpleMilestoneView from './overview/FixedSimpleMilestoneView';
import SimpleTeamView from './overview/SimpleTeamView';
import AdvanceTeamView from './overview/AdvanceTeamView';
import VariableAdvanceMilestoneView from './overview/VariableAdvanceMilestoneView';
import { projectDetails } from '../../redux/selectors/createBidSelectors';
import FixedAdvanceMilestoneView from './overview/FixedAdvanceMilestoneView';
import { truncateSentence } from '../../utility/Utils';
import DraftSavedModal from '../modals/DraftSavedModal';
import { formData } from '../../redux/selectors/formDataSelectors';
import { setFormData } from '../../redux/reducers/formData';

const CreateBid = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(savedFormData?.currentStep || location?.pathname?.split('/')?.[5]);
  const [progressPercent, setProgressPercent] = useState(null);
  const [draftSavedModal, setDraftSavedModal] = useState(null);

  const selectUserDetailsData = useSelector(selectUserData);
  const projectDetailsData = useSelector(projectDetails);

  const toggleDraftSavedModal = () => setDraftSavedModal(!draftSavedModal);

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    dispatch(setFormData({...savedFormData,currentStep}));
    let percent = 0;
    if (currentStep === 'team') {
      percent = 30;
    } else if (selectUserDetailsData?.user_type === userTypes.team && currentStep === 'milestone') {
      percent = 60;
    } else if (selectUserDetailsData?.user_type === userTypes.talent && currentStep === 'milestone') {
      percent = 50;
    } else if (currentStep === 'preview') {
      percent = 100;
    }
    setProgressPercent(percent);
  }, [currentStep]);

  return (
    <>
      {draftSavedModal && (
        <DraftSavedModal
          modal={draftSavedModal}
          toggleModal={toggleDraftSavedModal}
          path="Marketplace > My Bids > Drafts Or View Draft"
          onPrimaryBtnClick={() =>
            navigate('/marketplace/my_bids',)
          }
        />
      )}
      <BreadCrumbs
        data={[
          { title: 'Marketplace', link: '/marketplace/all_listings' },
          { title: truncateSentence({ sentence: projectDetailsData?.details?.name, maxCharacters: 30 }) || 'Project' },
          { title: 'Create Bid', link: '#' },
        ]}
      />
      <Row>
        <Col lg="3">
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <Row className="w-75">
            <FormStepper
              steps={selectUserDetailsData?.user_type === userTypes.team ? createBidTeamSteps : createBidTalentSteps}
              currentStep={currentStep}
              onChangeStep={changeStep}
            />

            {selectUserDetailsData?.user_type === userTypes.talent ? (
              <ProgressBarWrapper className="w-75">
                <Progress value={progressPercent} className="p-0">
                  {progressPercent}%
                </Progress>
              </ProgressBarWrapper>
            ) : (
              <ProgressBarWrapper>
                <Progress value={progressPercent} className="p-0">
                  {progressPercent}%
                </Progress>
              </ProgressBarWrapper>
            )}
          </Row>
          <Routes>
            {(params.bidType === 'variable-simple' || params.bidType === 'fixed-simple') &&
              selectUserDetailsData?.user_type === userTypes.team && (
                <Route path="team" element={<SimpleTeamView setDraftSavedModal={setDraftSavedModal} />} />
              )}
            {(params.bidType === 'variable-advanced' || params.bidType === 'fixed-advanced') &&
              selectUserDetailsData?.user_type === userTypes.team && (
                <Route path="team" element={<AdvanceTeamView setDraftSavedModal={setDraftSavedModal} />} />
              )}
            {params.bidType === 'variable-simple' && (
              <Route
                path="milestone"
                element={<VariableSimpleMilestoneView setDraftSavedModal={setDraftSavedModal} />}
              />
            )}
            {params.bidType === 'variable-advanced' && (
              <Route
                path="milestone"
                element={<VariableAdvanceMilestoneView setDraftSavedModal={setDraftSavedModal} />}
              />
            )}
            {params.bidType === 'fixed-simple' && (
              <Route path="milestone" element={<FixedSimpleMilestoneView setDraftSavedModal={setDraftSavedModal} />} />
            )}
            {params.bidType === 'fixed-advanced' && (
              <Route path="milestone" element={<FixedAdvanceMilestoneView setDraftSavedModal={setDraftSavedModal} />} />
            )}
            <Route path="preview" element={<Preview />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default CreateBid;
