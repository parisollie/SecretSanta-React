import { configureStore } from '@reduxjs/toolkit';
import familyReducer from '../features/familySlice';
import pairingsReducer from '../features/pairingsSlice';

/*
-familyReducer handles the list of family members.
-pairingsReducer manages the generated Secret Santa pairings.*/

export const store = configureStore({
    reducer: {
        family: familyReducer,
        pairings: pairingsReducer,
    },
});

