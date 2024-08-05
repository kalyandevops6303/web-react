// ** Third Party Components
import Proptypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

const DisputesTimeline = (props) => {
  // ** Props
  const { data, tag, className } = props;

  // ** Custom Tagg
  const Tag = tag ? tag : 'ul';

  const TimelineWrap = styled.div`
    > .timeline-point-indicator {
      border: 0;
      background-color: ${(props) => props.color} !important;
      opacity: ${(props) => (props.isDisabled ? '0.8' : '')};
      &:before {
        background: ${(props) => props.color} !important;
        opacity: 0.2;
      }
    }
  `;

  return (
    <Tag
      className={classnames('timeline', {
        [className]: className,
      })}
    >
      {data?.map((item, i) => {
        const ItemTag = item.tag ? item.tag : 'li';

        return (
          <ItemTag
            key={i}
            className={classnames('timeline-item', {
              [item.className]: className,
            })}
          >
            <TimelineWrap color={item.color} isDisabled={item.isDisabled}>
              <span
                className={classnames('timeline-point', {
                  [`timeline-point-${item.color}`]: item.color,
                  'timeline-point-indicator': !item.icon,
                })}
              >
                {item.icon ? item.icon : null}
              </span>
              <div className="timeline-event pe-1">{item.customContent ? item.customContent : null}</div>
            </TimelineWrap>
          </ItemTag>
        );
      })}
    </Tag>
  );
};

export default DisputesTimeline;

// ** PropTypes
DisputesTimeline.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired,
};
