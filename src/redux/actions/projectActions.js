import {
  getCardService,
  getCompletedProjectListingService,
  getDisutedProjectListingService,
  getInvitedProjectListingService,
  getOngoingProjectListingService,
  getProjectsListFlexternService,
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

const serviceMap = {
  ONGOING: getOngoingProjectListingService,
  COMPLETED: getCompletedProjectListingService,
  UPCOMING: getUpcomingProjectListingService,
  DISPUTE: getDisutedProjectListingService,
  TERMINATED: getTerminatedProjectListingService,
  INVITED: getInvitedProjectListingService,
};

const getProjectListing =
  ({ data, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    const { project_filter, project_type } = data;
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      if (project_filter in serviceMap) {
        const res = await serviceMap[project_filter]({
          data: { ...data, project_types: project_type ? [project_type] : [] },
          metaData,
        });
        if (res) {
          dispatch(storeSuccessData(res?.data?.data));
          onSuccess();
        }
      } else {
        throw new Error(`Invalid project filter: ${project_filter}`);
      }
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getProjectsListingFlextern = ({ metaData, onSuccess, onError }) => async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try{
      console.log("metaData", metaData);
      const res = await getProjectsListFlexternService({ metaData });
      console.log(res)
      if (res) {
        dispatch(storeSuccessData(res?.data?.data));
        onSuccess();
      }else {
        throw new Error(`Invalid project filter: ${metaData?.project_status}`);
      }
    }
    catch(error){
      onError();
      errorHandler(error, getListErr);
    }
  };


export { getCardInfo, getProjectListing, getProjectsListingFlextern };
