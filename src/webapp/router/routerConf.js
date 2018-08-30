import Loadable from 'react-loadable'
import Loading from '../components/loading'
import MainTpl  from '../tpls/mainTpl/index'
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const NoExist = Loadable({loader: () => import('../pages/except/404'),loading: Loading});
const Detail=Loadable({loader:() => import('../pages/detail'),loading: Loading});
const ResultSuccess=Loadable({loader:() => import('../pages/resultSuccess'),loading: Loading});
const ResultFailure=Loadable({loader:() => import('../pages/resultFailure'),loading: Loading});
const CodeEditor=Loadable({loader:() => import('../pages/codeEditor'),loading: Loading});
const Websocker=Loadable({loader:() => import('../pages/websocker'),loading: Loading});

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
        path:'/result/success',
        layout: MainTpl,
        component: ResultSuccess,
      },
      {
        path:'/result/failure',
        layout: MainTpl,
        component: ResultFailure,
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
       },
       {
          path: '/code',
          layout: MainTpl,
          component: CodeEditor
       },
       {
          path: '/websocker',
          layout: MainTpl,
          component: Websocker
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
