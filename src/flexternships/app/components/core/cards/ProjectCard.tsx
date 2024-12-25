import SimpleElevatedCard from './SimpleElevatedCard';
import PrimaryButton from '../buttons/PrimaryButton';
import mapIdsToNames from '@/flexternships/app/utils/mapping-utils';
import { AVAILABLE_ROLES, AVAILABLE_SKILLS, AVAILABLE_TOOLS } from '../../../constants';
import { useState } from 'react';
import GenericModal from '../modals/GenericModal';

interface Role {
  role_id: string;
  name?: string;
  proficiency: {
    skills?: string[];
    tools?: string[];
  };
  count: number;
}

type ProjectCardProps = {
  title: string;
  description: string;
  domain?: string;
  milestones?: Array<{
    index: number;
    title: string;
    description: string;
    time: string;
    roles: string[];
    deliverables: string[];
  }>;
  tech_stack?: string[];
  total_duration_weeks?: number;
  roles?: Array<Role>;
};

const ProjectCard = ({
  title,
  description,
  domain,
  milestones = [],
  tech_stack = [],
  total_duration_weeks,
  roles = [],
}: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map skills and tools for each role
  const mappedRoles = roles.map((role) => ({
    ...role,
    name: mapIdsToNames([role.role_id], AVAILABLE_ROLES)[0],
    proficiency: {
      skills: mapIdsToNames(role.proficiency.skills || [], AVAILABLE_SKILLS),
      tools: mapIdsToNames(role.proficiency.tools || [], AVAILABLE_TOOLS),
    },
  }));

  // Map tech stack IDs to names
  const techStackNames = mapIdsToNames(tech_stack, AVAILABLE_TOOLS);

  // Map milestone role IDs to names
  const mappedMilestones = milestones.map((milestone) => ({
    ...milestone,
    roles: mapIdsToNames(milestone.roles, AVAILABLE_ROLES),
  }));

  return (
    <>
      <SimpleElevatedCard className="p-4 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {domain && <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{domain}</span>}
          </div>
          <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-3 mb-3">{description}</p>
          <div className="flex justify-end">
            <PrimaryButton onClick={() => setIsModalOpen(true)}>View Details</PrimaryButton>
          </div>
        </div>
      </SimpleElevatedCard>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                {domain && (
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mt-2 inline-block">
                    {domain}
                  </span>
                )}
              </div>
              {total_duration_weeks && (
                <div className="text-right">
                  <span className="text-gray-600">Duration</span>
                  <p className="font-medium">{total_duration_weeks} weeks</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
              <p className="text-gray-600">{description}</p>
            </div>

            {techStackNames.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStackNames.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mappedRoles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Team Requirements</h3>
                <div className="grid gap-4">
                  {mappedRoles.map((role, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{role.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {role.count} needed
                        </span>
                      </div>
                      {role.proficiency.skills?.length > 0 && (
                        <div className="mb-2">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Required Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {role.proficiency.skills?.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {role.proficiency.tools?.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Required Tools</h5>
                          <div className="flex flex-wrap gap-2">
                            {role.proficiency.tools?.map((tool, toolIndex) => (
                              <span key={toolIndex} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mappedMilestones.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Project Milestones</h3>
                <div className="space-y-4">
                  {mappedMilestones.map((milestone, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <span className="text-sm text-gray-500">{milestone.time}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{milestone.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Required Roles</h5>
                          <ul className="list-disc pl-4 space-y-1">
                            {milestone.roles.map((role, roleIndex) => (
                              <li key={roleIndex}>{role}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Deliverables</h5>
                          <ul className="list-disc pl-4 space-y-1">
                            {milestone.deliverables.map((deliverable, delIndex) => (
                              <li key={delIndex}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <PrimaryButton onClick={() => setIsModalOpen(false)}>Close</PrimaryButton>
            </div>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default ProjectCard;
