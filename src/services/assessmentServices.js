import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userAssessmentsService = ({ id }) =>
  id
    ? DataService.get(`${API.assessments.user_assessments}?user_id=${id}`)
    : DataService.get(API.assessments.user_assessments);
const teamAssessmentsService = ({ id }) => DataService.get(`${API.assessments.team_assessments}?team_id=${id}`);
const allAssessmentsService = () => DataService.get(API.assessments.all_assessments);
const deleteAssessmentService = ({ assessmentId, strType, id }) =>
  DataService.delete(
    `${API.assessments.delete_assessment}?assessment_id=${assessmentId}&str_type=${strType}&_id=${id}`,
  );
const toggleAssessmentHiddenService = ({ assessmentId }) =>
  DataService.put(`${API.assessments.toggle_assessment_hidden}?assessment_id=${assessmentId}`);
const addAssessmentService = ({ assessmentName, assessmentId, strType, id }) =>
  DataService.put(
    `${API.assessments.add_assessment}?assessment_name=${assessmentName}&assessment_id=${assessmentId}&str_type=${strType}&_id=${id}`,
  );
const assessmentLinkService = ({ assessmentName, assessmentId }) =>
  DataService.put(
    `${API.assessments.get_assessment_link}?assessment_name=${assessmentName}&assessment_id=${assessmentId}`,
  );
const deleteNonAssessmentService = ({ strType, id }) =>
  DataService.delete(`${API.assessments.delete_non_assessment}?str_type=${strType}&_id=${id}`);
const prepopulateService = () => DataService.put(API.assessments.prepopulate);

export {
  userAssessmentsService,
  allAssessmentsService,
  deleteAssessmentService,
  toggleAssessmentHiddenService,
  addAssessmentService,
  assessmentLinkService,
  deleteNonAssessmentService,
  prepopulateService,
  teamAssessmentsService,
};
