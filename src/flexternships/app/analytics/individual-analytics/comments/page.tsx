// React and React Router imports
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// UI Components
import Statbox from '@/flexternships/app/components/pages/analytics/StatBox';
import CommentBox from '@/flexternships/app/components/pages/analytics/CommentBox';
import Spinner from '@/flexternships/app/components/core/Spinner';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import AIGeneratedSummary from '@/flexternships/app/components/core/cards/AIGeneratedSummary';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SingleSelectInput from '@/flexternships/app/components/core/form/SingleSelectInput';

// Icons
import { ArrowLeft, RefreshCcw } from 'react-feather';

// Services
import {
  getFlexternComments,
  getFlexternCommentCount,
  getPaginatedFlexternRoles,
} from '@/flexternships/services/project-details';

// Types
import { FlexternComments } from '@/flexternships/constraints/types/analytics-types';

// Form handling
import { useForm } from 'react-hook-form';
import { getIndividualCommentsSummaryService } from '@/flexternships/services/analytics-service';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';

const Comments = () => {
  const defaultMetadata = {
    currentPage: 0,
    pageSize: 0,
    totalRecords: 0,
    hasNextPage: true,
  };
  const [flexternComments, setFlexternComments] = useState<FlexternComments>({
    comments: [],
    metadata: defaultMetadata,
  });

  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [overallCommentCount, setOverallCommentCount] = useState(0);
  const [projectName, setProjectName] = useState('');

  const [isAiSummaryLoading, setIsAiSummaryLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState('');

  const { control, watch, reset } = useForm({});

  const { userId } = useParams();
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Function to fetch comments based on current metadata state and flextern role filter
  const fetchMoreComments = async (options = { resetPage: false }) => {
    if (!userId) {
      throw new Error('Invalid page url or user id not found');
    }
    if (!projectId) {
      throw new Error('Invalid page url or project id not found');
    }

    // Start loading state
    setIsCommentsLoading(true);

    // Fetch the comments data
    const appRoleId = watch('flexternRole')?._id;
    const currentPage = options.resetPage ? 1 : flexternComments.metadata.currentPage + 1;
    const data = await getFlexternComments(projectId, userId, currentPage, 5, appRoleId);

    // Set the comments, metadata and project name
    setFlexternComments((cur: any) => ({
      metadata: data?.metadata || defaultMetadata,
      comments: options.resetPage ? data?.comments || [] : [...cur.comments, ...(data?.comments || [])],
    }));
    setProjectName(data?.comments[0]?.projectInfo?.name || '');

    // Stop loading state
    setIsCommentsLoading(false);
  };

  // Function to fetch comment count
  const fetchFlexternCommentCount = async () => {
    if (!userId) {
      throw new Error('Invalid page url or user id not found');
    }
    if (!projectId) {
      throw new Error('Invalid page url or project id not found');
    }
    const data = await getFlexternCommentCount(projectId, userId);
    setOverallCommentCount(data?.overall || 0);
  };

  useEffect(() => {
    // Fetch comment count
    fetchFlexternCommentCount();

    // Fetch ai summary
    if (!projectId || !userId) throw new Error('Invalid page url or project id or user id not found');
    const fetchCommentsSummary = async () => {
      setIsAiSummaryLoading(true);
      try {
        const data = await getIndividualCommentsSummaryService(projectId, userId);
        setAiSummary(data || '');
        setIsAiSummaryLoading(false);
      } catch (error: unknown) {
        showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to fetch comments summary');
      }
    };
    fetchCommentsSummary();
  }, [userId, projectId]);

  useEffect(() => {
    // Reset the comments
    setFlexternComments({
      comments: [],
      metadata: {
        currentPage: 0,
        pageSize: 0,
        totalRecords: 0,
        hasNextPage: true,
      },
    });

    // Refresh the comments
    fetchMoreComments({ resetPage: true });
  }, [userId, projectId, watch('flexternRole')]);

  useEffect(() => {
    // Create and attach scroll event listener
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !isCommentsLoading &&
        flexternComments.metadata.hasNextPage
      ) {
        fetchMoreComments();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the scroll event listener - on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [flexternComments.metadata.hasNextPage, isCommentsLoading, watch('flexternRole')]);

  /**
   * Navigates back to the previous page if there is a history state,
   * otherwise navigates to the individual analytics page for the given project and user.
   */
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/analytics/project/${projectId}/individual/${userId}`);
    }
  };

  const resetFilters = () => {
    reset();
  };

  return (
    <div className="flexternships-page flex flex-col items-start gap-4">
      <div>
        <CustomBreadCrumbs
          items={[
            { label: 'Analytics', href: `/analytics/project/${projectId}` },
            { label: 'Individual Analytics', href: `/analytics/project/${projectId}/individual/${userId}` },
            { label: 'Comments', href: `/analytics/${projectId}/individual/${userId}/comments` },
          ]}
          startWithHome
        />
      </div>
      <PrimaryIconText
        icon={<ArrowLeft size={18} className="text-trublue-secondary-500" />}
        text="Analytics"
        onClick={goBack}
      />
      <div className="flex flex-col w-full">
        <SimpleElevatedCard className="bg-white flex flex-col items-start gap-y-5 p-5">
          <Statbox title={overallCommentCount} desc="Overall Comments" isSelected />
          <AIGeneratedSummary title="Overall Comments Summary" isLoading={isAiSummaryLoading}>
            {aiSummary}
          </AIGeneratedSummary>
        </SimpleElevatedCard>

        <div className="flex flex-col py-5 px-0 gap-7 self-stretch">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-lg font-semibold">Detailed Comments</h1>
              {projectName && <p className="text-sm text-grey">Project: {projectName}</p>}
            </div>
            <div className="flex flex-row items-end gap-x-5">
              <SingleSelectInput
                className="w-[200px]"
                name="flexternRole"
                control={control}
                label="User Type"
                placeholder="Select user type"
                loadOptions={(page, pageSize) => getPaginatedFlexternRoles(page, pageSize)}
                isClearable
              />
              <PrimaryIconText
                icon={<RefreshCcw size={20} className="text-trublue-secondary-500" />}
                text="Reset"
                onClick={resetFilters}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {flexternComments.comments.length > 0
              ? flexternComments.comments.map((commentData, index) => (
                  <CommentBox
                    key={index}
                    comment={commentData.comment}
                    giverDetails={commentData.giverDetails}
                    milestoneInfo={commentData.milestoneInfo}
                    createdAt={commentData.createdAt}
                  />
                ))
              : !isCommentsLoading && <div className="text-lg text-center text-grey">No comments found</div>}
            {isCommentsLoading && (
              <div className="w-full flex justify-center">
                <div className="size-10">
                  <Spinner />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
