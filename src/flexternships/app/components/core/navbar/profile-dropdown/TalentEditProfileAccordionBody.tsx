import { Link } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { TALENT_PROFILE_SECTIONS } from '@/flexternships/static/constants/core-constants';

export default function TalentEditProfileAccordionBody() {
  return (
    <div className="flex flex-col pt-3 pb-4 max-h-[180px] overflow-y-auto">
      {TALENT_PROFILE_SECTIONS.map(({ path, label }) => (
        <Link
          key={path}
          to={routes.talentProfileEdit.generate(path)}
          className="p-4 px-8 hover:bg-trublue-light cursor-pointer"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
