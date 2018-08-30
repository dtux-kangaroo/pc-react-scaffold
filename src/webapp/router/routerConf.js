import Loadable from 'react-loadable'
import Loading from '../components/loading'
import MainTpl  from '../tpls/mainTpl/index'
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const NoExist = Loadable({loader: () => import('../pages/except/404'),loading: Loading});
const Markdown = Loadable({loader: () => import('../pages/markdown'),loading: Loading});
const Swiper = Loadable({loader: () => import('../pages/swiper'),loading: Loading});
const JsonView = Loadable({loader: () => import('../pages/jsonview'),loading: Loading});
const routerConf = [
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
      }
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
         path: '/md',
         layout: MainTpl,
         component: Markdown
       },
       {
        path: '/img',
        layout: MainTpl,
        component: Swiper
       },
       {
         path: '/jsonview',
         layout: MainTpl,
         component: JsonView
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
