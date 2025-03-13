import { Link, useLocation } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { TALENT_PROFILE_SECTIONS } from '@/flexternships/static/constants/core-constants';
import { useAppStore } from '@/flexternships/stores/core-stores';

export default function TalentEditProfileAccordionBody() {
  const setBackPath = useAppStore((state) => state.setBackPath);
  const location = useLocation();
  return (
    <div className="flex flex-col pt-3 pb-4 max-h-[180px] overflow-y-auto">
      {TALENT_PROFILE_SECTIONS.map(({ path, label }) => (
        <Link
          key={path}
          to={routes.talentProfileEdit.generate(path)}
          className="p-4 px-8 hover:bg-trublue-light cursor-pointer"
          onClick={() => setBackPath(location.pathname)}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
