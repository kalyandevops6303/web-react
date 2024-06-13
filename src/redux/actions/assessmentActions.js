import errorHandler from '../../utility/errorHandler';
import { userAssessmentsService, allAssessmentsService, deleteAssessmentService, toggleAssessmentHiddenService, addAssessmentService, assessmentLinkService, editAssessmentService } from '../../services/assessmentServices';
import { 
    userAssessmentsRequest, 
    userAssessmentsFailure, 
    userAssessmentsSuccess,
    allAssessmentsRequest, 
    allAssessmentsFailure, 
    allAssessmentsSuccess,
    deleteAssessmentsRequest, 
    deleteAssessmentsFailure, 
    deleteAssessmentsSuccess,
    toggleAssessmentHiddenRequest, 
    toggleAssessmentHiddenFailure, 
    toggleAssessmentHiddenSuccess,
    addAssessmentRequest,
    addAssessmentFailure,
    addAssessmentSuccess,
    assessmentLinkRequest,
    assessmentLinkFailure,
    assessmentLinkSuccess,
    editAssessmentRequest,
    editAssessmentFailure,
    editAssessmentSuccess
} from '../reducers/assessment';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR, SUCCESS } from '../../utility/constants/ToastTypes';

const getUserAssessments = () => async (dispatch) => {
    dispatch(userAssessmentsRequest());
    try {
        const res = await userAssessmentsService();
        dispatch(userAssessmentsSuccess(res.data.data.assessments));
    } catch (error) {
        errorHandler(error, userAssessmentsFailure);
    }
}

const getAllAssessments = () => async (dispatch) => {
    dispatch(allAssessmentsRequest());
    try {
        const res = await allAssessmentsService();
        dispatch(allAssessmentsSuccess([...res.data.data.skills, ...res.data.data.roles, ...res.data.data.tools].map(({ assessment: { assessment_id, assessment_name } }) => ({ assessment_id, assessment_name }))))
    } catch (error) {
        errorHandler(error, allAssessmentsFailure);
    }
}

const deleteAssessment = ({assessment_id}) => async (dispatch) => {
    dispatch(deleteAssessmentsRequest());
    try {
        const res = await deleteAssessmentService({assessment_id});
        dispatch(deleteAssessmentsSuccess(res.data));
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
    } catch (error) {
        errorHandler(error, deleteAssessmentsFailure);
    }
}

const toggleAssessmentHidden = ({assessment_id}) => async (dispatch) => {
    dispatch(toggleAssessmentHiddenRequest());
    try {
        await toggleAssessmentHiddenService({assessment_id});
        dispatch(toggleAssessmentHiddenSuccess());
    } catch (error) {
        errorHandler(error, toggleAssessmentHiddenFailure);
    }
}

const addAssessment = ({assessment_name, assessment_id}) => async (dispatch) => {
    dispatch(addAssessmentRequest());
    try {
        await addAssessmentService({assessment_name, assessment_id});
        dispatch(addAssessmentSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
    } catch (error) {
        errorHandler(error, addAssessmentFailure);
    }
}

const getAssessmentLink = ({assessment_name, assessment_id}) => async (dispatch) => {
    dispatch(assessmentLinkRequest());
    try {
        const res = await assessmentLinkService({assessment_name, assessment_id});
        dispatch(assessmentLinkSuccess(res.data.data.invite_link));
    } catch (error) {
        errorHandler(error, assessmentLinkFailure);
    }
}

const editAssessment = ({curr_assessment_name, prev_assessment_id, curr_assessment_id}) => async (dispatch) => {
    dispatch(editAssessmentRequest());
    try {
        await editAssessmentService({curr_assessment_name, prev_assessment_id, curr_assessment_id});
        dispatch(editAssessmentSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
    } catch (error) {   
        errorHandler(error, editAssessmentFailure); 
    }
}

export {
    getUserAssessments,
    getAllAssessments,
    deleteAssessment,
    toggleAssessmentHidden,
    addAssessment,
    getAssessmentLink,
    editAssessment
}