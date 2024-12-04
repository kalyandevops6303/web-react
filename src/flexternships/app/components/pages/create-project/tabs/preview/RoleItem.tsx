import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import PrimaryTag from '@flexternships/app/components/core/tags/PrimaryTag';
import { ProjectRole } from '@flexternships/types/project-creation-types';

export default function RoleItem(props: Props) {
  const { last = false, data } = props;
  return (
    <div className={`${Styles.roleItem} ${last ? '' : 'border-b-1'}`}>
      <div className={Styles.role}>{data.role?.name || '(Add role)'}</div>
      <div className={Styles.count}>{data.count || '(Add count)'}</div>
      <div className={Styles.skills}>
        {data.skills.map((skill, index) => (
          <PrimaryTag key={index} content={skill.name} />
        ))}
      </div>
      <div className={Styles.tools}>
        {data.tools.map((tool, index) => (
          <PrimaryTag key={index} content={tool.name} />
        ))}
      </div>
    </div>
  );
}

type Props = {
  last?: boolean;
  data: ProjectRole;
};
