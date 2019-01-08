const eostracerUrl = process.env.EOSTRACE_URL;

const axiosConf = {
    baseURL: process.env.BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Authorization,Origin, X-Requested-With, Content-Type, Accept',
    },
};

export {
    eostracerUrl,
    axiosConf,
};
