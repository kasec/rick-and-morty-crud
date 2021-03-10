import { createSlice} from '@reduxjs/toolkit';
import { IRawCharacter } from '../../types/IRawCharacter';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    rows: [],
    page: 1,
    info: {}
  },
  reducers: {
    updateCharacter: (state, action) => {
      const { id } = action.payload
      
      if(!! id === false) throw '[id] does not exists'

      return {
        ...state,
        rows: state.rows
          .map((character: IRawCharacter) => character.id === id ? ({ ...character, ...action.payload }) : character) as any
      }
    },
    deleteCharacter: (state, action) => {
      const id = action.payload

      if(!! +id === false) throw 'deleteCharacter [id] param must be a integer.'

      return {
        ...state,
        rows: state.rows.filter((character: IRawCharacter) => character.id !== id)
      }
    },
    setInitialCharacters: (state, action) => {
      return { ...state, rows: action.payload }
    },
    setInitialPage: (state, action) => ({...state, page: action.payload }),
    setInitialInfo: (state, action) => ({...state, info: action.payload })
  },
});

export const {
    updateCharacter,
    deleteCharacter,
    setInitialCharacters,
    setInitialPage,
    setInitialInfo 
} = charactersSlice.actions;

export const characters = (state: any) => state.characters.rows as IRawCharacter[];
export const page = (state: any) => state.characters.page;
export const info = (state: any) => state.characters.info;

export default charactersSlice.reducer;