import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userAssessmentsService = () => DataService.get(API.assessments.user_assessments);
const allAssessmentsService = () => DataService.get(API.assessments.all_assessments);
const deleteAssessmentService = ({ assessment_id, str_type, _id }) => DataService.delete(API.assessments.delete_assessment + `?assessment_id=${assessment_id}&str_type=${str_type}&_id=${_id}`);
const toggleAssessmentHiddenService = ({ assessment_id }) => DataService.put(API.assessments.toggle_assessment_hidden + `?assessment_id=${assessment_id}`);
const addAssessmentService = ({ assessment_name, assessment_id, str_type, _id }) => DataService.put(API.assessments.add_assessment + `?assessment_name=${assessment_name}&assessment_id=${assessment_id}&str_type=${str_type}&_id=${_id}`);
const assessmentLinkService = ({ assessment_name, assessment_id }) => DataService.put(API.assessments.get_assessment_link + `?assessment_name=${assessment_name}&assessment_id=${assessment_id}`);
const editAssessmentService = ({curr_assessment_name, prev_assessment_id, curr_assessment_id, prev_str_type, curr_str_type, prev_id, curr_id}) => DataService.put(API.assessments.edit_assessment + `?curr_assessment_name=${curr_assessment_name}&prev_assessment_id=${prev_assessment_id}&curr_assessment_id=${curr_assessment_id}&prev_str_type=${prev_str_type}&curr_str_type=${curr_str_type}&prev_id=${prev_id}&curr_id=${curr_id}`);

export {
    userAssessmentsService,
    allAssessmentsService,
    deleteAssessmentService,
    toggleAssessmentHiddenService,
    addAssessmentService,
    assessmentLinkService,
    editAssessmentService
}