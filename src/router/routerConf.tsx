
// import Loadable from 'react-loadable';
// import Loading from 'components/loading';
// const Home =  Loadable({loader: () => import('../pages/home/index'),loading: Loading});
// const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
// const Login=Loadable({loader:() => import('../pages/auth/register/index'),loading:Loading});
// const Register=Loadable({loader:() => import('../pages/auth/register/index'),loading: Loading});
//import Home from 'pages/home/index';
//import TopLayout  from 'layout/topLayout';
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
