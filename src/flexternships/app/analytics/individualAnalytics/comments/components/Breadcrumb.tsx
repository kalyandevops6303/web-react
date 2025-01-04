import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Home } from 'react-feather';
import theme from '@/configs/themeVariables';
import { useState } from 'react';

const Breadcrumbs = () => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(true);
  };
  return (
    <div className="content-header row" style={{ display: 'contents' }}>
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12 px-0">
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none">
              <Breadcrumb maxItems={3} className="d-flex fs-6 align-items-center p-0 m-0 ">
                <BreadcrumbItem tag="li" className="d-flex align-items-center">
                  <Link to="/dashboard">
                    <Home color={theme.activeColor} size={14} />
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  tag="li"
                  className="text-capitalize d-flex align-items-center justify-content-center breadcrumb-item"
                  style={{ color: '#9E9E9E' }}
                >
                  <Link to="/analytics">Analytics</Link>
                </BreadcrumbItem>
                {showAll ? (
                  <>
                    <BreadcrumbItem
                      tag="li"
                      className="text-capitalize d-flex align-items-center justify-content-center breadcrumb-item"
                      style={{ color: '#9E9E9E' }}
                    >
                      <Link to="/analytics/individual">Individual Analytics</Link>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem
                    tag="li"
                    className="text-capitalize d-flex align-items-center justify-content-center breadcrumb-item"
                    style={{ color: '#9E9E9E', cursor: 'pointer' }}
                    onClick={handleShowAll}
                  >
                    ...
                  </BreadcrumbItem>
                )}
                <BreadcrumbItem
                  tag="li"
                  className="is-active text-capitalize d-flex align-items-center justify-content-center breadcrumb-item"
                  style={{ color: theme.activeColor }}
                >
                  Comments
                </BreadcrumbItem>
                {/* {renderBreadCrumbs()} */}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumbs;
