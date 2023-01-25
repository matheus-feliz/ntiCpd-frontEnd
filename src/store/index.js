import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    servicoEquipamento: {},
    editServicoEquipamento: {},
    servicoUnidade: {},
    editServicoUnidade: { },
    imprimirUnidade: {},
    imprimirEquipamento: {}
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser: (state, item) => {
      state.user = item;
    },
    setServicoEquipamento: (state, item) => {
      state.servicoEquipamento = item;
    },
    setServicoUnidade: (state, item) => {
      state.servicoUnidade = item;
    },
    setEditServicoEquip: (state, item) => {
      state.editServicoEquipamento = item
    },
    setEditServicoUnid: (state, item) => {
      state.editServicoUnidade = item
    },
    setImprimirUnidade: (state, item) => {
      state.imprimirUnidade = item
    },
    setImprimirEquipamento: (state, item) => {
      state.imprimirEquipamento = item
    }

  }
})
