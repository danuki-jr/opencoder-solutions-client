import questionThunks from '../thunks/questions';
import questionActions from '../actions/questions';

export default {
    isLoading: false,
    error: '',
    data: [],
    ...questionThunks,
    ...questionActions
};