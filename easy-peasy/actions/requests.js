import { action } from 'easy-peasy';

export default {
    setData: action((state, payload) => {
        state.data = payload;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    startLoading: action((state, payload) => {
        state.isLoading = true;
    }),
    endLoading: action((state, payload) => {
        state.isLoading = false;
    })
}