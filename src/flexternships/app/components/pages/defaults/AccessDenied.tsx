// ** React Imports
import { useNavigate } from 'react-router-dom';

// ** Illustrations Imports
import illustrationsLight from '@flexternships/assets/images/pages/error.svg';

import PrimaryButton from '../../core/buttons/PrimaryButton';

export default function AccessDenied() {
    // ** Hooks
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 mt-14">
                <div className="flex flex-col items-center">
                    <h2 className="mb-4 text-2xl text-center">
                        Oops!
                        <br />
                        You don't have access to this page.
                    </h2>
                    <PrimaryButton
                        onClick={() => navigate('/dashboard')}
                        className="mb-6"
                    >
                        Back to home
                    </PrimaryButton>
                    <img className="max-w-full h-auto" src={illustrationsLight} alt="Not authorized page" />
                </div>
            </div>
        </div>
    );
};
