/* eslint-disable import/no-cycle */
import errorHandler from '../../utility/errorHandler';
import {
  getClubsService,
  getClubsCardInfoService,
  registerClubEmailService,
  changeMemberTypeService,
} from '../../services/clubServices';
import { createTeamService, updateTeamService } from '../../services/teamServices';
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
} from '../reducers/clubs';
import { updateTeamFailure, updateTeamRequest, updateTeamSuccess } from '../reducers/team';
import { scanAndProcessFiles } from '../../utility/Utils';

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
        handleCreateClub();
      }
    } catch (error) {
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
      handleUpdateClub();
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
};
