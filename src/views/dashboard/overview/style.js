import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import { CardWrapper } from '../../styled';

const RewardCardWrapper = styled(CardWrapper)`
  .reward-body {
    padding: 0.5rem 1.5rem 1rem 1.8rem !important;
  }
  .avatar {
    cursor: auto;
  }
  .card-reward {
    min-height: 191.95px;
    p {
      line-height: inherit;
    }
    .avatar {
      padding: 0.5rem;
    }
    @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
      .reward-comp {
        gap: 12px;
      }
      .earn-more {
        margin-top: 52px;
      }
    }
    @media only screen and (max-device-width: 450px) {
      .reward-comp {
        gap: 12px;
      }
    }
  }
`;

const EarningCardWrapper = styled(CardWrapper)`
  .earning-head {
    padding: 1.5rem 1.5rem 0.8rem 1.5rem;
  }
  .earning-body {
    padding: 0rem 1.5rem 1rem !important;
  }
  .button-grp {
    .btn-outline-primary {
      border: 1px solid ${theme.blueBorderColor} !important;
    }
    .btn-outline-primary:not(:disabled):not(.disabled).active {
      backgorund-color: rgba(1, 133, 228.5);
    }
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    width: fit-content;
  }
  .card-amount-details {
    @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
      flex-direction: column;
      gap: 8px;
    }
    @media only screen and (max-device-width: 450px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }
`;

const TimeCardWrapper = styled(CardWrapper)`
  .card-body {
    padding: 0.5rem 1.6rem 1rem 1.7rem !important;
  }
  .time-card {
    min-height: 191.95px;
    .card-body {
      font-size: 13.5px;
    }
  }
`;

const AlertCardWrapper = styled(CardWrapper)`
  .card .card {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    margin: 0 1.5rem 1.5rem;
  }
  .card-header {
    padding: 1.6rem 1.5rem;
  }
  .card-body {
    padding: 0.5rem 1.5rem 1rem !important;
  }
  .card-inside {
    .card-header {
      padding: 1.2rem 1.2rem;
    }
    .card-body {
      padding: 0.5rem 1.2rem 1rem !important;
    }
  }

  .add-det {
    font-weight: 400;
    font-size: 16px;
  }

  .percentage {
    font-weight: bold;
    font-size: 20px;
  }

  .no-meetings-gif {
    height: 10vw;
  }
  .relative-time {
    width: 30%;
    text-align: end;
  }
  .additional-text {
    color: ${theme.lightBlueColor};
    font-weight: 600;
    font-size: 12px;
    margin: auto;
  }
`;

const EarningAmount = styled.div`
  background: ${theme.bodyBgColor};
  border-radius: 6px;
  min-width: 135px;
  padding: 0.4rem 1.7rem;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: ${theme.grayTitleColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .amount {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 23px;
    text-align: center;
    color: ${theme.bodyColor};
    word-break: break-all;
  }
  .change {
    margin-top: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.green};
  }
`;

const ProjectWrapper = styled.div`
  @media (max-width: 768px) {
    min-width: 20rem;
  }
  .row {
    margin: 0;
    > * {
      padding: 0;
    }
  }
  .card-body {
    padding: 1.4rem 1rem 0.75rem;
    .bg-light-success {
      font-weight: 400;
    }
    .card-title {
      font-weight: 400;
      color: ${theme.headingTextColor};
      font-size: 16px;
      line-height: 20px;
    }
    .card-text {
      font-weight: 300;
      font-size: 14px;
      color: ${theme.headingTextColor};
      line-height: 18px;
    }
  }

  .truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .truncate-1 {
    height: 1.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-section {
    .rounded {
      border-radius: 16px !important;
      padding: 0.3rem 0.6rem;
    }
    .light-client {
      background-color: #e0ecff !important;
      color: #005eff;
    }
    .client-badge {
      padding: 5px 6px 2px 6px;
      background-color: #feffb8 !important;
      border-radius: 50%;
      margin-top: -2px;
      margin-left: 4px;
    }
    width: 50%;
    color: ${theme.headingTextColor};
    .avatar-wrap {
      .avatars {
        display: flex;
        gap: 6px;
        align-items: center;
      }
    }
  }

  .active-project-title {
    height: 40px;
  }
  .active-project-users {
    height: 36px;
  }
  .main-row {
    display: flex;
    gap: 12px;
  }
  .project-cta {
    font-weight: 400;
    font-size: 16px;
  }

  .empty-card {
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: fit-content;
  }

  .empty {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .get-started {
      margin-top: -2rem;
      font-size: 18px;
      line-height: 24px;
      color: #2963c3;
      font-weight: 500;
      text-align: center;
    }
    .empty-gif {
      height: 15rem;
    }
  }
  .empty-h-25 {
    height: 25.5rem;
  }

  .card-app-design {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .circular-progressbar-container {
    width: 40px;
    height: 40px;
    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }
  .circular-progressbar-container-large {
    width: 60px;
    height: 60px;
    margin: auto;
    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }

  .additional-text {
    color: ${theme.lightBlueColor};
    font-weight: 600;
    font-size: 12px;
    margin: auto;
  }
`;

const ProjectsListingWrap = styled.div`
  .slide-0 {
    .card-app-design {
      margin-left: 0.5rem;
    }
  }
  .custom-slider-wrap {
    display: flex;
    gap: 1rem;
    .custom-slider-project {
      width: 32%;
    }
  }
  .slick-track {
    display: flex;
    gap: 1rem;
    left: -12px !important;
  }
  .slick-slider {
    display: flex;
  }

  .right-icon {
    max-height: 25px;
    min-width: 25px;
    background: aquamarine;
    padding: 5px 8px;
    border-radius: 50%;
  }
  .left-icon {
    max-height: 25px;
    min-width: 25px;
    background: aquamarine;
    padding: 5px 8px;
    border-radius: 50%;
  }

  .slick-next {
    right: 0 !important;
    &:before {
      font-size: 30px;
      line-height: 1;
      color: #0185e44a;
    }
  }
  .slick-prev {
    left: -9px !important;
    z-index: 1;
    &:before {
      font-size: 30px;
      line-height: 1;
      color: #0185e44a;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    gap: 10px;
    overflow-y: scroll;
  }
`;

const DashboardHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: -4rem;

  @media (max-width: 767px) {
    margin-top: -2rem;
  }
`;

const TagsWrap = styled.div`
  // height: ${(props) => (props.fullWidth ? 'auto' : '60px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  width: ${(props) => (props.fullWidth ? '100%' : '75%')} !important;
  margin: ${(props) => (props.fullWidth ? '0 0 0.75rem 0' : '0.5rem 0 0 10px')};

  .badge-box-wrap {
    max-height: 2rem;
    overflow: hidden;
    width: 100%;
    .badge {
      margin: 0 0.5rem 0.5rem 0;
      font-size: 0.75rem;
      max-width: ${(props) => (props.fullWidth ? '15rem' : '10rem')};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .bg-secondary {
    background-color: ${theme.lightBlueBgColor} !important;
    color: ${theme.lightBlueColor} !important;
  }

  .tag-margin {
    margin-right: 10px;
    margin-bottom: 10px;
    :last-child {
      margin-right: 0px;
    }
  }

  .additional-text {
    color: ${theme.lightBlueColor};
    font-weight: 600;
    font-size: 12px;
    margin: auto;
  }
`;
const CreateTeamButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: -3.5rem;

  @media (max-width: 767px) {
    margin-top: -2rem;
  }
`;

const TeamSectionWrapper = styled(CardWrapper)`
  .card-header {
    padding: 1.6rem 1.5rem;
  }
  .card-body {
    padding: 0.5rem 1.5rem 1rem !important;
  }
  .card-title {
    font-size: 1.125rem;
  }
  .members-count {
    margin-left: 0.75rem;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;

const DisputesLegend = styled.div`
  width: 16px;
  height: 6px;
  border-radius: 5px;
  background: ${(props) => props.fillColor};
`;

const DisputesChartContainer = styled.div`
  position: relative;

  .total-disputes {
    position: absolute;
    top: 32%;
    left: 37%;
  }
`;

export {
  TagsWrap,
  CardWrapper,
  EarningAmount,
  EarningCardWrapper,
  RewardCardWrapper,
  TimeCardWrapper,
  ProjectWrapper,
  ProjectsListingWrap,
  AlertCardWrapper,
  DashboardHeaderWrapper,
  TeamSectionWrapper,
  CreateTeamButtonWrapper,
  DisputesLegend,
  DisputesChartContainer,
};
