import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login'
import HomeView from '@/views/Home'
import CadastroDeUnidade from '@/components/unidade/CadastroUnidade'
import BuscaDeUnidade from '@/components/unidade/BuscaUnidade'
import ServicoDeUnidade from '@/components/unidade/ServicoUnidade'
import ListagemDeUnidade from '@/components/unidade/ListagemUnidade'
import ImpressaoDaUnidade from '@/components/unidade/ImprimirUnidade'
import CadastroDeEquipamento from '@/components/equipamento/CadastroEquipamento'
import BuscaDeEquipamento from '@/components/equipamento/BuscaEquipamento'
import ServicoDeEquipamento from '@/components/equipamento/ServicoEquipamento'
import ListagemDeEquipamento from '@/components/equipamento/ListagemEquipamento'
import ImpressaoDaEquipamento from '@/components/equipamento/ImprimirEquipamento'
import EsqueceuSenha from '@/components/login/EsqueceuSenha'
import Relatorio from '@/components/relatorio/Relatorio'
const routes = [{
        path: '/',
        name: 'login',
        component: LoginView,
    }, {
        path: '/esqueceusenha',
        name: 'esqueceusenha',
        component: EsqueceuSenha
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        children: [{
                path: 'unidade',
                name: 'unidade',
                children: [{
                        path: 'cadastrodeunidade',
                        name: 'cadastrodeunidade',
                        component: CadastroDeUnidade
                    },
                    {
                        path: 'buscadeunidade',
                        name: 'buscadeunidade',
                        component: BuscaDeUnidade
                    },
                    {
                        path: 'servicodeunidade',
                        name: 'servicodeunidade',
                        component: ServicoDeUnidade
                    },
                    {
                        path: 'listagemdeunidade/:id',
                        name: 'listagemdeunidade',
                        component: ListagemDeUnidade
                    },
                    {

                        path: 'impressaodaunidade',
                        name: 'impressaodaunidade',
                        component: ImpressaoDaUnidade
                    }
                ]

            },
            {
                path: 'equipamento',
                name: 'equipamento',
                children: [{
                        path: 'cadastrodeequipamento',
                        name: 'cadastrodeequipamento',
                        component: CadastroDeEquipamento
                    },
                    {
                        path: 'buscadeequipamento',
                        name: 'buscadeequipamento',
                        component: BuscaDeEquipamento
                    },
                    {
                        path: 'servicodeequipamento',
                        name: 'servicodeequipamento',
                        component: ServicoDeEquipamento
                    },
                    {
                        path: 'listagemdeequipamento/:id',
                        name: 'listagemdeequipamento',
                        component: ListagemDeEquipamento
                    },
                    {
                        path: 'impressaodeequipamento',
                        name: 'impressaodeequipamento',
                        component: ImpressaoDaEquipamento
                    }
                ]

            },{
                path: 'relatorio',
                name: 'relatorio',
                component: Relatorio
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router