import { isEmpty } from 'lodash';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';
import { Spinner } from 'reactstrap';
import emptyProjectsGif from '@flexternships/assets/gifs/search-placeholder.gif';

export default function ClientRecentProjects(props: ClientRecentProjectsProps) {
  const { clientProjectDetails, isProjectsLoading, viewProject } = props;
  return (
    <div className="flex flex-col gap-y-4 bg-white rounded-md shadow-card p-6">
      <div className="text-lg font-semibold text-grey-heading">Recent Projects</div>
      <div className="flex flex-row flex-wrap gap-6">
        {!isEmpty(clientProjectDetails) &&
          clientProjectDetails.projects.length > 0 &&
          clientProjectDetails.projects.map(
            (project: { id: string; name: string; description: string; roles: string[] }, index: number) => (
              <div
                key={index}
                className="w-full max-w-[471px] flex flex-col gap-y-2 bg-white shadow-card rounded-md p-5 overflow-hidden"
              >
                <div className="flex flex-col gap-y-4 grow">
                  <div className="flex flex-col gap-y-3">
                    <div className="self-start text-grey-heading text-lg font-semibold leading-[26px] line-clamp-4">
                      {project.name}
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="text-grey text-sm font-normal leading-[21px]">Roles</div>
                      <div className="flex flex-row flex-wrap gap-1">
                        {project.roles.map((role: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-1 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-grey font-normal leading-5.5 break-words grow">
                    <ExpandableText charLimit={300}>{project.description}</ExpandableText>
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <span
                    onClick={() => viewProject(project.id)}
                    className="underline text-trublue-secondary-500 text-sm font-normal tracking-wide cursor-pointer"
                  >
                    View Project
                  </span>
                </div>
              </div>
            ),
          )}
        {isProjectsLoading ? (
          <div className="flex flex-row justify-center items-center w-full">
            <div className="size-10">
              <Spinner />
            </div>
          </div>
        ) : (
          isEmpty(clientProjectDetails.projects) && (
            <SimpleElevatedCard className="pt-4 pb-5 w-full">
              <div className="flex flex-col justify-center items-center">
                <img className="h-[150px] w-[171px] object-cover" src={emptyProjectsGif} alt="No Projects" />
                <span className="text-grey-300 text-sm font-medium tracking-wide -mt-2.5">
                  No Recent Projects Found
                </span>
              </div>
            </SimpleElevatedCard>
          )
        )}
      </div>
    </div>
  );
}

type ClientRecentProjectsProps = {
  clientProjectDetails: any;
  isProjectsLoading: boolean;
  viewProject: (projectId: string) => void;
};
