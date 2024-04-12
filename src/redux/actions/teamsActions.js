// eslint-disable-next-line import/no-cycle
import { getTeamService, createTeamService, getInviteDetails, updateTeamService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import {
  getTeamCreated,
  getTeamError,
  getTeamRequest,
  getTeamSuccess,
  updateTeamFailure,
  updateTeamRequest,
  updateTeamSuccess,
} from '../reducers/team';
import { getInvitedBySuccess } from '../reducers/projectDetails';
import { getMyTeamFailure, getMyTeamRequest, getMyTeamSuccess } from '../reducers/dashboard';
import { handleCorruptedFiles, handleScanFiles } from '../../utility/Utils';
import { fileScanStatus } from '../../utility/constants/Constant';

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

const createTeam =
  ({ data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const callMainAPI = async () => {
        const res = await createTeamService(data);
        dispatch(getTeamCreated(res.data.data));
        onSuccess(res.data.data);
      };
      if (data?.team_logo) {
        const finalScanStatus = await handleScanFiles({
          fileKeys: [{ file_name: 'Team logo', file_key: data?.team_logo }],
          isPrivate: false,
        });

        if (finalScanStatus.data.data.every((result) => result.status === fileScanStatus.CLEAN)) {
          callMainAPI();
        } else {
          // If files are Corrupted show toast message
          handleCorruptedFiles({ finalScanStatus });
          onError();
        }
      } else {
        callMainAPI();
      }
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const updateTeam = (data, onSuccess) => async (dispatch) => {
  dispatch(updateTeamRequest());
  try {
    const callMainAPI = async () => {
      const res = await updateTeamService(data);
      dispatch(updateTeamSuccess(res.data.data));
      onSuccess();
    };
    if (data?.team_logo) {
      const finalScanStatus = await handleScanFiles({
        fileKeys: [{ file_name: 'Team logo', file_key: data?.team_logo }],
        isPrivate: false,
      });

      if (finalScanStatus.data.data.every((result) => result.status === fileScanStatus.CLEAN)) {
        callMainAPI();
      } else {
        // If files are Corrupted show toast message
        handleCorruptedFiles({ finalScanStatus });
        dispatch(updateTeamFailure());
      }
    } else {
      callMainAPI();
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
export { createTeam, getTeams, getWhoInvited, updateTeam };
