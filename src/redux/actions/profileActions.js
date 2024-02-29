import ShowToastMessage from '../../@core/components/toast';
import {
  getClientService,
  getRecentProjectService,
  getReviewService,
  getTalentService,
  makeFavService,
  publicTeamMembersService,
  removeFavService,
  reportService,
} from '../../services/profileServices';
import { getTeamById } from '../../services/teamServices';
import { userTypes } from '../../utility/constants/Constant';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import errorHandler from '../../utility/errorHandler';
import {
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  getRecentProjectFailure,
  getRecentProjectRequest,
  getRecentProjectSuccess,
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess,
  makeFavSuccess,
  publicTeamMembersFailure,
  publicTeamMembersRequest,
  publicTeamMembersSuccess,
  removeFavSuccess,
  reportFailure,
  reportRequest,
  reportSuccess,
} from '../reducers/profile';
import { getRequestStatus } from './inviteTalent';

const getProfile =
  ({ id, user_type, isEditable, currentUserType }) =>
  async (dispatch) => {
    dispatch(getProfileRequest());
    let res;
    try {
      if (user_type === userTypes.talent) {
        res = await getTalentService(id);
      }
      if (user_type === userTypes.client) {
        res = await getClientService(id);
      }
      if (user_type === userTypes.team) {
        res = await getTeamById(id);
      }
      if (res.data.data.user_type !== userTypes.client && currentUserType !== userTypes.client && !isEditable) {
        dispatch(
          getRequestStatus({
            entity_type: res.data.data?.user_type,
            entity_id: res.data.data?.user_id || res.data.data?._id,
          }),
        );
      }
      dispatch(getProfileSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getProfileFailure);
    }
  };
// eslint-disable-next-line import/prefer-default-export

const makeFavourite = (id, user_type) => async (dispatch) => {
  try {
    await makeFavService(id, user_type);
    dispatch(makeFavSuccess(id));
  } catch (error) {
    errorHandler(error);
  }
};
const removeFavourite = (id) => async (dispatch) => {
  try {
    await removeFavService({ user_id: id });
    dispatch(removeFavSuccess(id));
  } catch (error) {
    errorHandler(error);
  }
};

const getRecentProjects =
  ({ user_id, entity, metadata }) =>
  async (dispatch) => {
    if (metadata?.page === 1) {
      dispatch(getRecentProjectRequest());
    }
    try {
      const res = await getRecentProjectService({ user_id, entity, metadata });
      dispatch(getRecentProjectSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getRecentProjectFailure);
    }
  };

const getReview =
  ({ user_id, entity, metadata }) =>
  async (dispatch) => {
    if (metadata?.page === 1) {
      dispatch(getReviewRequest());
    }
    try {
      const res = await getReviewService({ user_id, entity, metadata });
      dispatch(getReviewSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getReviewFailure);
    }
  };

const reportProfile = (data, onSuccess) => async (dispatch) => {
  dispatch(reportRequest());
  try {
    const res = await reportService(data);
    dispatch(reportSuccess(res.data.data));
    onSuccess();
    ShowToastMessage(SUCCESS, res.data.data.message);
  } catch (error) {
    errorHandler(error, reportFailure);
  }
};

const getPublicTeamMembers =
  ({ teamId, page, pageSize, oldData }) =>
  async (dispatch) => {
    if (page === 1) {
      dispatch(publicTeamMembersRequest());
    }
    try {
      const res = await publicTeamMembersService(teamId, page, pageSize);
      dispatch(publicTeamMembersSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
    } catch (error) {
      errorHandler(error, publicTeamMembersFailure);
    }
  };

export {
  getProfile,
  makeFavourite,
  removeFavourite,
  getRecentProjects,
  getReview,
  reportProfile,
  getPublicTeamMembers,
};
