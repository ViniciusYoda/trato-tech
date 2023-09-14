import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';

const initialState = [];

export const buscarCategoria = createAsyncThunk(
  'categproas/buscar',
  categoriasService.buscar

);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    adicionarCategorias: (state, { payload } ) => {
      state.push(...payload)
    }
   },

   extraReducers: builder => {
    builder.addCase(
      buscarCategoria.fulfilled,
      (state, { payload }) => {
        state.push(...payload)
      }
    )
   }
});

export const { adicionarCategorias } = categoriasSlice.actions;

export default categoriasSlice.reducer;