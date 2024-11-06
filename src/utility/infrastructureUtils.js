import { InfraStatus } from './constants/ProjectInfraConstants';

export const getInfraStatusText = (status) => {
  switch (status) {
    case InfraStatus.INITIATED:
      return 'Creation In-progress';
    case InfraStatus.CREATED:
      return 'Created';
    case InfraStatus.CREATION_FAILED:
      return 'Creation Error';
    case InfraStatus.DECOMMISSION_REQUESTED:
      return 'Deletion In-progress';
    case InfraStatus.DECOMMISSIONED:
      return 'Deleted';
    case InfraStatus.DECOMMISSION_FAILED:
      return 'Deletion Error';
    default:
      return 'Error';
  }
};

export const getInfraDescriptionByStatus = (status) => {
  switch (status) {
    case InfraStatus.INITIATED:
      return 'Creation of the services that you have opted for this project is in progress. Please check after sometime. It typically takes 3-5 minutes.';
    case InfraStatus.CREATED:
      return 'We created the following services that you have opted for this project. Check your email inbox for invite to view and manage the services.';
    case InfraStatus.CREATION_FAILED:
      return 'We encountered an error while creating the services for this project. You may still have received an invite to join the resource group and access a few services. To access other resources, please retry after sometime or contact support.';
    case InfraStatus.DECOMMISSION_REQUESTED:
      return 'We started terminating the infrastructure of this project. Please check after sometime. It typically takes 3-5 minutes.';
    case InfraStatus.DECOMMISSIONED:
      return 'We successfully terminated the infrastructure of this project, as per your request. Looking forward to serving you again on a different project.';
    case InfraStatus.DECOMMISSION_FAILED:
      return 'We encountered an error while terminating the infrastructure for this project. Please try after sometime or contact support.';
    default:
      return "There's an error loading this page. Please check after sometime.";
  }
};
