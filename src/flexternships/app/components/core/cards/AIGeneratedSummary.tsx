import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';

export default function AIGeneratedSummary({
  aiGeneratedSummary,
  title,
}: Readonly<{ aiGeneratedSummary: string; title: string }>) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-10 bg-white shadow-card h-full">
      <div className="p-[16px_16px_0] flex flex-col flex-grow gap-2">
        <div className="flex md:items-center gap-2 flex-col md:flex-row">
          <div className="text-trublue-secondary-500 font-montserrat text-xs leading-5 flex px-2 py-1 justify-center items-center gap-1 rounded-52 border border-trublue-secondary-500">
            <img src={AIGeneratedIcon} alt="AIGenerated" />
            <span className="font-semibold">AI Generated</span>
          </div>
          <div className="text-dark-100 font-montserrat text-sm leading-5.5 font-medium">{title ?? 'AI Summary'}</div>
        </div>
        <div className="text-dark-200 font-montserrat text-sm leading-5.5">{aiGeneratedSummary}</div>
      </div>

      <div className="bg-primary-light bottom-0 left-0 w-full p-[12px_16px] rounded-b-10">
        <span className="text-primary font-montserrat text-xs leading-4">Note: </span>
        <span className="text-dark-200 font-montserrat text-xs leading-4">
          Generative AI may produce inaccurate or incomplete information. Verify critical details while reviewing the
          content.
        </span>
      </div>
    </div>
  );
}
