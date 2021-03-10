import { createSlice} from '@reduxjs/toolkit';
import { IRawCharacter } from '../../types/IRawCharacter';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: [],
  reducers: {
    updateCharacter: (state, action) => {
      const { id } = action.payload
      
      if(!! id === false) throw '[id] does not exists'

      return state.map((character: IRawCharacter) => character.id === id ? ({ ...character, ...action.payload }) : character) as any
    },
    deleteCharacter: (state, action) => {
      const id = action.payload

      if(!! +id === false) throw 'deleteCharacter [id] param must be a integer.'

      return state.filter((character: IRawCharacter) => character.id !== id)
    },
    setInitialCharacters: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCharacter, deleteCharacter, setInitialCharacters } = charactersSlice.actions;

export const characters = (state: any) => state.characters as IRawCharacter[];

export default charactersSlice.reducer;