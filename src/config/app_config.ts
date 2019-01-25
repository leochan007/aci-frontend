const txUrl = process.env.TX_URL;
const account = process.env.ACCOUNT;
const accountUrl = process.env.ACCOUNT_URL;

// 'Content-Type' : 'application/x-www-form-urlencoded',
const axiosConf = {
    baseURL: process.env.BACKEND_URL,
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Authorization,Origin, X-Requested-With, Content-Type, Accept',
    },
};

export {
    txUrl,
    account,
    accountUrl,
    axiosConf,
};
