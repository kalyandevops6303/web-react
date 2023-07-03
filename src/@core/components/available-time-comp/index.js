import { CardText } from 'reactstrap';
import { capitalize } from 'lodash';
import { convertTo12HourFormat } from '../../../utility/Utils';
import { TimeWrapper } from '../../../views/styled';

const AvailableTimeComp = ({ timeZone, weekdaysData, weekendsData }) => {
  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const weekends = ['SATURDAY', 'SUNDAY'];

  return (
    <TimeWrapper>
      {weekdaysData ? (
        <section className="weekdays">
          <CardText>
            {weekdaysData?.days?.length > 0 ? (
              <>
                {convertTo12HourFormat(weekdaysData.start_time)} - {convertTo12HourFormat(weekdaysData.end_time)}{' '}
                {timeZone || ''}
              </>
            ) : (
              <p className="d-inline-block"></p>
            )}
          </CardText>
          <ul>
            {weekdays.map((day) => (
              <li key={day}>
                <span className={`dot ${weekdaysData?.days?.includes(day) ? 'active' : ''}`} />
                {capitalize(day.slice(0, 3))}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="weekdays">
          <CardText>
            <p className="d-inline-block"></p>
          </CardText>
          <ul>
            {weekdays.map((day) => (
              <li key={day}>
                <span className={`dot ${weekdaysData?.days?.includes(day) ? 'active' : ''}`} />
                {capitalize(day.slice(0, 3))}
              </li>
            ))}
          </ul>
        </section>
      )}
      {weekendsData ? (
        <>
          <span className="line" />
          <section className="weekends">
            <CardText>
              {weekendsData?.days?.length > 0 ? (
                <>
                  {convertTo12HourFormat(weekendsData.start_time)} - {convertTo12HourFormat(weekendsData.end_time)}{' '}
                  {timeZone || ''}
                </>
              ) : (
                <p className="d-inline-block"></p>
              )}
            </CardText>
            <ul>
              {weekends.map((day) => (
                <li key={day}>
                  <span className={`dot ${weekendsData?.days?.includes(day) ? 'active' : ''}`} />
                  {capitalize(day.slice(0, 3))}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <>
          <span className="line" />
          <section className="weekends">
            <CardText>
              <p className="d-inline-block"></p>
            </CardText>
            <ul>
              {weekends.map((day) => (
                <li key={day}>
                  <span className={`dot ${weekendsData?.days?.includes(day) ? 'active' : ''}`} />
                  {capitalize(day.slice(0, 3))}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </TimeWrapper>
  );
};

export default AvailableTimeComp;
