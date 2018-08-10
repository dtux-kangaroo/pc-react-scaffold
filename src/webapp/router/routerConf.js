import Loadable from 'react-loadable'
import Loading from '../components/loading'
import MainTpl  from '../tpls/mainTpl/index'
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const NoExist = Loadable({loader: () => import('../pages/except/404'),loading: Loading})
const routerConf = [
  {
    path: '/',
    layout: MainTpl,
    component: UserList,
    children:[
      {
        path: '/noExit',
        layout: MainTpl,
        component: NoExist
      }
    ]
  },
  {
    path: '/page3',
    layout: MainTpl,
    component: Home,
  },
  {
    path: '*',
    layout: null,
    component: NoExist,
  },
];

export default routerConf;
