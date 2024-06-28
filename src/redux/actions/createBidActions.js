import ShowToastMessage from '../../@core/components/toast';
import {
  bidDetailsService,
  changeBidTypeService,
  checkBidService,
  createBidService,
  deleteDraftBidService,
  projectDetailsService,
  rolesService,
  setMilestonesService,
  setWorkersService,
  submitBidService,
} from '../../services/createBidServices';
import { scanAndProcessFiles } from '../../utility/Utils';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import errorHandler from '../../utility/errorHandler';
import {
  bidDetailsFailure,
  bidDetailsRequest,
  bidDetailsSuccess,
  changeBidTypeFailure,
  changeBidTypeRequest,
  changeBidTypeSuccess,
  checkBidFailure,
  checkBidRequest,
  checkBidSuccess,
  createBidFailure,
  createBidRequest,
  createBidSuccess,
  deleteDraftBidFailure,
  deleteDraftBidRequest,
  deleteDraftBidSuccess,
  draftSetMilestonesFailure,
  draftSetMilestonesRequest,
  draftSetMilestonesSuccess,
  draftSetWorkersFailure,
  draftSetWorkersRequest,
  draftSetWorkersSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  rolesFailure,
  rolesRequest,
  rolesSuccess,
  setMilestonesFailure,
  setMilestonesRequest,
  setMilestonesSuccess,
  setWorkersFailure,
  setWorkersRequest,
  setWorkersSuccess,
  submitBidFailure,
  submitBidRequest,
  submitBidSuccess,
} from '../reducers/createBid';

const getCheckBid = (projectId, onCheckBidSuccess) => async (dispatch) => {
  dispatch(checkBidRequest());
  try {
    const res = await checkBidService(projectId);
    dispatch(checkBidSuccess(res.data.data));
    onCheckBidSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, checkBidFailure);
  }
};

const createBid = (projectId, bidType, onSuccess) => async (dispatch) => {
  dispatch(createBidRequest());
  try {
    const res = await createBidService(projectId, bidType);
    dispatch(createBidSuccess(res.data.data));
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, createBidFailure);
  }
};

const getProjectDetails = (projectId) => async (dispatch) => {
  dispatch(projectDetailsRequest());
  try {
    const res = await projectDetailsService(projectId);
    dispatch(projectDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectDetailsFailure);
  }
};

const getBidDetails = (bidId, onGetUserDetailsSuccess) => async (dispatch) => {
  dispatch(bidDetailsRequest());
  try {
    const res = await bidDetailsService(bidId);
    dispatch(bidDetailsSuccess(res.data.data));
    onGetUserDetailsSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, bidDetailsFailure);
  }
};

const getRoles = (projectId) => async (dispatch) => {
  dispatch(rolesRequest());
  try {
    const res = await rolesService(projectId);
    dispatch(rolesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, rolesFailure);
  }
};

const saveDraftSetWorkers = (bidId, data, onSuccess) => async (dispatch) => {
  dispatch(draftSetWorkersRequest());
  try {
    const res = await setWorkersService(bidId, data);
    dispatch(draftSetWorkersSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, draftSetWorkersFailure);
  }
};

const saveSetWorkers = (bidId, data, onSuccess) => async (dispatch) => {
  dispatch(setWorkersRequest());
  try {
    const res = await setWorkersService(bidId, data);
    dispatch(setWorkersSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, setWorkersFailure);
  }
};

const saveDraftSetMilestones = (projectId, bidId, data, onSuccess) => async (dispatch) => {
  dispatch(draftSetMilestonesRequest());
  try {
    const handleSaveMilestone = async () => {
      const res = await setMilestonesService(projectId, bidId, data);
      dispatch(draftSetMilestonesSuccess(res.data.data));
      onSuccess();
    };

    if (data?.documents?.length > 0) {
      scanAndProcessFiles({
        fileData: data?.documents,
        handleMainAPI: handleSaveMilestone,
        onError: () => dispatch(draftSetMilestonesFailure()),
        isPrivate: true,
      });
    } else {
      handleSaveMilestone();
    }
  } catch (error) {
    errorHandler(error, draftSetMilestonesFailure);
  }
};

const saveSetMilestones = (projectId, bidId, data, onSuccess) => async (dispatch) => {
  dispatch(setMilestonesRequest());
  try {
    const handleSaveMilestone = async () => {
      const res = await setMilestonesService(projectId, bidId, data);
      dispatch(setMilestonesSuccess(res.data.data));
      onSuccess();
    };

    if (data?.documents?.length > 0) {
      scanAndProcessFiles({
        fileData: data?.documents,
        handleMainAPI: handleSaveMilestone,
        onError: () => dispatch(setMilestonesFailure()),
        isPrivate: true,
      });
    } else {
      handleSaveMilestone();
    }
  } catch (error) {
    errorHandler(error, setMilestonesFailure);
  }
};

const saveSubmitBid = (bidId, onSuccess) => async (dispatch) => {
  dispatch(submitBidRequest());
  try {
    const res = await submitBidService(bidId);
    dispatch(submitBidSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, submitBidFailure);
  }
};

const saveChangeBidType = (bidId, bidType, onSuccess) => async (dispatch) => {
  dispatch(changeBidTypeRequest());
  try {
    const res = await changeBidTypeService(bidId, bidType);
    dispatch(changeBidTypeSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, changeBidTypeFailure);
  }
};

const deleteDraftBid = (bidId, onSuccess) => async (dispatch) => {
  dispatch(deleteDraftBidRequest());
  try {
    const res = await deleteDraftBidService(bidId);
    dispatch(deleteDraftBidSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, deleteDraftBidFailure);
  }
};

export {
  getCheckBid,
  createBid,
  getProjectDetails,
  getBidDetails,
  getRoles,
  saveSetWorkers,
  saveSetMilestones,
  saveSubmitBid,
  saveChangeBidType,
  deleteDraftBid,
  saveDraftSetWorkers,
  saveDraftSetMilestones,
};
