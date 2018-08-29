import Loadable from 'react-loadable'
import Loading from '../components/loading'
import MainTpl from '../tpls/mainTpl/index'
const Home = Loadable({ loader: () => import('../pages/home'), loading: Loading });
const UserList = Loadable({ loader: () => import('../pages/user/list'), loading: Loading });
const NoExist = Loadable({ loader: () => import('../pages/except/404'), loading: Loading })
const UploadAndDown = Loadable({ loader: () => import('../pages/uploadAndDown'), loading: Loading })
const SearchTable = Loadable({ loader: () => import('../pages/searchTable'), loading: Loading });
const List = Loadable({ loader: () => import('../pages/lists'), loading: Loading });
const routerConf = [
  {
    path: '/',
    layout: MainTpl,
    component: UserList,
    children: [
      {
        path: '/noExit',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/upload',
        layout: MainTpl,
        component: UploadAndDown,
      },
      {
        path: '/map',
        layout: MainTpl,
        component: UploadAndDown,
      },
      {
        path: '/searchTable',
        layout: MainTpl,
        component: SearchTable,
      },
      {
        path: '/list',
        layout: MainTpl,
        component: List,
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
