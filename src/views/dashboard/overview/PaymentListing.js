/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardText } from 'reactstrap';

import ActiveProjectsEmptyGif from '@src/assets/images/GetStarted.gif';
import UpcomingProjectsEmptyGif from '@src/assets/images/emptyGif.gif';
import PaymentsEmptyGif from '@src/assets/images/no-payments.gif';
import CardSkeleton from '@src/assets/images/gifs/card_loader.gif';

import { ProjectWrapper, ProjectsListingWrap } from './style';
import Slider from '../../../lib/slider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useIsTab, returnDetailsForMarketPlace, calculateRemainingBidsCount } from '../../../utility/Utils';

import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import { getDashboardUpcomingPayments } from '../../../redux/actions/dashboardActions';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';
import UpcomingPaymentsCard from './UpcomingPaymentsCard';
import { clearUpcomingPayments } from '../../../redux/reducers/milestonePayment';
import Tag from '../../../@core/components/tags';
import ViewAllCard from './ExtraCardWithCount';
import { AccordionName } from './DashboardConstant';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';

const Empty = ({ active, recommended, payment, isEducationNotCompleted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);
  const dispatch = useDispatch();

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path, {
      state: { isEditing: true },
    });
  };
  return (
    <ProjectWrapper>
      <Card className="empty-card">
        <CardBody className="empty empty-h-25">
          <div>
            {active && <img src={ActiveProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {recommended && <img src={UpcomingProjectsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {payment && <img src={PaymentsEmptyGif} className="empty-gif" alt="empty-gif" />}
            {active && (
              <CardText className="get-started">
                Lets get you <br /> started!
              </CardText>
            )}
            {payment && (
              <CardText className="font-weight-normal get-started">
                No Upcoming <br /> Payment
              </CardText>
            )}
          </div>
          {active && (
            <div
              onClick={() => {
                if (!isDisabled) {
                  navigate('/marketplace/all_listings');
                  dispatch(setActiveNavTab('marketplace'));
                }
              }}
              className={`font-weight-normal text-center text-primary project-cta mt-25  ${
                isDisabled ? 'text-muted cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              Explore Projects
            </div>
          )}
          {isEducationNotCompleted && recommended ? (
            <div
              onClick={() =>
                onAddDetailsClick(
                  returnDetailsForMarketPlace(userDetailsData?.user_type, profilePercentageData?.values_missing)?.path,
                )
              }
              className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
            >
              Complete your profile <br /> to get started!
            </div>
          ) : recommended ? (
            <>
              {userDetailsData?.user_type === userTypes.client ? (
                <div
                  onClick={() => navigate('/create-project')}
                  className="font-weight-normal text-center text-primary project-cta mt-25 cursor-pointer"
                >
                  Create Project
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (!isDisabled) {
                      navigate('/marketplace/all_listings');
                      dispatch(setActiveNavTab('marketplace'));
                    }
                  }}
                  className={`font-weight-normal text-center text-primary project-cta mt-25  ${
                    isDisabled ? 'text-muted cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  Explore Projects
                </div>
              )}
            </>
          ) : (
            ''
          )}
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

const PaymentListing = () => {
  const [open, setOpen] = useState('1');
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
  };

  const userDetailsData = useSelector(selectUserData);

  const upcomingPaymentData = useSelector((state) => state?.dashboard?.upcomingPaymentsData);
  const upcomingPaymentDataLoading = useSelector((state) => state?.dashboard?.upcomingPaymentDataLoading);

  const handleViewAll = (e) => {
    e.stopPropagation();
    navigate('/marketplace/all_listings', { state: { isRecommended: true } });
    dispatch(setActiveNavTab('marketplace'));
  };
  const [isSliderLoading, setIsSliderLoading] = useState(false);
  useEffect(() => {
    setIsSliderLoading(true);
    setTimeout(() => {
      setIsSliderLoading(false);
    }, 1000);
  }, [open]);

  useEffect(() => {
    dispatch(clearUpcomingPayments());
    dispatch(getDashboardUpcomingPayments());
  }, []);

  return (
    <Accordion className="accordion-margin" open={open} toggle={toggle}>
      {userDetailsData?.user_type === userTypes.team ? null : (
        <AccordionItem>
          <AccordionHeader targetId="4">
            Upcoming Payments
            <Tag
              hasNew={upcomingPaymentData?.unreadCount > 0 ? upcomingPaymentData?.unreadCount : false}
              count={upcomingPaymentData?.metadata?.total_records}
            />
          </AccordionHeader>
          <AccordionBody accordionId="4">
            {isSliderLoading || upcomingPaymentDataLoading ? (
              <div style={{ height: '250px' }} className="d-flex justify-content-center gap-1">
                <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
                <img style={{ width: '28%', flex: 1 }} src={CardSkeleton} alt="...Loading" />
              </div>
            ) : (
              <ProjectsListingWrap>
                {upcomingPaymentData?.data?.length > 0 && isTab ? (
                  upcomingPaymentData?.data?.map((project) => (
                    <UpcomingPaymentsCard accordionName={AccordionName.payments} key={project._id} data={project} />
                  ))
                ) : upcomingPaymentData?.data?.length > 0 ? (
                  <>
                    {upcomingPaymentData?.data?.length >= 4 ? (
                      <Slider {...settings}>
                        {upcomingPaymentData?.data?.map((project, index) => (
                          <UpcomingPaymentsCard
                            accordionName={AccordionName.payments}
                            className={`slide-${index}`}
                            key={project._id}
                            data={project}
                          />
                        ))}

                        {upcomingPaymentData?.metadata?.total_records > 10 && (
                          <ViewAllCard
                            accordionName={AccordionName.payments}
                            height={332}
                            width={250}
                            onViewAll={handleViewAll}
                            count={calculateRemainingBidsCount(upcomingPaymentData)}
                          />
                        )}
                      </Slider>
                    ) : (
                      <div className="custom-slider-wrap">
                        {upcomingPaymentData?.data?.map((project) => (
                          <UpcomingPaymentsCard
                            accordionName={AccordionName.payments}
                            className="custom-slider-project"
                            key={project._id}
                            data={project}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Empty active={false} recommended={false} payment />
                )}
              </ProjectsListingWrap>
            )}
          </AccordionBody>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default PaymentListing;

Empty.propTypes = {
  active: Proptypes.bool,
  recommended: Proptypes.bool,
  payment: Proptypes.bool,
  isEducationNotCompleted: Proptypes.bool,
};

Empty.defaultProps = {
  active: false,
  recommended: false,
  payment: false,
  isEducationNotCompleted: false,
};
