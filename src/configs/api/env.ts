export const isFlexternshipApp: boolean = (import.meta.env.VITE_IS_FLEXTERNSHIP_APP === 'true');

export const apiAuthEndpoint: string = `${import.meta.env.VITE_API_AUTH_ENDPOINT}`;
export const apiOnboardingEndpoint: string = `${import.meta.env.VITE_API_ONBOARDING_ENDPOINT}`;
export const apiCreateProjectEndpoint: string = `${import.meta.env.VITE_API_CREATE_PROJECT_ENDPOINT}`;
export const apiCreateProjectAIEndpoint: string = `${import.meta.env.VITE_API_AI_ASSIST_ENDPOINT}`;
export const apiPaymentEndPoint: string = `${import.meta.env.VITE_API_PAYMENT_ENDPOINT}`;
export const apiProjectInfraEndpoint: string = `${import.meta.env.VITE_API_PROJECT_INFRA_ENDPOINT}`;