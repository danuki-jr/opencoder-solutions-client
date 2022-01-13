import { action } from 'easy-peasy';

export default {
    setData: action((state, payload) => {
        state.data = payload;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    startLoading: action(state => {
        state.isLoading = true;
    }),
    endLoading: action(state => {
        state.isLoading = false;
    })
}