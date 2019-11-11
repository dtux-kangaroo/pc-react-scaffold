
import MainLayout  from 'layout/mainLayout';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login/index';
import Register from 'pages/auth/register/index';
// import Home from 'pages/home'
import User from 'pages/user'

import Overview from 'pages/overview';
import Home from '@/pages/home';

const routerConf = [
  {
    path:"/",
    redirect:"/data-analyse/data-overview"
  },
  {
    path:"/data-analyse",
    redirect:"/data-analyse/data-overview"
  },
  {
    path: '/home',
    layout: MainLayout,
    component: Home,
  },
  {
    path: '/data-analyse/data-overview',
    layout: MainLayout,
    component: Overview,
  },
  {
    path:'/user',
    layout: MainLayout,
    component: User,
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
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
