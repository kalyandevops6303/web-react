import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import MilestonePaymentBox from './MilestonePaymentBox';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { getMilestonePaymentListing } from '../../../redux/actions/milestonePaymentActions';

function MilestonePaymentListing() {
  const [selectedMilestone, setSelectedMilestone] = useState([]);

  const projectDetailsData = useSelector(projectDetails);
  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneDetails);
  const milestoneDataLoading = useSelector((state) => state.milestonePayment?.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMilestonePaymentListing(projectDetailsData?._id, () => {}));
  }, [projectDetailsData?._id]);

  const handleMilestoneSelect = (evt, id) => {
    const isSelected = selectedMilestone.find((item) => item === id);
    if (isSelected) {
      const newArray = selectedMilestone.filter((item) => item !== id);
      setSelectedMilestone(newArray);
    } else {
      setSelectedMilestone((prev) => [...prev, id]);
    }
  };

  const handleSelectedMilestonePayment = () => {};
  return (
    <div className="mt-2">
      {milestoneDataLoading ? (
        <div>
          <Spinner size="sm" color="light-success" className="d-flex align-items-center" />
        </div>
      ) : (
        <>
          <h4 className="mb-1">Milestone Payment</h4>
          {milestoneData?.length > 0 &&
            milestoneData?.map((milestone) => (
              <MilestonePaymentBox
                key={milestone._id}
                id={milestone._id}
                milestoneName={milestone.name}
                payableAmount={milestone.estimated_cost}
                paymentStatus={milestone.payment_status}
                checked={selectedMilestone.includes(milestone._id)}
                onSelect={handleMilestoneSelect}
              />
            ))}
          <div className="d-flex justify-content-end">
            <Button color="primary" onClick={handleSelectedMilestonePayment}>
              Make Payment
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MilestonePaymentListing;
