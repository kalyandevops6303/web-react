import BoxSkeleton from '../../../core/skeletons/BoxSkeleton';

const MilestoneFeedbackStatusLoader = () => {
  return (
    <div className="bg-grey-50/10 min-h-[calc(100vh-70px)]">
      <div className="py-12 flex flex-col gap-12 w-full max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <BoxSkeleton className="h-8 w-80 mb-2" /> {/* Project Name */}
            <BoxSkeleton className="h-4 w-48" /> {/* Milestone ID */}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* Back Button */}
          <BoxSkeleton className="h-8 w-32" />
          {/* Feedback Form */}
          <div className="rounded-xl bg-grey-50/10 p-6">
            <BoxSkeleton className="h-6 w-40 mb-4" /> {/* Form Title */}
            <div className="space-y-4">
              <BoxSkeleton className="h-24 w-full" /> {/* Text Area */}
              <div className="flex gap-4">
                <BoxSkeleton className="h-10 w-24" /> {/* Submit Button */}
                <BoxSkeleton className="h-10 w-24" /> {/* Cancel Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneFeedbackStatusLoader;
