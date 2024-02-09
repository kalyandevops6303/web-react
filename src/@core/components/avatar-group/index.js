/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
// ** React Imports
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

// ** Third Party Components
import Proptypes from 'prop-types';
import classnames from 'classnames';

// ** Reactstrap Imports
import { CardText, UncontrolledTooltip } from 'reactstrap';

// ** Custom Components Imports
import Avatar from '@components/avatar';

const AvatarGroup = (props) => {
  // ** Props
  const { tag, className, size, totalCount } = props;

  // ** Conditional Tag
  const Tag = tag || 'div';

  const navigate = useNavigate();

  const handleProfileNavigate = (evt, item) => {
    evt.stopPropagation();
    if (item?.user_id?.length > 0 && item?.user_type?.length > 0) {
      navigate(`/profile/${item?.user_type}/${item?.user_id}`);
    }
  };
  // ** Render Data
  const renderData = () =>
    props?.data?.map((item, i) => {
      const ItemTag = item.tag || 'div';
      const tooltipId = item?.tooltipId ?? item.title?.split(' ').join('-');
      return (
        <Fragment key={i}>
          {tooltipId ? (
            <UncontrolledTooltip placement={item.placement} target={tooltipId}>
              {item.title}
            </UncontrolledTooltip>
          ) : null}
          {!item.meta ? (
            <Avatar
              size={size}
              tag={ItemTag}
              className={classnames('pull-up', {
                [item.className]: item.className,
              })}
              {...(item.title ? { id: tooltipId } : {})}
              {...item}
              title={undefined}
              meta={undefined}
              onClick={(evt) => handleProfileNavigate(evt, item)}
            />
          ) : null}
          {item.meta ? <ItemTag className="d-flex align-items-center ps-1">{item.meta}</ItemTag> : null}
        </Fragment>
      );
    });

  if (props?.data && props?.data.length > 0) {
    return (
      <Tag
        className={classnames('avatar-group', {
          [className]: className,
        })}
      >
        {props?.data && renderData()}
        {totalCount && <CardText className="d-flex align-items-center ps-50"> + {totalCount - 3}</CardText>}
      </Tag>
    );
  }
  return null;
};

export default AvatarGroup;

// ** PropTypes
AvatarGroup.propTypes = {
  data: Proptypes.array.isRequired,
  tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
};
