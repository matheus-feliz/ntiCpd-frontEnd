import { createRouter, createWebHistory } from 'vue-router'
const LoginView = ()=>import('@/views/Login');
const HomeView = () => import('@/views/Home');
const CadastroDeUnidade = () => import('@/components/unidade/CadastroUnidade');
const BuscaDeUnidade = ()=>import('@/components/unidade/BuscaUnidade');
const ServicoDeUnidade = ()=> import('@/components/unidade/ServicoUnidade');
const ListagemDeUnidade = ()=> import('@/components/unidade/ListagemUnidade');
const ImpressaoDaUnidade = ()=>import('@/components/unidade/ImprimirUnidade');
const CadastroDeEquipamento = ()=>import('@/components/equipamento/CadastroEquipamento');
const BuscaDeEquipamento = ()=>import('@/components/equipamento/BuscaEquipamento');
const ServicoDeEquipamento = ()=>import ('@/components/equipamento/ServicoEquipamento');
const ListagemDeEquipamento = ()=>import ('@/components/equipamento/ListagemEquipamento');
const ImpressaoDaEquipamento = ()=>import ('@/components/equipamento/ImprimirEquipamento');
const EsqueceuSenha =()=> import('@/components/login/EsqueceuSenha');
const  Relatorio =()=>import('@/components/relatorio/Relatorio');
const Dashbord =() =>import('@/components/dashbord/dashbord');
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
            path:"",
            component:Dashbord
        },{
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
export default router;