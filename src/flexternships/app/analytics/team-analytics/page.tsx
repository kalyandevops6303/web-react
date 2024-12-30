import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/flexternships/app/components/ui/select';

export default function TeamAnalytics() {
  const params = useParams();

  const projects = useAnalyticsStore((state) => state.projectsList);
  const getProjectsList = useAnalyticsStore((state) => state.getProjectsList);

  const [selectedProject, setSelectedProject] = useState(projects ? projects[0] : null);

  useEffect(() => {
    getProjectsList();
  }, [params]);

  useEffect(() => {
    if (!isEmpty(projects)) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  return (
    <div className="flex flex-col gap-[24px] px-[16px] md:px-0">
      <div className="flex gap-[12px] items-center w-full">
        <div className="text-[#394042] font-montserrat text-[16px] font-medium leading-[24px]">
          Select project to view analytics:
        </div>
        <Select value={selectedProject} onValueChange={(value) => setSelectedProject(value)}>
          <SelectTrigger className="h-[42px] min-h-[38px] px-[12px] py-[7px] w-[480px] focus:ring-0 bg-white rounded-[6px] border border-[#E6E7E7]">
            <SelectValue
              placeholder="Select Project"
              className="text-[#394042] font-montserrat text-[16px] font-medium leading-[24px]"
            />
          </SelectTrigger>
          <SelectContent className="bg-white w-[480px]">
            {projects.map((project: any) => (
              <SelectItem key={project?.id} value={project}>
                {project?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
