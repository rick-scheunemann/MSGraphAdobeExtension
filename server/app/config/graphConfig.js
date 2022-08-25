const msGraph = 'https://graph.microsoft.com/v1.0';

const ids = {
    site: '',
    list: '',
};

// Endpoints for MS Graph API services
// target is string identifier for dispatching events to server ext
const graphConfig = {
    meEndpoint: {
        url: `${msGraph}/me`,
        target: '',
    },
    colorListMetaEndpoint: {
        url: `${msGraph}/sites/${ids.site}/lists/${ids.list}`,
        target: '',
    },
    colorListItemEndpoint: {
        url: `${msGraph}/sites/${ids.site}/lists/${ids.list}/items?`,
        batchUrl: `/sites/${ids.site}/lists/${ids.list}/items?`,
        target: 'msColorRes',
    },
};

export default graphConfig;
