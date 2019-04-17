import { isUrl } from '../utils/utils';

const menuData = [

  {
    name: '客户管理',
    icon: 'user',
    path: 'enterprise',
    children: [
      {
        name: '客户资料',
        path: 'management',
        // hideInMenu: true,
      },
      {
        name: '客户跟进',
        path: 'followup',
        // hideInMenu: true,
      },
    ],
  },
 
  {
    name: '设备管理 ',
    icon: 'tool',
    path: 'equipment',
    children: [
      {
        name: '设备列表',
        path: 'equipment-list',
        // hideInMenu: true,
      },
      {
        name: '设备跟进',
        path: 'equipment-follow',
        // hideInMenu: true,
      },
    ],
  },

  {
    name: '设备定义 ',
    icon: 'setting ',
    path: 'equipment_definition',
    children: [
      {
        name: '设备用途',
        path: 'equipment-use',
        // hideInMenu: true,
      },
      {
        name: '设备归属',
        path: 'equipment-owen',
      },
      {
        name: '设备类型',
        path: 'equipment-type',
      },
      {
        name: '设备位置',
        path: 'equipment-position',
      } 
    ],
  },

  {
    name: '平台定义',
    icon: 'profile',
    path: 'definition',
    children: [
      {
        name: '服务器类型',
        icon: 'database',
        path: 'server',
        // hideInMenu: true,
      },
      {
        name: 'vos服务器',
        icon: 'database',
        path: 'vos',
        // hideInMenu: true,
      },
      {
        name: '统一平台',
        icon: 'database',
        path: 'unified',
        // hideInMenu: true,
      },
      {
        name: '短信平台',
        icon: 'database',
        path: 'message',
        // hideInMenu: true,
      },
    ],
  },

  {
    name: '微信管理',
    icon: 'wechat',
    path: 'wechat_management',
    children: [
      {
        name: '微信绑定',
        path: 'wechat_binding',
        // hideInMenu: true,
      },
      {
        name: '微信模板',
        path: 'wechat_model',
        // hideInMenu: true,
      },
      {
        name: '微信接口',
        path: 'wechat_port',
        // hideInMenu: true,
      },
      {
        name: '微信日志',
        path: 'wechat_log',
        // hideInMenu: true,
      },
    ],
  },
  

  {
    name: '短信管理',
    icon: 'mail',
    path: 'message_management',
    children: [
      {
        name: '短信接口',
        path: 'message_port',
        // hideInMenu: true,
      },
      {
        name: '短信模板',
        path: 'message_model',
        // hideInMenu: true,
      },
      {
        name: '短信日志',
        path: 'message_log',
        // hideInMenu: true,
      },
    ],
  },

  {
    name: 'SIM卡管理',
    icon: 'inbox',
    path: 'SIM',
    children: [
      {
        name: 'SIM卡资料',
        path: 'SIM_data',
        // hideInMenu: true,
      },
      {
        name: 'SIM卡跟进',
        path: 'SIM_follow',
        // hideInMenu: true,
      },
    ],
  },

  {
    name: '系统设置 ',
    icon: 'tool',
    path: 'systemsz',

  },
  {
    name: '测试自定义',
    icon: 'tool',
    path: 'wong',
    children: [{
      name: '测试自定义详情',
      icon: 'tool',
      path: 'wlist',
    },
    {
      name: '测试自定义详情1',
      icon: 'heart',
      path: 'wtest',
    }]
  },
  {
    name: '账户管理',
    icon: 'user',
    path: 'account',
    children: [
      {
        name: '管理员',
        path: 'manager',
        // hideInMenu: true,
      },
      {
        name: '角色',
        path: 'role',
        // hideInMenu: true,
      },
      {
        name: '菜单',
        path: 'menu',
        // hideInMenu: true,
      },
      {
        name: '操作',
        path: 'operation',
        // hideInMenu: true,
      }
    ],
  },

 
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
    hideInMenu: true,
  },

  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
    hideInMenu: true,
  },

];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
