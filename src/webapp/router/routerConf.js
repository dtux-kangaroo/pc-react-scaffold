import Loadable from 'react-loadable'
import Loading from '../components/loading'
import MainTpl  from '../tpls/mainTpl/index'
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const NoExist = Loadable({loader: () => import('../pages/except/404'),loading: Loading});
// const Detail=Loadable({loader:() => import('../pages/detail'),loading: Loading});
const Result=Loadable({loader:() => import('../pages/result'),loading: Loading});
import Detail from '../pages/detail';
const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainTpl,
    component: UserList,
    children:[
      {
        path: '/dashboard',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/workbench',
        layout: MainTpl,
        component: Home,
      }
    ]
  },
  {
    path: '/back',
    layout: MainTpl,
    component: UserList,
    children:[
      {
        path: '/form',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/form_common',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/form_search',
        layout: MainTpl,
        component: NoExist
      },
      {
        path:'/detail',
        layout: MainTpl,
        component: Detail,
      },
      {
        path:'/result',
        layout: MainTpl,
        component: Result,
      },
    ]
  },
  {
    path: '/parts',
    layout: MainTpl,
    component: UserList,
    children:[
       {
        path: '/drag',
        layout: MainTpl,
        component: NoExist
       }
    ]
  },
  {
    path: '*',
    layout: null,
    component: NoExist,
  },
];

export default routerConf;
