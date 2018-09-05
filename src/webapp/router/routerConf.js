import Loadable from 'react-loadable';
import Loading from '../components/loading';
import MainTpl  from '../tpls/mainTpl/index';
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
    layout: MainTpl,
    component: UserList,
    children: [
      {
        path: '/analysis',
        layout: MainTpl,
        component: Analysis
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
      },
      {
        path: '/workbench',
        layout: MainTpl,
        component: Home,
      }
    ]
  },
  {
    path: '/back',
    layout: MainTpl,
    component: UserList,
    children:[
      {
        path: '/form',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/form_common',
        layout: MainTpl,
        component: NoExist
      },
      {
        path: '/form_search',
        layout: MainTpl,
        component: FormSearch
      },
      {
        path:'/detail',
        layout: MainTpl,
        component: Detail,
      },
      {
        path:'/result/success',
        layout: MainTpl,
        component: ResultSuccess,
      },
      {
        path:'/result/failure',
        layout: MainTpl,
        component: ResultFailure,
      },
    ]
  },
  {
    path: '/part',
    layout: MainTpl,
    component: UserList,
    children:[
       {
          path: '/drag',
          layout: MainTpl,
          component: NoExist
       },
       {
          path: '/code',
          layout: MainTpl,
          component: CodeEditor
       },
       {
          path: '/websocker',
          layout: MainTpl,
          component: Websocker
       },
       {
        path:'/draggable',
        layout: MainTpl,
        component: Draggable,
       },
       {
        path:'/textEditor',
        layout: MainTpl,
        component: TextEditor,
       },
       {
         path: '/md',
         layout: MainTpl,
         component: Markdown
       },
       {
        path: '/swiper',
        layout: MainTpl,
        component: Swiper
       },
       {
         path: '/jsonview',
         layout: MainTpl,
         component: JsonView
       },
       {
        path: '/code',
        layout: MainTpl,
        component: CodeEditor
       },
       {
         path: '/video',
         layout: MainTpl,
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
