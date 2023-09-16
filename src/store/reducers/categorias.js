<<<<<<< Updated upstream
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';

const initialState = [];

export const buscarCategoria = createAsyncThunk(
  'categproas/buscar',
  categoriasService.buscar

=======
import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';
import { resetarCarrinho } from './carrinho';

const { toast } = createStandaloneToast();

const initialState = [];

export const buscarCategorias = createAsyncThunk(
  'categorias/buscar',
  categoriasService.buscar
>>>>>>> Stashed changes
);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
<<<<<<< Updated upstream
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
=======
  extraReducers: builder => {
    builder
    .addCase(
      buscarCategorias.fulfilled,
      (state, { payload }) => {
        toast({
          title: 'Sucesso!',
          description: 'Categorias carregadas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
        return payload;
      }
    )
    .addCase(
      buscarCategorias.pending,
      (state, { payload }) => {
        toast({
          title: 'Carregando',
          description: 'Carregando categorias',
          status: 'loading',
          duration: 2000,
          isClosable: true
        })
      }
    )
    .addCase(
      buscarCategorias.rejected,
      (state, { payload }) => {
        toast({
          title: 'Erro',
          description: 'Erro na busca de categorias',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    )
    .addCase(
      resetarCarrinho.type,
      () => {
        toast({
          title: 'Sucesso!',
          description: 'Compra completada com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
    )
  }
>>>>>>> Stashed changes
});

export default categoriasSlice.reducer;