import { getMilestonesByProjectId, getMilestoneDetailsById } from '../services/project-management-v2';

export const populateProjectMilestones = async (projectId: string, set: any) => {
    set({ isMilestonesLoading: true });
    const milestones = await getMilestonesByProjectId(projectId);
    const formattedMilestones = milestones.map((milestone: any) => ({
        id: milestone._id,
        projectId: milestone.project_id,
        name: milestone.name,
        startDate: milestone.start_date,
        endDate: milestone.end_date,
        description: milestone.description,
        estimatedDuration: {
            duration: milestone.estimated_duration.duration,
            durationType: milestone.estimated_duration.duration_type
        },
        deliverables: milestone.deliverables,
        status: milestone.status,
        milestoneBy: {
            entity: milestone.milestone_by.entity,
            entityId: milestone.milestone_by.entity_id,
            orgSlugId: milestone.milestone_by.org_slug_id
        },
        seq: milestone.seq,
        milestoneFeedbackDetails: {
            id: milestone.milestone_feedback_details?.id,
            milestoneId: milestone.milestone_feedback_details?.milestone_id,
            orgSlugId: milestone.milestone_feedback_details?.org_slug_id,
            projectId: milestone.milestone_feedback_details?.project_id,
            entityId: milestone.milestone_feedback_details?.entity_id,
            entityType: milestone.milestone_feedback_details?.entity_type,
            feedback: {
                feedbackId: milestone.milestone_feedback_details?.feedback?.feedback_id,
                feedbackType: milestone.milestone_feedback_details?.feedback?.feedback_type,
                feedbackStatus: milestone.milestone_feedback_details?.feedback?.feedback_status
            }
        }
    }));
    set({ projectMilestones: formattedMilestones, isMilestonesLoading: false });
};

export const populateMilestoneDetails = async (milestoneId: string, set: any) => {
    const milestoneDetails = await getMilestoneDetailsById(milestoneId);
    const formattedMilestoneDetails = {
        id: milestoneDetails._id,
        projectId: milestoneDetails.project_id,
        name: milestoneDetails.name,
        startDate: milestoneDetails.start_date,
        endDate: milestoneDetails.end_date,
        description: milestoneDetails.description,
        estimatedDuration: {
            duration: milestoneDetails.estimated_duration.duration,
            durationType: milestoneDetails.estimated_duration.duration_type
        },
        deliverables: milestoneDetails.deliverables,
        status: milestoneDetails.status,
        submissions: milestoneDetails.submissions || [{
            name: "Documentation-1.pdf",
            type: "FILE",
            fileKey: "projects/6710beb143ecdeaeffde0616/013cca3a-0ee9-4f33-b581-43837a618bf8.pdf",
            description: "This is a description for submission",
            submittedAt: 1730614547000,
            submittedBy: {
                name: "John Doe",
                avatar: "https://via.placeholder.com/150"
            }
        }, {
            name: "https://www.google.com",
            type: "URL",
            description: "This is a description for submission-2",
            submittedAt: 1730614547000,
            submittedBy: {
                name: "John Doe",
                avatar: "https://via.placeholder.com/150"
            }
        }],
        milestoneBy: {
            entity: milestoneDetails.milestone_by.entity,
            entityId: milestoneDetails.milestone_by.entity_id,
            orgSlugId: milestoneDetails.milestone_by.org_slug_id
        },
        seq: milestoneDetails.seq,
        milestoneFeedbackDetails: {
            id: milestoneDetails.milestone_feedback_details?.id,
            milestoneId: milestoneDetails.milestone_feedback_details?.milestone_id,
            orgSlugId: milestoneDetails.milestone_feedback_details?.org_slug_id,
            projectId: milestoneDetails.milestone_feedback_details?.project_id,
            entityId: milestoneDetails.milestone_feedback_details?.entity_id,
            entityType: milestoneDetails.milestone_feedback_details?.entity_type,
            feedback: {
                feedbackId: milestoneDetails.milestone_feedback_details?.feedback?.feedback_id,
                feedbackType: milestoneDetails.milestone_feedback_details?.feedback?.feedback_type,
                feedbackStatus: milestoneDetails.milestone_feedback_details?.feedback?.feedback_status
            }
        }
    }
    set({ milestoneDetails: formattedMilestoneDetails });
};