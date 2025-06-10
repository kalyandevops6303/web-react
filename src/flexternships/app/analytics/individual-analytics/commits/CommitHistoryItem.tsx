import VerticalTimeline from '@/flexternships/app/components/core/timelines/VerticalTimeline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/flexternships/app/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { addQueryParams } from '@/flexternships/utils/miscellaneous-utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ChevronRightIcon, User } from 'lucide-react';

export default function CommitHistoryItem({ commits, index }: { commits: any; index?: number }) {
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);

  // Create a unique value for each accordion
  const uniqueValue = `${commits.date}-${index || 0}`;

  const getCommitDetailsComponent = (commit: any) => {
    return (
      <div className="flex items-center">
        <div className="flex gap-2 items-center w-1/2">
          <Avatar>
            <AvatarImage src={addQueryParams(commit.imageUri, blobSasTokenParams)} />
            <AvatarFallback>
              <User color="#6E6B7B" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-sm font-medium">
              {commit.firstName} {commit.lastName}
            </div>
            <div className="text-xs text-gray-500">{commit.talentRole}</div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex items-center gap-2">
            <a href={commit.url} target="_blank">
              <div className="text-[#0185E4] font-montserrat text-sm font-semibold leading-[18px]">{commit.sha}</div>
            </a>
            <ChevronRightIcon className="text-[#0185E4]" size={16} />
          </div>
          <div className="text-xs text-gray-500">Commit ID</div>
        </div>
      </div>
    );
  };

  const timelineItems = [
    ...commits.commits?.map((commit: any) => ({
      component: getCommitDetailsComponent(commit),
      color: '#FF9F43',
    })),
  ];

  return (
    <Accordion type="single" collapsible defaultValue={uniqueValue} className="w-full">
      <AccordionItem value={uniqueValue} className="w-full py-2 border-0">
        <AccordionTrigger className="p-0 hover:no-underline w-fit" hideIcon={true}>
          <div className="flex items-center gap-2 w-fit">
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-grey-muted transition-transform duration-200 [&[data-state=open]]:rotate-180" />
            <span>
              {commits.commits?.length} commit{commits.commits?.length > 1 ? 's' : ''} at {commits.date}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="ml-3 mt-3">
            <VerticalTimeline timelineItems={timelineItems} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
