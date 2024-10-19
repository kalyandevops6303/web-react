import axios from "axios";
import { ServerResponseStatus } from "../constraints/enums/core-enums";

export const handleError = (error: Error, defaultErrorMessage: string) => {

    if (axios.isAxiosError(error) && error.response?.data) {
        const errorResponse = error.response.data as {
            status: string;
            errorData: {
                errorCode: number;
                message: string;
            };
        };
        if (errorResponse.status === ServerResponseStatus.FAIL && errorResponse.errorData?.message) {
            throw new Error(errorResponse.errorData.message);
        }
    }
    throw new Error(defaultErrorMessage);
}