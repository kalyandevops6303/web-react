// eslint-disable-next-line import/no-cycle
import {
  getTeamService,
  createTeamService,
  createDraftTeamService,
  checkDraftTeamService,
  deleteDraftTeamService,
  updateDraftTeamService,
  getInviteDetails,
  updateTeamService,
  getTeamInfoById,
} from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import {
  getTeamCreated,
  getTeamError,
  getTeamRequest,
  getTeamSuccess,
  saveDraftTeamRequest,
  saveDraftTeamSuccess,
  saveDraftTeamError,
  deleteDraftTeamRequest,
  deleteDraftTeamSuccess,
  deleteDraftTeamError,
  updateTeamFailure,
  updateTeamRequest,
  updateTeamSuccess,
  getDraftTeamRequest,
  getDraftTeamSuccess,
  getDraftTeamError,
} from '../reducers/team';
import { getInvitedBySuccess } from '../reducers/projectDetails';
import { getMyTeamFailure, getMyTeamRequest, getMyTeamSuccess } from '../reducers/dashboard';
import { scanAndProcessFiles } from '../../utility/Utils';
import { setConfirmSaveForLater } from '../reducers/formData';

const getTeams =
  ({ onSuccess }) =>
  async (dispatch) => {
    dispatch(getTeamRequest());
    dispatch(getMyTeamRequest());
    try {
      const res = await getTeamService();
      dispatch(getTeamSuccess(res.data.data.data));
      dispatch(getMyTeamSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }));
      onSuccess(res.data.data.data);
    } catch (error) {
      errorHandler(error, getTeamError);
      errorHandler(error, getMyTeamFailure);
    }
  };

const getDraftTeamById =
  ({ id, onSuccess, onError, onGetDraftTeamDetails }) =>
  async (dispatch) => {
    dispatch(getDraftTeamRequest());
    try {
      const res = await getTeamInfoById(id);
      await onGetDraftTeamDetails(res.data.data);
      onSuccess(res.data.data);
      dispatch(getDraftTeamSuccess(res.data.data));
    } catch (error) {
      dispatch(getDraftTeamError());
      onError();
      errorHandler(error, getTeamError);
    }
  };

const createTeam =
  ({ data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const handleCreateTeam = async () => {
        const res = await createTeamService(data);
        dispatch(getTeamCreated(res.data.data));
        onSuccess(res.data.data);
      };
      if (data?.team_logo) {
        scanAndProcessFiles({
          fileData: [{ file_name: 'Team logo', file_key: data?.team_logo }],
          handleMainAPI: handleCreateTeam,
          onError,
          isPrivate: false,
        });
      } else {
        await handleCreateTeam();
        await dispatch(getTeams({ onSuccess: () => {} }));
      }
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const createDraftTeam =
  ({ data, onSuccess, onError, redirection, isOpenSaveForLater }) =>
  async (dispatch) => {
    try {
      dispatch(saveDraftTeamRequest());
      const res = await createDraftTeamService(data);
      await dispatch(saveDraftTeamSuccess(res));

      if (isOpenSaveForLater) {
        redirection();
      } else {
        onSuccess();
      }
      dispatch(setConfirmSaveForLater(false));
    } catch (error) {
      onError();
      dispatch(saveDraftTeamError());
      errorHandler(error);
    }
  };

const updateDraftTeam =
  ({ id, data, onSuccess, onError, redirection, isOpenSaveForLater }) =>
  async (dispatch) => {
    try {
      dispatch(saveDraftTeamRequest());
      const res = await updateDraftTeamService(id, data);
      await dispatch(saveDraftTeamSuccess(res));
      if (isOpenSaveForLater) {
        redirection();
      } else {
        onSuccess();
      }
      dispatch(setConfirmSaveForLater(false));
    } catch (error) {
      onError();
      dispatch(saveDraftTeamError());
      errorHandler(error);
    }
  };

const checkDraftTeam =
  ({ setSavedDraftsAvailableModal, checkType, onNavigation , onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(saveDraftTeamRequest());
      const res = await checkDraftTeamService(checkType);
      if (res?.data?.data?.has_draft_team) {
        setSavedDraftsAvailableModal(true);
      }
      else{
        onNavigation();
      }
      onSuccess();
      dispatch(saveDraftTeamSuccess());
    } catch (error) {
      onError();
      dispatch(saveDraftTeamError());
      errorHandler(error);
    }
  };

const deleteDraftTeam =
  ({ id, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(deleteDraftTeamRequest());
      const res = await deleteDraftTeamService(id);
      await dispatch(deleteDraftTeamSuccess(res));
      onSuccess();
    } catch (error) {
      onError();
      dispatch(deleteDraftTeamError());
      errorHandler(error);
    }
  };

const updateTeam = (data, onSuccess) => async (dispatch) => {
  dispatch(updateTeamRequest());
  try {
    const handleUpdateTeam = async () => {
      const res = await updateTeamService(data);
      dispatch(updateTeamSuccess(res.data.data));
      onSuccess();
    };

    if (data?.team_logo) {
      scanAndProcessFiles({
        fileData: [{ file_name: 'Team logo', file_key: data?.team_logo }],
        handleMainAPI: handleUpdateTeam,
        onError: () => dispatch(updateTeamFailure()),
        isPrivate: false,
      });
    } else {
      await handleUpdateTeam();
      await dispatch(getTeams({ onSuccess: () => {} }));
    }
  } catch (error) {
    errorHandler(error, updateTeamFailure);
  }
};

const getWhoInvited =
  ({ id, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const res = await getInviteDetails(id);
      dispatch(getInvitedBySuccess(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };
// eslint-disable-next-line import/prefer-default-export
export {
  createTeam,
  getTeams,
  getWhoInvited,
  updateTeam,
  getDraftTeamById,
  createDraftTeam,
  updateDraftTeam,
  deleteDraftTeam,
  checkDraftTeam,
};
