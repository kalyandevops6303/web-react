// Components
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';

export default function ClientCompanyTagline(props: ClientCompanyTaglineProps) {
  const { tagline } = props;
  return (
    <div className="bg-white rounded-md shadow-card p-6">
      <div className="text-base font-semibold text-grey-heading mb-4">Company Tagline</div>
      <div className="text-grey text-sm font-light">
        <ExpandableText charLimit={200}>{tagline}</ExpandableText>
      </div>
    </div>
  );
}

type ClientCompanyTaglineProps = {
  tagline: string;
};
