import { configureStore } from '@reduxjs/toolkit';

import todosR from './modules/todoSlice';

export const store = configureStore({
    reducer: {
        todosR,
    },
});
