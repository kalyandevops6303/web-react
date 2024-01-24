// ** React Imports
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Third Party Components
import Proptypes from 'prop-types';
import { Home } from 'react-feather';

// ** Reactstrap Imports
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import theme from '../../../configs/themeVariables';

const BreadCrumbs = (props) => {
  // ** Props
  const { data } = props;

  const renderBreadCrumbs = () => {
    return data.map((item, index) => {
      const Wrapper = item.link ? Link : Fragment;
      const isLastItem = data.length - 1 === index;
      if (!item.title) {
        return null;
      }
      return (
        <BreadcrumbItem
          tag="li"
          key={index}
          active={!isLastItem}
          className="text-capitalize"
          // className={isLastItem ? 'text-primary' : 'body-color'}
        >
          <Wrapper {...(item.link?.length > 0 ? { to: item.link } : {})}>{item.title}</Wrapper>
        </BreadcrumbItem>
      );
    });
  };

  return (
    <div className="content-header row" style={{ display: 'contents' }}>
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/dashboard">
                    <Home className="mb-25" color={theme.activeColor} size={14} />
                  </Link>
                </BreadcrumbItem>
                {renderBreadCrumbs()}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  title: Proptypes.string.isRequired,
  data: Proptypes.arrayOf(
    Proptypes.shape({
      link: Proptypes.string,
      title: Proptypes.string.isRequired,
    }),
  ),
};
