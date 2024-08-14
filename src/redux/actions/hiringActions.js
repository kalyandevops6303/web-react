import errorHandler from '../../utility/errorHandler';
import { showHiringTabService } from '../../services/hiringServices';
import {
    showHiringTabRequest, 
    showHiringTabSuccess, 
    showHiringTabFailure
} from '../reducers/hiring';

const getShowHiringTab = () => async (dispatch) => {
    dispatch(showHiringTabRequest());
    try {
        const res = await showHiringTabService();
        dispatch(showHiringTabSuccess(res.data.data?.profile_details_present));
    } catch (error) {
        errorHandler(error, showHiringTabFailure);
    }
}


export {
    getShowHiringTab
}