import { checkReportEntityService, reportEntityService } from '../../services/dashboardServices';
import errorHandler from '../../utility/errorHandler';
import {
  checkReportFailure,
  checkReportRequest,
  checkReportSuccess,
  reportFailure,
  reportRequest,
  reportSuccess,
} from '../reducers/report';

const checkIfReported =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(checkReportRequest());
    try {
      const res = await checkReportEntityService(data);
      dispatch(checkReportSuccess(res.data.data?.has_report_submitted));
      onSuccess();
    } catch (error) {
      errorHandler(error, checkReportFailure);
    }
  };

const reportEntity =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(reportRequest());
    try {
      const res = await reportEntityService(data);
      dispatch(reportSuccess(res.data.data));
      dispatch(
        checkIfReported({
          data: {
            reported_entity_type: data?.support_metadata?.reported_entity_type,
            reported_entity_id: data?.support_metadata?.reported_entity_id,
          },
          onSuccess: checkReportSuccess,
        }),
      );
      onSuccess();
    } catch (error) {
      errorHandler(error, reportFailure);
    }
  };

export { reportEntity, checkIfReported };
