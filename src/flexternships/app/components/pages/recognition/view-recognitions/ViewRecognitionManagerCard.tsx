// Core enums and types
import { Competency } from '@/flexternships/constraints/enums/miscellaneous-enums';

// UI Components
import CompetencyTag from '../../../core/tags/CompetencyTag';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Utils
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';

export default function ViewRecognitionManagerCard() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row justify-between gap-x-6 flex-wrap">
        <div className="flex flex-row gap-x-2 items-center">
          <div>
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback
                className="p-2 font-semibold text-sm"
                style={{
                  color: stringToColour('Varun Yadav'),
                  backgroundColor: `${stringToColour('Varun Yadav', { opacity: 10 })}`,
                }}
              >
                {'Varun Yadav'.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-[345px]">
            <div className="text-grey-heading text-sm font-medium leading-[23px]">John Doe</div>
            <div className="text-grey text-sm font-normal leading-[21px]">Frontend Developer</div>
          </div>
        </div>
        <div className="w-[446px]">
          <div className="text-grey-heading text-sm font-medium leading-[23px]">Via Feedback</div>
          <div className="text-grey text-sm font-normal leading-[21px]">Type</div>
        </div>
        <div className="text-grey-muted text-xs font-normal leading-4.5">2 Days ago</div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-grey text-xs font-normal leading-5">Competencies</div>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
          <CompetencyTag competency={Competency.COLLABORATION} />
          <CompetencyTag competency={Competency.LEADERSHIP} />
          <CompetencyTag competency={Competency.COMMUNICATION} />
          <CompetencyTag competency={Competency.INNOVATION} />
          <CompetencyTag competency={Competency.EFFECTIVENESS} />
          <CompetencyTag competency={Competency.PROBLEM_SOLVING} />
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-grey text-xs font-normal leading-5">Comment</div>
        <div className="text-sm font-normal leading-5.5 text-grey-700">
          Lorem ipsum dolor sit amet consectetur. Ipsum tincidunt bibendum turpis quam tempor. Non fermentum mi sed
          vitae amet egestas vestibulum. Duis habitasse sed ac pellentesque id a malesuada eu facilisis. Tellus semper
          proin est aliquam molestie.
        </div>
      </div>
    </div>
  );
}
