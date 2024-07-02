const infraInputDataSchema = {
    fieldName: 'service_name',
    type: 'select',
    choices: [
        {
            displayName: 'Azure OpenAI',
            value: 'openai',

            // Additional fields for the above value
            extraFields: [
                {
                    fieldName: 'model_name',
                    type: 'select',
                    choices: [
                        {
                            displayName: 'gpt-35-turbo-16k',
                            value: 'gpt-35-turbo-16k',
                            // extraFields: null
                        }
                    ]
                }
            ]
        },
        {
            displayName: 'Azure Storage Account',
            value: 'storage_account',
        },
    ]
};

const availableServices = [
    {
        _id: 'openai',
        name: 'Azure OpenAI',
    },
    {
        _id: 'storage_account',
        name: 'Azure Storage Account'
    },
    // {
    //     _id: 'faceapi',
    //     name: 'FaceAPI',
    // },
    {
        _id: 'computervision',
        name: 'Computer Vision'
    },
    {
        _id: 'textanalytics',
        name: 'Text Analytics'
    }
];

// Default location and version is North Central US and 0613.
// Please add new models only if they are available in the above location and version.
const openaiModels = [
    {
        _id: 'gpt-35-turbo',
        name: 'gpt-35-turbo'
    },
    {
        _id: 'gpt-4',
        name: 'gpt-4'
    }
];

const InfraStatus = {
    INITIATED: 'INITIATED',
    CREATED: 'CREATED',
    CREATION_FAILED: 'CREATION_FAILED',
    DECOMMISSION_REQUESTED: 'DECOMMISSION_REQUESTED',
    DECOMMISSION_FAILED: 'DECOMMISSION_FAILED',
    DECOMMISSIONED: 'DECOMMISSIONED'
};

export { infraInputDataSchema, availableServices, openaiModels, InfraStatus };
