import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import MilestonePaymentBox from './MilestonePaymentBox';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { getMilestonePaymentListing } from '../../../redux/actions/milestonePaymentActions';
import MakePaymentModal from '../../modals/MakePaymentModal';
import { clearPaymentListingData } from '../../../redux/reducers/milestonePayment';
import { PAYMENT_STATUS } from '../../../utility/constants/Constant';

function MilestonePaymentListing() {
  const [selectedMilestones, setSelectedMilestones] = useState([]);
  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [selectedAndDisabledPaymentId, setSelectedAndDisabledPaymentId] = useState([]);

  const projectDetailsData = useSelector(projectDetails);
  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const milestoneDataLoading = useSelector((state) => state.milestonePayment?.listLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPaymentListingData());
  }, []);

  useEffect(() => {
    if (projectDetailsData?._id) {
      dispatch(getMilestonePaymentListing(projectDetailsData?._id, () => {}));
    }
  }, [projectDetailsData?._id]);

  const handleMilestoneSelect = (evt, id) => {
    const isSelected = selectedMilestones.find((item) => item === id);
    if (isSelected) {
      const newArray = selectedMilestones.filter((item) => item !== id);
      setSelectedMilestones(newArray);
    } else {
      setSelectedMilestones((prev) => [...prev, id]);
    }
  };

  const handleSelectedMilestonePayment = () => {
    setMakePaymentModal(true);
  };

  const handleCancel = () => {
    setMakePaymentModal(false);
  };

  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  const isFirstTwoMilestonePaid =
    isPaymentDone(milestoneData?.length > 0 && milestoneData[0]) ||
    isPaymentDone(milestoneData?.length > 0 && milestoneData[1]);

  const isAllMilestonePaid = milestoneData?.every(
    (mile) => mile.payment_status === PAYMENT_STATUS.PAID || mile.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL,
  );

  const isDisabled = () => {
    if (selectedMilestones.length === 0) {
      return true;
    }
    if (milestoneData?.length === 1) return false;
    if (!isFirstTwoMilestonePaid && selectedMilestones?.length < 2) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (milestoneData && !isAllMilestonePaid) {
      if (milestoneData?.length > 2) {
        const firstMilestone = milestoneData[0];
        const secondMilestone = milestoneData[1];

        const isFirstAndSecondMilestonePaid = isPaymentDone(firstMilestone) && isPaymentDone(secondMilestone);

        if (!isFirstAndSecondMilestonePaid) {
          setSelectedMilestones([firstMilestone._id, secondMilestone._id]);
          setSelectedAndDisabledPaymentId([firstMilestone._id, secondMilestone._id]);
        } else {
          const firstNotPaidMilestoneInTheList = milestoneData.find((mile) => !isPaymentDone(mile));
          setSelectedMilestones([firstNotPaidMilestoneInTheList._id]);
          setSelectedAndDisabledPaymentId([firstNotPaidMilestoneInTheList._id]);
        }
      } else if (milestoneData?.length === 2) {
        const firstMilestone = milestoneData[0];
        const secondMilestone = milestoneData[1];

        const isFirstAndSecondMilestonePaid = isPaymentDone(firstMilestone) && isPaymentDone(secondMilestone);

        if (!isFirstAndSecondMilestonePaid) {
          setSelectedMilestones([firstMilestone._id, secondMilestone._id]);
          setSelectedAndDisabledPaymentId([firstMilestone._id, secondMilestone._id]);
        }
      } else {
        const firstMilestone = milestoneData[0];

        if (!isPaymentDone(firstMilestone)) {
          setSelectedMilestones([firstMilestone._id]);
          setSelectedAndDisabledPaymentId([firstMilestone._id]);
        }
      }
    }
  }, [milestoneData]);

  return (
    <div className="mt-2">
      {makePaymentModal && (
        <MakePaymentModal
          modal={makePaymentModal}
          toggleModal={handleCancel}
          selectedMilestoneIds={selectedMilestones}
          selectedAndDisabledPaymentId={selectedAndDisabledPaymentId}
        />
      )}
      {milestoneDataLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {milestoneData?.length > 0 && <h4 className="mb-1">Milestone Payment</h4>}
          {milestoneData?.length > 0 &&
            milestoneData?.map((milestone) => (
              <MilestonePaymentBox
                key={milestone._id}
                id={milestone._id}
                milestoneName={milestone.name}
                payableAmount={milestone.estimated_cost}
                paymentStatus={milestone.payment_status}
                checked={selectedMilestones.includes(milestone._id)}
                onSelect={!selectedAndDisabledPaymentId?.includes(milestone?._id) && handleMilestoneSelect}
              />
            ))}
          {milestoneData?.length > 0 && (
            <div className="d-flex justify-content-end">
              {!isAllMilestonePaid ? (
                <Button color="primary" onClick={handleSelectedMilestonePayment} disabled={isDisabled()}>
                  Make Payment
                </Button>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MilestonePaymentListing;
