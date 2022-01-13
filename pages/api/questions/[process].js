import requestConfig from '../../../easy-peasy/request-config';
const fetchData = async (req, res) => {
    try {
        const serverResponse = await fetch(`${process.env.SERVER_URL}/api/questions/fetch`, requestConfig.post);

        const statusCode = serverResponse.status;

        if (statusCode == 404) {
            res.status(404).send({ message: 'Not Found.' });
        }
        else {
            let responseData = await serverResponse.json();
            res.status(200).send(responseData);
        }
    }
    catch (e) {
        res.status(500).send({ message: 'Internal Server Error.' });
    }
}

export default async (req, res) => {
    let isValidRequest = true;
    const {
        query: { process }
    } = req;

    switch (process) {
        case 'fetch':
            await fetchData(req, res);
            break;
        default:
            isValidRequest = false;
    }

    if (!isValidRequest)
        res.redirect('/404');
}