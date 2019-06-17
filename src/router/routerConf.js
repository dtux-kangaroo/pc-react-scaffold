import Loadable from 'react-loadable';
import Loading from 'components/loading';
import TopLayout  from 'layout/topLayout';
import MainLayout  from 'layout/mainLayout';
import Home from 'pages/home';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: Home,
    children:[
    ]
  },
  {
   path:'/login',
   layout: null,
   component: Login,
  },
  {
    path:'/register',
    layout: null,
    component: Register,
   },
		{
		path: '*',
    layout: TopLayout,
    component: Page404,
  }
];

export default routerConf;
