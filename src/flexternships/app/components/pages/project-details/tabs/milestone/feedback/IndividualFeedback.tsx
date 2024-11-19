import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import Sidebar from '@/flexternships/app/components/core/surveys/Sidebar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/Kudos';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';
/**
/**
 * TODO:
 * - Complete the function of handleSurveyComplete
 * - Get surveyJson from the backend
 * - Remove the hardcoded amd commented code from the component
 */

export default function IndividualFeedback() {

    const params = useParams();

    const getIndividualFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
    const individualFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

    const getTeam = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
    const team = useProjectsStore((state) => state.performanceDetails);
    const [formattedTeamInfo, setFormattedTeamInfo] = useState([]);

    const [activeTeamMember, setActiveTeamMember] = useState<any>(null);

    useEffect(() => {
        getIndividualFeedbackForm(params?.projectId, FeedbackTypesAPI.INDIVIDUAL);
        getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    }, [])

    useEffect(() => {
        if (team) setActiveTeamMember(team[0])
    }, [team])

    useEffect(() => {
        if (activeTeamMember) {
            setFormattedTeamInfo(team?.map((person: any) => {
                console.log("activeTeamMember: " + activeTeamMember?.user_id, "person: " + person?.user_id)
                return (
                    {
                        image: person?.image_uri,
                        name: `${person?.first_name} ${person?.last_name}`,
                        role: person?.role,
                        completed: person?.is_feedback ?? false,
                        lastMessageTime: '3 min',
                        isActive: activeTeamMember?.user_id == person?.user_id,
                        userId: person?.user_id
                    }
                )
            }))

            if (!activeTeamMember?.is_feedback) getIndividualFeedbackForm(params?.projectId, FeedbackTypesAPI.INDIVIDUAL);
        }
    }, [activeTeamMember])

    useEffect(() => {
        console.log(formattedTeamInfo)
    }, [formattedTeamInfo])

    const handleSurveyComplete = (survey: SurveyModel) => {
        console.log(survey);
    };

    const handleActiveMemberChange = (userId: any) => {
        const activeMember = team?.find((member: any) => member.user_id === userId);
        // console.log(activeMember)
        setActiveTeamMember(activeMember);
    }

    return (
        <div className='flex items-start justify-between gap-2'>
            {formattedTeamInfo && <Sidebar data={formattedTeamInfo} onChange={handleActiveMemberChange} />}
            {individualFeedbackForm && <MilestoneFeedbackSurvey surveyJson={individualFeedbackForm?.feedback} onComplete={handleSurveyComplete} />}
        </div>
    );
}
