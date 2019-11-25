import NoAuth from "@/pages/auth/noAuth";
import NoExit from "@/pages/auth/noExit";
import Load from "pages/auth/load"
import createSideLayout from '@/layouts/sideLayout';

import Example1Page from "@/pages/analyse/example1";
import Example2Page from "@/pages/analyse/example2";

import BasicLayout from "@/layouts/basicLayout";
const AnalyseLayout = createSideLayout('数据统计分析');
const BlankLayout = createSideLayout('');

const routerConf = [
  {
    path: "analyse",
    children: [
      {
        path: "/example1",
        layout: AnalyseLayout,
        component: Example1Page,
        children: []
      },
      {
        path: "/example2",
        layout: AnalyseLayout,
        component: Example2Page,
        children: []
      }
    ]
  },
  {
    path: "/",
    layout: BasicLayout,
    component: Load
  },
  {
    path: "/no-auth",
    layout: BlankLayout,
    component: NoAuth
  },
  {
    path: "*",
    layout: BlankLayout,
    component: NoExit
  }
];

export default routerConf;
