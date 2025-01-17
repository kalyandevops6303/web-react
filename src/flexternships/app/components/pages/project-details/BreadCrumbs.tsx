import React from 'react';
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

const styles = {
  active: 'text-[#0185E4] font-medium text-sm leading-[150%] font-montserrat',
  inactive: 'text-[#394042] font-normal text-sm leading-[150%] font-montserrat',
};

const BreadCrumbs = ({ steps }: { steps: BreadCrumbType[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        <BreadcrumbLink href="/dashboard">
          <Home size={16} color="#00B0FF" />
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        {steps?.map((step: BreadCrumbType, index: number) => {
          const isLastStep = index === steps.length - 1;
          const isSecondLastStep = index === steps.length - 2 && !steps[steps.length - 1]?.title;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === steps.length - 1 ? (
                  <BreadcrumbPage className={`${step?.isActive ? styles.active : styles.inactive}`}>
                    {step?.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={step?.link}>{step?.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastStep && !isSecondLastStep && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
