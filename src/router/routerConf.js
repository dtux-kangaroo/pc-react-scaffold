import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import MainLayout  from '@/layouts/BasicLayout';
import ContentLayout from '@/layouts/ContentLayout';
import SiderLayout from '@/layouts/SiderLayout';
const UserList = Loadable({loader: () => import('@/pages/UserList'),loading: Loading});
const Form = Loadable({loader:() => import('@/pages/Form'),loading: Loading});



import NotFound from '@/pages/Exception/404' 
import Error from '@/pages/Exception/500'
import NoAccess from '@/pages/Exception/403' 

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
    path:'/500',
    layout: MainLayout,
    component:Error
  },
  {
    path:'/403',
    layout: MainLayout,
    component:NoAccess
  },
  {
    path: '*',
    layout: MainLayout,
    component: NotFound,
  }
];

export default routerConf;
