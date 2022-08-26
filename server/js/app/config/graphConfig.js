const msGraph = 'https://graph.microsoft.com/v1.0';

const ids = {
    site: '', // sharepoint site where list resides
    list: '',
};

// Endpoints for MS Graph API services
// target is string identifier for dispatching events to server ext
const graphConfig = {
    meEndpoint: {
        url: `${msGraph}/me`,
        target: '',
    },
    listMetaEndpoint: {
        url: `${msGraph}/sites/${ids.site}/lists/${ids.list}`,
        target: '',
    },
    listItemEndpoint: {
        url: `${msGraph}/sites/${ids.site}/lists/${ids.list}/items?`,
        batchUrl: `/sites/${ids.site}/lists/${ids.list}/items?`,
        target: 'msListRes',
    },
};

export default graphConfig;
