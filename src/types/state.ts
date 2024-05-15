import { store } from '../TheStore/index';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
