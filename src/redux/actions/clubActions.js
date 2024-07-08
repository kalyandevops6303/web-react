/* eslint-disable import/no-cycle */
import errorHandler from '../../utility/errorHandler';
import {
  getClubsService,
  getClubsCardInfoService,
  registerClubEmailService,
  changeMemberTypeService,
} from '../../services/clubServices';
import { checkDraftTeamService, createDraftTeamService, createTeamService, deleteDraftTeamService, updateDraftTeamService, updateTeamService } from '../../services/teamServices';
import {
  getClubCreated,
  registerClubEmailFailure,
  registerClubEmailRequest,
  registerClubEmailSuccess,
  setClubCreateData,
  getCardInfoReq,
  getCardInfoSuccess,
  getCardInfoErr,
  getListErr,
  getListReq,
  storeSuccessData,
  clearClubCreateData,
  saveDraftClubRequest,
  saveDraftClubSuccess,
  saveDraftClubError,
  checkDraftClubRequest,
  checkDraftClubError,
  checkDraftClubSuccess,
  deleteDraftClubRequest,
  deleteDraftClubSuccess,
  deleteDraftClubError,
} from '../reducers/clubs';
import { updateTeamFailure, updateTeamRequest, updateTeamSuccess } from '../reducers/team';
import { scanAndProcessFiles } from '../../utility/Utils';
import { getTeams } from './teamsActions';

const getClubs =
  ({ filterData, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getClubsService({ filterData, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getClubCardInfo =
  ({ onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(getCardInfoReq());
    try {
      const res = await getClubsCardInfoService();
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoErr);
    }
  };

const setClubCreateDataAction = (data) => async (dispatch) => {
  dispatch(setClubCreateData(data));
};

const clearClubCreateDataAction = () => async (dispatch) => {
  dispatch(clearClubCreateData());
};

const registerClubEmail =
  ({ email, onSuccess }) =>
  async (dispatch) => {
    dispatch(registerClubEmailRequest());
    try {
      await registerClubEmailService(email);
      dispatch(registerClubEmailSuccess(email));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, registerClubEmailFailure);
    }
  };

const createClub =
  ({ data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const handleCreateClub = async () => {
        const res = await createTeamService(data);
        dispatch(getClubCreated(res.data.data));
        onSuccess(res.data.data);
      };

      if (data?.team_logo) {
        scanAndProcessFiles({
          fileData: [{ file_name: 'Club logo', file_key: data?.team_logo }],
          handleMainAPI: handleCreateClub,
          onError,
          isPrivate: false,
        });
      } else {
       await handleCreateClub();
       await dispatch(getTeams({ onSuccess: () => {} }));
      }

    } catch (error) {
      errorHandler(error);
    }
  };

  const createDraftClub =
  ({ data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(saveDraftClubRequest());
      const res = await createDraftTeamService(data);
      await dispatch(saveDraftClubSuccess(res));
      onSuccess();
    } catch (error) {
      onError();
      dispatch(saveDraftClubError());
      errorHandler(error);
    }
  };

const updateDraftClub =
  ({ id, data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(saveDraftClubRequest());
      const res = await updateDraftTeamService(id, data);
      await dispatch(saveDraftClubSuccess(res));
      onSuccess();
    } catch (error) {
      onError();
      dispatch(saveDraftClubError());
      errorHandler(error);
    }
  };

const checkDraftClub =
  ({ setSavedDraftsAvailableModal, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(checkDraftClubRequest());
      const res = await checkDraftTeamService();
      if (res?.data?.data?.has_draft_team) {
        setSavedDraftsAvailableModal(true);
      }
      dispatch(checkDraftClubSuccess());
      onSuccess();
    } catch (error) {
      onError();
      dispatch(checkDraftClubError());
      errorHandler(error);
    }
  };

const deleteDraftClub =
  ({ id, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      dispatch(deleteDraftClubRequest());
      const res = await deleteDraftTeamService(id);
      await dispatch(deleteDraftClubSuccess(res));
      onSuccess();
    } catch (error) {
      onError();
      dispatch(deleteDraftClubError());
      errorHandler(error);
    }
  };

const changeMemberType = (data, onSuccess) => async () => {
  try {
    await changeMemberTypeService(data);
    onSuccess();
  } catch (error) {
    errorHandler(error);
  }
};

const updateClub = (data, onSuccess) => async (dispatch) => {
  dispatch(updateTeamRequest());
  try {
    const handleUpdateClub = async () => {
      const res = await updateTeamService(data);
      dispatch(updateTeamSuccess(res.data.data));
      onSuccess();
    };
    if (data?.team_logo) {
      scanAndProcessFiles({
        fileData: [{ file_name: 'Club logo', file_key: data?.team_logo }],
        handleMainAPI: handleUpdateClub,
        onError: () => dispatch(updateTeamFailure()),
        isPrivate: false,
      });
    } else {
     await handleUpdateClub();
     await dispatch(getTeams({ onSuccess: () => {} }));
    }
  } catch (error) {
    errorHandler(error, updateTeamFailure);
  }
};

export {
  setClubCreateDataAction,
  clearClubCreateDataAction,
  registerClubEmail,
  createClub,
  getClubs,
  getClubCardInfo,
  changeMemberType,
  updateClub,
  createDraftClub,
  updateDraftClub,
  checkDraftClub,
  deleteDraftClub,
};
