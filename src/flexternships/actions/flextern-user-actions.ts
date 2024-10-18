import { isEmpty } from "lodash";
import { getUserDetails } from "@flexternships/services/user-management";

export const populateUserDetails = async (get: any, set: any) => {
    const userDetails = get().userDetails;
    if (!isEmpty(userDetails)) return;

    set({ isUserDetailsLoading: true });
    try {
        const data = await getUserDetails();

        set({
            userDetails: {
                id: data['_id'],
                email: data['email'],
                userType: data['user_type'],
                phoneVerified: data['phone_verified'],
                appRoles: data['app_roles'],
                checkpoint: data['checkpoint'],
                emailVerified: data['email_verified'],
                countryCode: data['country_code'],
                oauthType: data['oauth_type'],
                accountStatus: data['account_status'],
                phone: data['phone'],
                phoneCountry: {
                    code: data['phone_country']['code'],
                    dialCode: data['phone_country']['dial_code'],
                    name: data['phone_country']['name']
                }
            }
        });
    } catch (error) {
        // TODO - Add ERROR TOAST
        console.log("There's an error while populating user details: ", error);
    }
    set({ isUserDetailsLoading: false });
}