import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Proptypes from 'prop-types';

import theme from '../../../configs/themeVariables';
import MilestoneDetailsTab from './MilestoneDetailsTab';
import PayHistory from './PayHistory';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import TeamPayments from './TeamPayments';
import { milestoneTransactionsService } from '../../../services/projectMilestoneService';
import MilestonePayment from './MilestonePayment';

const TabWrapper = styled.div`
  /* Style the tab */
  .tab {
    overflow: hidden;
    display: flex;
    gap: 2rem;
    margin-bottom: 26px;
    border-bottom: 1px solid #ccc;
  }

  .gap-5 {
    gap: 5rem;
  }

  /* Style the buttons inside the tab */
  .tablink {
    cursor: pointer;
    padding: 16px 8px;
    font-size: 16px;
  }

  .active-tablink {
    border-bottom: 2px solid ${theme.activeNavPillText};
    color: ${theme.activeNavPillText};
    font-weight: 600;
  }

  .color-primary {
    color: ${theme.primary} !important;
  }
  .color-danger {
    color: ${theme.errorColor} !important;
  }

  .tabcontent {
    display: none;
    padding: 6px 12px;
  }

  .active-tabcontent {
    display: block !important;
  }

  .gray-card {
    padding: 36px;
    background: #fafafa !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .white-card {
    background: #fff;
    padding: 26px;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06) !important;
  }

  .medium-shadow {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06) !important;
  }

  .py-16 {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .role-text {
    color: ${theme.gray};
    font-size: 12px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .table {
    background: #fff;
    border: solid 1px #e9ecef;
  }

  hr {
    width: 100%;
  }

  .raise-dispute-btn {
    color: ${theme.errorColor} !important;
    border: none !important;
    background: none !important;
    padding: 11px 20px !important;
  }
  .raise-dispute-btn:hover {
    box-shadow: none !important;
  }
  .raise-dispute-btn:active,
  .raise-dispute-btn:focus {
    background: none !important;
  }
`;

const MilestoneOverview = ({ selectedMilestone, fetchProjectMilestones, milestonesData, selectedMilestoneIndex }) => {
  const [tab, setTab] = useState('Details');
  const [transactions, setTransactions] = useState([]);
  const [teamPayments, setTeamPayments] = useState([]);

  const userDataLocal = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    if (projectDetailsData?._id) {
      milestoneTransactionsService(projectDetailsData._id).then((res) => {
        let payments = [];
        if (res.data.data.pay_outs) {
          payments = res.data.data.pay_outs.map((item) => item?.[Object.keys(item)?.[0]]?.[0]);
        }
        if (res.data.data.my_payments) {
          res.data.data.my_payments.forEach((item) => {
            if (item?.[Object.keys(item)?.[0]]?.[0]) {
              payments.push(item?.[Object.keys(item)?.[0]]?.[0]);
            }
          });
        }
        if (res.data.data.team_payments) {
          setTeamPayments(res.data.data.team_payments);
        }
        setTransactions(payments);
      });
    }
  }, [projectDetailsData?._id]);

  return (
    <TabWrapper>
      <div className="tab">
        <div
          className={`tablink ${tab === 'Details' ? 'active-tablink' : ''}`}
          onClick={() => {
            setTab('Details');
          }}
        >
          Details
        </div>
        <div
          className={`tablink ${tab === 'Pay Outs' ? 'active-tablink' : ''}`}
          onClick={() => {
            setTab('Pay Outs');
          }}
        >
          {userDataLocal.user_type === userTypes.client ? 'Pay Outs' : 'My Payments'}
        </div>
        {userDataLocal.user_type === userTypes.client ? null : (
          <div
            className={`tablink ${tab === 'Team Payments' ? 'active-tablink' : ''}`}
            onClick={() => {
              setTab('Team Payments');
            }}
          >
            Team Payments
          </div>
        )}
      </div>

      <div className={`tabcontent ${tab === 'Details' ? 'active-tabcontent' : ''}`}>
        <MilestoneDetailsTab fetchProjectMilestones={fetchProjectMilestones} selectedMilestone={selectedMilestone} />
      </div>

      <div className={`tabcontent ${tab === 'Pay Outs' ? 'active-tabcontent' : ''}`}>
        <PayHistory transactions={transactions} />
        <MilestonePayment transactions={transactions} />
      </div>
      {userDataLocal.user_type === userTypes.client ? null : (
        <div className={`tabcontent ${tab === 'Team Payments' ? 'active-tabcontent' : ''}`}>
          <TeamPayments
            selectedMilestoneIndex={selectedMilestoneIndex}
            milestonesData={milestonesData}
            teamPayments={teamPayments}
          />
        </div>
      )}
    </TabWrapper>
  );
};
MilestoneOverview.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
  milestonesData: Proptypes.arrayOf(Proptypes.object).isRequired,
  selectedMilestoneIndex: Proptypes.number.isRequired,
};

export default MilestoneOverview;
