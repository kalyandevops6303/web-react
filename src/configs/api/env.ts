export const isFlexternshipApp: boolean = import.meta.env.VITE_IS_FLEXTERNSHIP_APP === 'true';

// API ENDPOINTS
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiAuthEndpoint: string = `${baseUrl}/${import.meta.env.VITE_API_AUTH_PATH}`;
export const apiOnboardingEndpoint: string = `${baseUrl}/${import.meta.env.VITE_API_ONBOARDING_PATH}`;
export const apiCreateProjectEndpoint: string = `${baseUrl}/${import.meta.env.VITE_API_CREATE_PROJECT_PATH}`;
export const apiCreateProjectAIEndpoint: string = `${baseUrl}/${import.meta.env.VITE_API_AI_ASSIST_PATH}`;
export const apiPaymentEndPoint: string = `${baseUrl}/${import.meta.env.VITE_API_PAYMENT_PATH}`;
export const apiProjectInfraEndpoint: string = `${baseUrl}/${import.meta.env.VITE_API_PROJECT_INFRA_PATH}`;
