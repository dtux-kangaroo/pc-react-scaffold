
import MainLayout  from 'layout/mainLayout';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login/index';
import Register from 'pages/auth/register/index';
import Home from 'pages/home'
import User from 'pages/user'


const routerConf = [
  {
    path:"/",
    redirect:"/parking-special/data-overview"
  },
  {
    path:"/parking-special",
    redirect:"/parking-special/data-overview"
  },
  {
    path: '/parking-special/data-overview',
    layout: MainLayout,
    component: Home,
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
