import { useState } from 'react';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Milestone } from '@flexternships/types/project-creation-types';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';

export default function MilestoneItem(props: Props) {
  const { className, last = false, data, milestoneIndex } = props;
  const [isSubInfoExpanded, setIsSubInfoExpanded] = useState(false);

  const toggleSubInfo = () => {
    setIsSubInfoExpanded((cur) => !cur);
  };

  return (
    <div className={`${Styles.milestoneItem} ${className ?? ''} ${last ? '' : 'border-b-1'}`}>
      <div className={`${Styles.milestoneMainInfo} relative`} onClick={toggleSubInfo}>
        <div className={`${Styles.milestoneMainInfoItem} font-semibold w-[200px]`}>Milestone #{milestoneIndex + 1}</div>
        <div className={`${Styles.milestoneMainInfoItem} font-medium w-[120px]`}>{data.duration} Week(s)</div>
        <div className={`${Styles.milestoneMainInfoItem} font-medium grow`}>{data.title}</div>
        <span className="absolute top-4 right-4 text-grey-muted cursor-pointer">
          {isSubInfoExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </div>
      <div className={`${Styles.milestoneSubInfo} ${isSubInfoExpanded ? '' : 'hidden'}`}>
        <div className={Styles.milestoneDescriptionContainer}>
          <div className={Styles.milestoneSubInfoHeading}>Description</div>
          <ExpandableText className={Styles.milestoneSubInfoContent} charLimit={180}>
            {data.description}
          </ExpandableText>
        </div>
        <div>
          <div className={Styles.milestoneSubInfoHeading}>Deliverables</div>
          <ul className={`${Styles.milestoneSubInfoContent} ${Styles.milestoneDeliverablesList}`}>
            {data.deliverables.map((deliverable, index) => (
              <li key={index} className={Styles.listItem}>
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type Props = {
  className?: string;
  last?: boolean;
  milestoneIndex: number;
  data: Milestone;
};
