import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import MainLayout  from '@/layouts/BasicLayout';
import ContentLayout from '@/layouts/ContentLayout';
import SiderLayout from '@/layouts/SiderLayout';
const UserList = Loadable({loader: () => import('@/pages/User'),loading: Loading});
const NotFound = Loadable({loader: () => import('@/pages/Exception/404'),loading: Loading});
const Form=Loadable({loader:() => import('@/pages/Form'),loading: Loading});

const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: ContentLayout,
    component: UserList
  },
  {
    path: '/back',
    children:[
      {
        path: '/form',
        layout: SiderLayout,
        component: Form
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    component: NotFound,
  }
];

export default routerConf;
