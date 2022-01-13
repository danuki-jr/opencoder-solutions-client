import requestConfig from '../request-config';

export default {
    save: async (data) => {
        const res = await fetch('/api/requests/save', {
            ...requestConfig.post,
            body: JSON.stringify(data)
        });

        let statusCode = res.status;
        let responseData = await res.json();

        if (statusCode == 200)
            return responseData;

        throw responseData.message;
    }
}
