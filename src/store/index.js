import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    servicoEquipamento:{},
    editServicoEquipamento:{},
    servicoUnidade:{}
  },
  getters: {
    getUser(state){
      return state.user;
    }
  },
  mutations: {
    setUser:(state, item)=>{
      state.user = item;
    },
    setServicoEquipamento:(state,item)=>{
      state.servicoEquipamento = item;
    },
    setServicoUnidade:(state, item)=>{
      state.servicoUnidade = item;
    },
    setEditServicoEquip:(state, item)=>{
      state.editServicoEquipamento=item
    }

  }
})
