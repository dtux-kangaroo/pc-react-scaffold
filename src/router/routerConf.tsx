
import MainLayout  from 'layout/mainLayout';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login/index';
import Register from 'pages/auth/register/index';
// import Home from 'pages/home'
import User from 'pages/user'

import Traffic from 'pages/traffic';
import Trade from 'pages/trade';
import Overview from 'pages/overview';
import HolidayData from 'pages/holidayData';
import CurrentData from 'pages/currentData/index';

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
    component: Overview,
  },
  {
    path: '/parking-special/holiday-data',
    layout: MainLayout,
    component: HolidayData,
  },
  {
    path: '/parking-special/cur-data',
    layout: MainLayout,
    component: CurrentData,
  },
  {
    path: '/parking-special/traffic-flow',
    layout: MainLayout,
    component: Traffic,
  },
  {
    path: '/parking-special/trade-data',
    layout: MainLayout,
    component: Trade,
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
