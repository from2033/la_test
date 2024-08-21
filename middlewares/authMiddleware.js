exports.verifyApiKey = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).send('Authorization header missing or incorrect');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [apiKey, password] = credentials.split(':');

    if (apiKey === process.env.API_KEY && password === '') {
        next();
    } else {
        res.status(401).send('Invalid API Key');
    }
};
