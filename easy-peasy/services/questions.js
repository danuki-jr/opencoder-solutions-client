import requestConfig from '../request-config';

export default {
    fetch: async () => {
        const res = await fetch('/api/questions/fetch', requestConfig.post);

        let statusCode = res.status;
        let responseData = await res.json();
        if (statusCode == 200)
            return responseData;

        throw responseData.message;
    }
}
