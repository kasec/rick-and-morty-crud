import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './characters-slice/state';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});