import { AlertCircle } from 'react-feather';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { MilestoneInfoType } from '@/flexternships/constraints/types/project-creation-types';

export default function MilestoneInfo(props: InfoProps) {
    const { infoType, updateHandler } = props;
    return (
        <div className={`${Styles.milestonesTabInfo} ${infoType === MilestoneInfoType.UNDERSHOT ? Styles.undershot : (infoType === MilestoneInfoType.OVERSHOT ? Styles.exceed : '')}`}>
            <div className={Styles.infoContentContainer}>
                <div>
                    <AlertCircle size={18} />
                </div>
                <div className={Styles.infoContent}>
                    <span className='font-semibold'>
                        Duration {infoType === MilestoneInfoType.UNDERSHOT ? "Undershot" : (infoType === MilestoneInfoType.OVERSHOT ? "Exceeded" : '')}:{' '}
                    </span>
                    <span className='font-normal'>
                        {infoType === MilestoneInfoType.UNDERSHOT ?
                            `The sum of milestone duration is undershot. In case you don't want to utilize the left over estimated duration (in weeks) then click on update to automatically revise the estimated duration.`
                            : (infoType === MilestoneInfoType.OVERSHOT ?
                                `The sum of the milestone duration exceeded the estimated duration (in weeks). Click on update to automatically revise the estimated duration.`
                                : '')}
                    </span>
                </div>
            </div>
            <div className={Styles.infoAction} onClick={updateHandler}>
                Update
            </div>
        </div>
    )
}

type InfoProps = {
    infoType: MilestoneInfoType
    updateHandler: () => void
};