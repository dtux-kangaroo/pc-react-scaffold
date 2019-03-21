
import MainLayout  from 'layout/mainLayout';
import DepartmentAssets from 'pages/dataPanoramic/departmentAssets'
import CategoryAssets from 'pages/dataPanoramic/categoryAssets'
import PersonalAssets from 'pages/dataPanoramic/personalAssets'
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login/index';
import Register from 'pages/auth/register/index';


const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: DepartmentAssets,
    children:[
        {
          path: '/category',
          layout: MainLayout,
          component: CategoryAssets,
          children:[]
        },
        {
          path: '/persional',
          layout: MainLayout,
          component: PersonalAssets,
          children:[]
        }

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
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
