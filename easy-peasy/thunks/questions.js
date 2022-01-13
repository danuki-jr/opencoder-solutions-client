import questionsService from '../services/questions';
import { thunk } from 'easy-peasy';

export default {
    fetch: thunk(async actions => {
        actions.startLoading();
        try{
            const data = await questionsService.fetch();
            actions.setData(data);
        }
        catch(e){
            actions.setError(e);
        }
        actions.endLoading();
    }),

}