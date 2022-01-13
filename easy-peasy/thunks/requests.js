import requestsService from '../services/requests';
import { thunk } from 'easy-peasy';

export default {
    save: thunk(async (actions, payload, helpers) => {
        actions.startLoading();
        try {
            const data = await requestsService.save(payload);
            actions.setData(data);
        }
        catch (e) {
            actions.setError(e);
        }
        actions.endLoading();
        const { error } = helpers.getState();
        return error; 
    })
}