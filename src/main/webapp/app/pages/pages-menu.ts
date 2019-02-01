import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: 'nb-home',
    link: '/section/dashboard',
    home: true,
  },
  {
    title: '界面',
    group: true,
  },
  {
    title: '界面功能',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: '按钮',
        link: '/pages/ui-features/buttons',
      },
      {
        title: '栅格分布',
        link: '/pages/ui-features/grid',
      },
      {
        title: '图标',
        link: '/pages/ui-features/icons',
      },
      {
        title: '模态弹出框',
        link: '/pages/ui-features/modals',
      },
      {
        title: '悬浮样式',
        link: '/pages/ui-features/popovers',
      },
      {
        title: '文章段落相关',
        link: '/pages/ui-features/typography',
      },
      {
        title: '动态搜索',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: '标签页',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: '表单',
    icon: 'nb-compose',
    children: [
      {
        title: '输入框',
        link: '/pages/forms/inputs',
      },
      {
        title: '布局',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: '组件',
    icon: 'nb-gear',
    children: [
      {
        title: '树',
        link: '/pages/components/tree',
      }, {
        title: '通知',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: '地图',
    icon: 'nb-location',
    children: [
      {
        title: '谷歌地图',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet 地图',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble 地图',
        link: '/pages/maps/bubble',
      },
     {
        title: 'Lbsamap 地图',
        link: '/pages/maps/lbsamap',
     },
    ],
  },
  {
    title: '图表',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: '编辑器',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: '表格',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
