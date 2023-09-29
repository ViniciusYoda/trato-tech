import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import bandeirasService from 'services/bandeiras';
import cartoesService from 'services/cartoes';
import usuariosService from 'services/usuarios';
import { carregarPagamento } from 'store/reducers/carrinho';
import { adicionarUsuario } from '../reducers/usuario';
import { mudarCarrinho, mudarQuantidade, mudarTotal } from '../reducers/carrinho';

const usuarioLogado = 1;

function* carregarPagamentoSaga() {
  try {
    const usuario = yield call(usuariosService.buscarPorId, usuarioLogado);
    const cartoes = yield call(cartoesService.buscarPorIdUsuario, usuarioLogado);
    const bandeiraIds = cartoes.map(cartao => cartao.bandeiraId);
    const bandeiras = yield call(bandeirasService.buscarPorId, bandeiraIds);
    const cartoesComBandeiras = cartoes.map(cartao => {
      const bandeiraDoCartao = bandeiras.find(bandeira => bandeira.id === cartao.bandeiraId);
      return { ...cartao, taxa: bandeiraDoCartao.taxa, bandeira: bandeiraDoCartao.nome };
    });
    yield put(adicionarUsuario({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch(e) {}
}

function* calcularTotal() {
  yield delay(500);
  const state = yield select();
  const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
    const item = state.itens.find(item => item.id === itemNoCarrinho.id);
    return total + item.preco * itemNoCarrinho.quantidade;
  }, 0);
  yield put(mudarTotal(total));
}

export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotal);
}