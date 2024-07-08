import errorHandler from '../../utility/errorHandler';
import { userAssessmentsService, allAssessmentsService, deleteAssessmentService, toggleAssessmentHiddenService, addAssessmentService, assessmentLinkService, deleteNonAssessmentService, prepopulateService } from '../../services/assessmentServices';
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
    deleteNonAssessmentsFailure,
    deleteNonAssessmentsRequest,
    deleteNonAssessmentsSuccess,
    prepopulateRequest,
    prepopulateSuccess,
    prepopulateFailure
} from '../reducers/assessment';
import { getCustomerSupportList } from './supportActions';

const getUserAssessments = () => async (dispatch) => {
    dispatch(userAssessmentsRequest());
    try {
        const res = await userAssessmentsService();
        dispatch(userAssessmentsSuccess(res.data.data));
    } catch (error) {
        errorHandler(error, userAssessmentsFailure);
    }
}

const getAllAssessments = () => async (dispatch) => {
    dispatch(allAssessmentsRequest());
    try {
        const res = await allAssessmentsService();
        const { data: { data: { skills, roles, tools } } } = res;
        dispatch(allAssessmentsSuccess([
            ...skills
                .filter(({ assessment }) => assessment?.assessment_id)
                .map(({ assessment, _id, name }) => ({
                    assessment_id: assessment.assessment_id,
                    assessment_name: assessment.assessment_name,
                    str_type: "SKILLS",
                    _id,
                    str_name: name
                })),
            ...roles
                .filter(({ assessment }) => assessment?.assessment_id)
                .map(({ assessment, _id, name }) => ({
                    assessment_id: assessment.assessment_id,
                    assessment_name: assessment.assessment_name,
                    str_type: "ROLES",
                    _id,
                    str_name: name
                })),
            ...tools
                .filter(({ assessment }) => assessment?.assessment_id)
                .map(({ assessment, _id, name }) => ({
                    assessment_id: assessment.assessment_id,
                    assessment_name: assessment.assessment_name,
                    str_type: "TOOLS",
                    _id,
                    str_name: name
                }))
        ]));

    } catch (error) {
        errorHandler(error, allAssessmentsFailure);
    }
}

const deleteAssessment = ({ assessmentId, strType, id }) => async (dispatch) => {
    dispatch(deleteAssessmentsRequest());
    try {
        await deleteAssessmentService({ assessmentId, strType, id });
        dispatch(deleteAssessmentsSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
    } catch (error) {
        errorHandler(error, deleteAssessmentsFailure);
    }
}

const toggleAssessmentHidden = ({ assessmentId }) => async (dispatch) => {
    dispatch(toggleAssessmentHiddenRequest());
    try {
        await toggleAssessmentHiddenService({ assessmentId });
        dispatch(toggleAssessmentHiddenSuccess());
    } catch (error) {
        errorHandler(error, toggleAssessmentHiddenFailure);
    }
}

const addAssessment = ({ assessmentName, assessmentId, strType, id }) => async (dispatch) => {
    dispatch(addAssessmentRequest());
    try {
        await addAssessmentService({ assessmentName, assessmentId, strType, id });
        dispatch(addAssessmentSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
    } catch (error) {
        errorHandler(error, addAssessmentFailure);
    }
}

const getAssessmentLink = ({ assessmentName, assessmentId }) => async (dispatch) => {
    dispatch(assessmentLinkRequest());
    try {
        const res = await assessmentLinkService({ assessmentName, assessmentId });
        dispatch(assessmentLinkSuccess(res.data.data.invite_link));
    } catch (error) {
        errorHandler(error, assessmentLinkFailure);
    }
}

const deleteNonAssessment = ({ strType, id }) => async (dispatch) => {
    dispatch(deleteNonAssessmentsRequest());
    try {
        await deleteNonAssessmentService({ strType, id });
        dispatch(deleteNonAssessmentsSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }));
    } catch (error) {
        errorHandler(error, deleteNonAssessmentsFailure);
    }
}

const prepopulateAssessments = () => async (dispatch) => {
    dispatch(prepopulateRequest());
    try {
        await prepopulateService();
        dispatch(prepopulateSuccess());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }));
    } catch (error) {
        errorHandler(error, prepopulateFailure);
    }
}

export {
    getUserAssessments,
    getAllAssessments,
    deleteAssessment,
    toggleAssessmentHidden,
    addAssessment,
    getAssessmentLink,
    deleteNonAssessment,
    prepopulateAssessments
}