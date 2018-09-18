import Loadable from 'react-loadable';
import Loading from 'components/loading';
import MainLayout  from 'layout/MainLayout';
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
const NoExist = Loadable({loader: () => import('../pages/except/404'),loading: Loading});
const Markdown = Loadable({loader: () => import('../pages/markdown'),loading: Loading});
const Swiper = Loadable({loader: () => import('../pages/swiper'),loading: Loading});
const JsonView = Loadable({loader: () => import('../pages/jsonview'),loading: Loading});
const Video = Loadable({loader:() => import('../pages/video'),loading: Loading});
const UploadAndDown = Loadable({ loader: () => import('../pages/uploadAndDown'), loading: Loading })
const SearchTable = Loadable({ loader: () => import('../pages/searchTable'), loading: Loading });
const List = Loadable({ loader: () => import('../pages/lists'), loading: Loading });
const Detail=Loadable({loader:() => import('../pages/detail'),loading: Loading});
const Draggable=Loadable({loader:() => import('../pages/draggable'),loading: Loading});
const TextEditor=Loadable({loader:() => import('../pages/textEditor'),loading: Loading});
const ResultSuccess=Loadable({loader:() => import('../pages/resultSuccess'),loading: Loading});
const ResultFailure=Loadable({loader:() => import('../pages/resultFailure'),loading: Loading});
const CodeEditor=Loadable({loader:() => import('../pages/codeEditor'),loading: Loading});
const Websocker=Loadable({loader:() => import('../pages/websocker'),loading: Loading});
const FormSearch=Loadable({loader:() => import('../pages/formSearch'),loading: Loading});
const Analysis=Loadable({loader:() => import('../pages/analysis'),loading: Loading});

const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: UserList,
    children: [
      {
        path: '/analysis',
        layout: MainLayout,
        component: Analysis
      },
      {
        path: '/upload',
        layout: MainLayout,
        component: UploadAndDown,
      },
      {
        path: '/map',
        layout: MainLayout,
        component: UploadAndDown,
      },
      {
        path: '/searchTable',
        layout: MainLayout,
        component: SearchTable,
      },
      {
        path: '/list',
        layout: MainLayout,
        component: List,
      },
      {
        path: '/workbench',
        layout: MainLayout,
        component: Home,
      }
    ]
  },
  {
    path: '/back',
    layout: MainLayout,
    component: UserList,
    children:[
      {
        path: '/form',
        layout: MainLayout,
        component: NoExist
      },
      {
        path: '/form_common',
        layout: MainLayout,
        component: NoExist
      },
      {
        path: '/form_search',
        layout: MainLayout,
        component: FormSearch
      },
      {
        path:'/detail',
        layout: MainLayout,
        component: Detail,
      },
      {
        path:'/result/success',
        layout: MainLayout,
        component: ResultSuccess,
      },
      {
        path:'/result/failure',
        layout: MainLayout,
        component: ResultFailure,
      },
    ]
  },
  {
    path: '/part',
    layout: MainLayout,
    component: UserList,
    children:[
       {
          path: '/drag',
          layout: MainLayout,
          component: NoExist
       },
       {
          path: '/code',
          layout: MainLayout,
          component: CodeEditor
       },
       {
          path: '/websocker',
          layout: MainLayout,
          component: Websocker
       },
       {
        path:'/draggable',
        layout: MainLayout,
        component: Draggable,
       },
       {
        path:'/textEditor',
        layout: MainLayout,
        component: TextEditor,
       },
       {
         path: '/md',
         layout: MainLayout,
         component: Markdown
       },
       {
        path: '/swiper',
        layout: MainLayout,
        component: Swiper
       },
       {
         path: '/jsonview',
         layout: MainLayout,
         component: JsonView
       },
       {
        path: '/code',
        layout: MainLayout,
        component: CodeEditor
       },
       {
         path: '/video',
         layout: MainLayout,
         component: Video
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
