import {
  getCardService,
  getCompletedProjectListingService,
  getDisutedProjectListingService,
  getInvitedProjectListingService,
  getOngoingProjectListingService,
  getTerminatedProjectListingService,
  getUpcomingProjectListingService,
} from '../../services/projectServices';
import {
  getCardInfoErr,
  getCardInfoReq,
  getCardInfoSuccess,
  getListErr,
  getListReq,
  storeSuccessData,
} from '../reducers/project';

import errorHandler from '../../utility/errorHandler';

const getCardInfo =
  ({ onSuccess, onError, userType }) =>
  async (dispatch) => {
    dispatch(getCardInfoReq());
    try {
      const res = await getCardService({ userType });
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoErr);
    }
  };

const getProjectListing =
  ({ data, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (data?.project_filter === 'ONGOING') {
        res = await getOngoingProjectListingService({ data, metaData });
      } else if (data?.project_filter === 'COMPLETED') {
        res = await getCompletedProjectListingService({ data, metaData });
      } else if (data?.project_filter === 'UPCOMING') {
        res = await getUpcomingProjectListingService({ data, metaData });
      } else if (data?.project_filter === 'DISPUTED') {
        res = await getDisutedProjectListingService({ data, metaData });
      } else if (data?.project_filter === 'TERMINATED') {
        res = await getTerminatedProjectListingService({ data, metaData });
      } else if (data?.project_filter === 'INVITED') {
        res = await getInvitedProjectListingService({ data, metaData });
      }
      // res = await getProjectListingService({ data, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

export { getCardInfo, getProjectListing };
