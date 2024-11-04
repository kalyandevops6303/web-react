import { BreadCrumbType } from '@/flexternships/constraints/types/project-details-types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { Home } from 'react-feather';

const BreadCrumbs = ({ steps }: {steps: BreadCrumbType[]}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbLink href='/dashboard'>
      <Home size={16} color='#00B0FF' />
      </BreadcrumbLink>
      <BreadcrumbSeparator />
      {steps?.map((step: BreadCrumbType, index: number) => {
        return (
          <BreadcrumbItem>
            {index === steps.length - 1 ? (
              <BreadcrumbPage>{step?.title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={step?.link}>{step?.title}</BreadcrumbLink>
            )}

            {index !== steps.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      })}
      </BreadcrumbList>
     
    </Breadcrumb>
  );
};

export default BreadCrumbs;
