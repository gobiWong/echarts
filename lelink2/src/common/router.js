import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}
//配置路由对象
export const getRouterData = app => {
  const routerConfig = {

    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },

    //客户管理路由
    '/enterprise/management':{
      component: dynamicWrapper(app, ['manage'], () => import('../routes/enterprise/management/Index')),
      name: '客户资料',
    },
    '/enterprise/followup':{
      component: dynamicWrapper(app, ['follow'], () => import('../routes/enterprise/followup/Index')),
      name: '客户跟进',
    },
    
    //平台定义路由

    '/definition/server':{
      component: dynamicWrapper(app, ['server'], () => import('../routes/definition/Server/Index')),
      name: '服务器类型',
    },
    '/definition/vos':{
      component: dynamicWrapper(app, ['vosServer'], () => import('../routes/definition/Vos/Index')),
      name: 'vos服务器',
    },
    '/definition/unified':{
      component: dynamicWrapper(app, ['unified'], () => import('../routes/definition/Unified/Index')),
      name: '统一平台',
    },
    '/definition/message':{
      component: dynamicWrapper(app, ['message'], () => import('../routes/definition/Message/Index')),
      name: '短信平台',
    },


    //设备管理路由

    '/equipment/equipment-list':{
      component: dynamicWrapper(app, ['equipmentList'], () => import('../routes/equipment/equipment-list/Index')),
      name: '设备列表',
    },
    '/equipment/equipment-follow':{
      component: dynamicWrapper(app, ['equipmentFollow'], () => import('../routes/equipment/equipment-follow/Index')),
      name: '设备跟进记录',
    },

    //设备定义路由

    '/equipment_definition/equipment-position':{
      component: dynamicWrapper(app, ['equipmentPosition'], () => import('../routes/equipmentDefinition/equipment-position/Index')),
      name: '设备位置',
    },
    '/equipment_definition/equipment-use':{
      component: dynamicWrapper(app, ['equipmentUse'], () => import('../routes/equipmentDefinition/equipment-use/Index')),
      name: '设备用途',
    },
    '/equipment_definition/equipment-owen':{
      component: dynamicWrapper(app, ['equipmentOwen'], () => import('../routes/equipmentDefinition/equipment-owen/Index')),
      name: '设备归属',
    },
    '/equipment_definition/equipment-type':{
      component: dynamicWrapper(app, ['equipmentType'], () => import('../routes/equipmentDefinition/equipment-type/Index')),
      name: '设备类型',
    },


    //系统设置

    '/systemsz':{
      component: dynamicWrapper(app, ['systemsz'], () => import('../routes/Systemsz/Index')),
      name: '系统设置',
    },

    //测试Wong声明路径动态加载新建界面
    '/wong/wlist':{
      component: dynamicWrapper(app, ['test_api'], () => import('../routes/Wong/Wlist/Index')),
      name: '测试自定义',
    },
    '/wong/wtest': {
      component: dynamicWrapper(app, ['wtest'], () => import('../routes/Wong/Wtest/Index')),
      name:'自定义列表'
  },
    

    //微信
    
    '/wechat_management/wechat_binding':{
      component: dynamicWrapper(app, ['binding'], () => import('../routes/Wechat/Binding/Index')),
      name: '微信绑定',
    },

    '/wechat_management/wechat_model':{
      component: dynamicWrapper(app, ['model'], () => import('../routes/Wechat/Model/Index')),
      name: '微信模板',
    },
    '/wechat_management/wechat_log': {
      component: dynamicWrapper(app, ['wecthatLog'], () => import('../routes/Wechat/log/Index')),
      name: '微信日志',
      //authority: 'admin', // 配置准入权限
    },
    '/wechat_management/wechat_port': {
      component: dynamicWrapper(app, ['port'], () => import('../routes/Wechat/port/Index')),
      name: '微信接口',
      //authority: 'admin', // 配置准入权限
    },

  //短息管理

  '/message_management/message_model':{
    component: dynamicWrapper(app, ['model'], () => import('../routes/Message/Model/Index')),
    name: '短信模板',
  },
  '/message_management/message_log': {
    component: dynamicWrapper(app, ['messageLog'], () => import('../routes/Message/log/Index')),
    name: '短信日志',
    //authority: 'admin', // 配置准入权限
  },
  '/message_management/message_port': {
    component: dynamicWrapper(app, ['messagePort'], () => import('../routes/Message/port/Index')),
    name: '短信接口',
    //authority: 'admin', // 配置准入权限
  },

    '/account/manager': {
      component: dynamicWrapper(app, ['manager'], () => import('../routes/account/manager/Index')),
      name: '管理员管理',
      //authority: 'admin', // 配置准入权限
    },
    '/account/role': {
      component: dynamicWrapper(app, ['role'], () => import('../routes/account/role/Index')),
      name: '角色管理',
      //authority: 'admin', // 配置准入权限
    },
    '/account/menu': {
      component: dynamicWrapper(app, ['menu'], () => import('../routes/account/menu/Index')),
      name: '菜单管理',
      //authority: 'admin', // 配置准入权限
    },
    '/account/operation': {
      component: dynamicWrapper(app, ['operation'], () => import('../routes/account/operation/Index')),
      name: '操作管理',
      //authority: 'admin', // 配置准入权限
    },

    

    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },

    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },

    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },

    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },

    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },

    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },

    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },

    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },

    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },


  };


  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {

    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};

    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }

    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });

  return routerData;

};
