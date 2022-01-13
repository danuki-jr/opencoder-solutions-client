import requestThunks from '../thunks/requests';
import requestActions from '../actions/requests';

export default {
    isLoading: false,
    error: '',
    data: [],
    ...requestThunks,
    ...requestActions,
};