import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getStatistics, postStatistics } from './mock/statistics';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import { fetchVos } from './mock/vosServer';
import { fetchVosInfo } from './mock/vosInfo';
import { fetchBinding } from './mock/binding';
import { fetchModel } from './mock/model';
import { fetchPort } from './mock/port';
import { fetchMessageModel } from './mock/messageModel';
import { fetchMessagePort } from './mock/messagePort';
import { fetchMessageLog } from './mock/messageLog';
import { fetchUse } from './mock/equipmentUse';
import { fetchOwen } from './mock/equipmentOwen';
import { fetchPosition } from './mock/equipmentPosition';
import { fetchType } from './mock/equipmentType';
import { fetchList } from './mock/equipmentList';
import { fetchManage } from './mock/manage';
import { fetchFollow } from './mock/follow';
import { fetchServer } from './mock/server';
import { fetchUnified } from './mock/unified';
import { fetchMessage } from './mock/message';
import { fetchManager } from './mock/manager';
import { fetchSystemsz } from './mock/Systemsz';
import { fetchequipmentFollow } from './mock/equipmentFollow';
import { getRole,postRole } from './mock/role';
import { fetchMenu } from './mock/menu';
import { testBase } from './mock/wlist';
import {carousel} from './mock/carousel';
import { fetchOperation } from './mock/operation';


// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'GET /api/statistics': getStatistics,
  'POST /api/statistics': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postStatistics,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    res.header ('Access-Control-Expose-Headers', 'access-token');
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.header('access-token', Date.now());
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,


  'GET /vosServer/fetchVos': fetchVos,
  'GET /vosInfo/fetchVos': fetchVosInfo,
  'GET /binding/fetchBinding': fetchBinding,
  'GET /model/fetchModel': fetchModel,
  'GET /port/fetchPort': fetchPort,
  'GET /messageModel/fetchMessageModel': fetchMessageModel,
  'GET /messagePort/fetchMessagePort': fetchMessagePort,
  'GET /messageLog/fetchMessageLog': fetchMessageLog,
  'GET /systemsz/fetchSystemsz': fetchSystemsz,
  'GET /equipmentUse/fetchUse': fetchUse,
  'GET /equipmentOwen/fetchOwen': fetchOwen,
  'GET /equipmentPosition/fetchPosition': fetchPosition,
  'GET /equipmentType/fetchType': fetchType,
  'GET /equipmentList/fetchList': fetchList,
  'GET /manage/fetchManage': fetchManage,
  'GET /follow/fetchFollow': fetchFollow,
  'GET /server/fetchServer': fetchServer,
  'GET /menu/fetchMenu': fetchMenu,
  'GET /unified/fetchUnified': fetchUnified,
  'GET /message/fetchMessage': fetchMessage,
  'GET /manager/fetchManager': fetchManager,
  'GET /wlist/fetch1': testBase,
  'GET /wtest/fetchcarousel': carousel,
  'GET /operation/fetchOperation': fetchOperation,
  // 'POST /manager/fetchManager': {
  //   $params: {
  //     pageSize: {
  //       desc: '分页',
  //       exp: 2,
  //     },
  //   },
  //   $body: postManager,
  // },

  'GET /equipmentFollow/fetchequipmentFollow': fetchequipmentFollow,
  'GET /api/role': getRole,
  'POST /api/role': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRole,
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
