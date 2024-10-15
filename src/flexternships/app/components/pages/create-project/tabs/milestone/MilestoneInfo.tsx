import { AlertCircle } from 'react-feather';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';

export default function MilestoneInfo(props: InfoProps) {
    const { infoType, updateHandler } = props;
    return (
        <div className={`${Styles.milestonesTabInfo} ${infoType === "undershot" ? Styles.undershot : (infoType === "overshot" ? Styles.exceed : '')}`}>
            <div className={Styles.infoContentContainer}>
                <div>
                    <AlertCircle size={18} />
                </div>
                <div className={Styles.infoContent}>
                    <span className='font-semibold'>
                        Duration {infoType === "undershot" ? "Undershot" : (infoType === "overshot" ? "Exceeded" : '')}:{' '}
                    </span>
                    <span className='font-normal'>
                        {infoType === "undershot" ?
                            `The sum of milestone duration is undershot. In case you don’t want to utilize the left over estimated duration (in weeks) then click on update to automatically revise the estimated duration.`
                            : (infoType === "overshot" ?
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
    infoType: "undershot" | "overshot" | "balanced" | "updated"
    updateHandler: () => void
};