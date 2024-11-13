import { Check } from 'react-feather';

export default function FeedbackCompleted() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row justify-between items-center px-6 py-5 bg-success bg-opacity-[0.12] rounded-md">
        <div className="flex flex-row items-center gap-x-3">
          <span className="text-center align-middle bg-success rounded-full p-[5px]">
            <Check size={15} className="text-white" />
          </span>
          <div className="text-success text-base not-italic font-semibold leading-6">Team Feedback Completed</div>
        </div>
        <span className="text-trublue-secondary-500 text-base not-italic font-medium cursor-pointer">View</span>
      </div>
    </div>
  );
}
