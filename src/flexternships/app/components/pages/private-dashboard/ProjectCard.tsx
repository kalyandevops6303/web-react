import FlexternAvatar from '../../core/avatars/FlexternAvatar';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';
import { Progress } from '../../ui/progress';
import { Info } from 'react-feather';
import SecondaryButton from '../../core/buttons/SecondaryButton';
import SkillBadge from '../../core/badges/SkillBadge';

export default function ProjectCard() {
  return (
    <SimpleElevatedCard className="relative p-8 overflow-hidden">
      <div className="absolute top-0 right-0 rounded-bl-[12px] flex flex-row items-center gap-x-1 px-2 py-[1px] bg-grey-50">
        <span className="bg-error size-1.5 rounded-full" />
        <span className="text-grey-heading text-xs font-semibold leading-4.5">New</span>
      </div>
      <span className="px-[9px] py-[1px] text-orange bg-orange-light text-xs font-semibold leading-4.5 rounded-[17px]">
        Milestone 2
      </span>
      <div className="flex flex-row gap-x-6 flex-wrap lg:flex-nowrap">
        <div className="grow flex flex-col gap-y-4">
          <div className="mt-2 text-grey-600 text-lg font-medium leading-5.5">Sample Project Name</div>
          <div className="flex flex-row gap-x-9">
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-heading text-base font-semibold leading-5">Department name</div>
              <div className="grow text-grey-500 text-sm font-normal leading-4.5">Cohort name</div>
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-heading text-base font-semibold leading-5">Project Team</div>
              <div className="flex flex-row gap-x-2.5 items-center">
                <div className="flex flex-row -space-x-1.5">
                  <FlexternAvatar
                    size="sm"
                    className="w-7 h-7 text-xs border-2 border-white shadow-card"
                    name="John Doe"
                  />
                  <FlexternAvatar
                    size="sm"
                    className="w-7 h-7 text-xs border-2 border-white shadow-card"
                    name="Prashant Kumar"
                  />
                  <FlexternAvatar
                    size="sm"
                    className="w-7 h-7 text-xs border-2 border-white shadow-card"
                    name="Rajesh Garewal"
                  />
                  <FlexternAvatar
                    size="sm"
                    className="w-7 h-7 text-xs border-2 border-white shadow-card"
                    name="Lokesh Kumar"
                  />
                </div>
                <div className="text-grey text-sm font-medium">+3</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-grey-400 text-xs font-medium leading-4">My Progress</div>
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center">
                <div className="flex items-center gap-x-2 py-1.5 pl-2 pr-3 border-grey-50 border-1 rounded-[28px]">
                  <FlexternAvatar size="sm" className="w-7 h-7 text-xs" name="John Doe" />
                  <div className="text-xs font-medium leading-4 text-grey-200">M1</div>
                </div>
                <div className="w-6 h-[1px] border-t border-dashed border-grey-50" />
                <div className="flex items-center gap-x-2 py-1.5 pl-2 pr-3 border-grey-50 border-1 rounded-[28px]">
                  <FlexternAvatar size="sm" className="w-7 h-7 text-xs" name="John Doe" />
                  <div className="text-xs font-medium leading-4 text-grey-200">M1</div>
                </div>
                <div className="w-6 h-[1px] border-t border-dashed border-grey-50" />
                <div className="flex items-center gap-x-2 py-1.5 pl-2 pr-3 border-grey-50 border-1 rounded-[28px]">
                  <FlexternAvatar size="sm" className="w-7 h-7 text-xs" name="John Doe" />
                  <div className="text-xs font-medium leading-4 text-grey-200">M1</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Progress value={50} className="h-3" />
          </div>
        </div>
        <div className="grow flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <div className="text-xs font-medium leading-4 text-grey-400">Key Cohort Skills</div>
            <div className="flex flex-row gap-x-2 flex-wrap">
              <SkillBadge name="UX Design" type="cohort" />
              <SkillBadge name="UI Design" type="cohort" />
              <SkillBadge name="User Research" type="cohort" />
              <SkillBadge name="+ 3" type="cohort" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-xs font-medium leading-4 text-grey-400">Project Skills</div>
            <div className="flex flex-row gap-x-2 flex-wrap">
              <SkillBadge name="UX Design" type="project" />
              <SkillBadge name="UI Design" type="project" />
              <SkillBadge name="User Research" type="project" />
              <SkillBadge name="+ 4" type="project" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-xs font-medium leading-4 text-grey-400">Action(s) Required</div>
            <div className="flex flex-row gap-x-2 items-center">
              <SecondaryButton className="m-0" onClick={() => {}}>
                Give Feedback
              </SecondaryButton>
              <div className="flex items-center gap-x-1">
                <Info size={16} className="text-grey-300" />
                Estimated time to complete feedback <span>3min 30sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleElevatedCard>
  );
}
