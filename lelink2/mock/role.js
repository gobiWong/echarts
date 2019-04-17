import {parse} from 'url';
import mockjs from 'mockjs';

let tableListDataSource = [];

for ( let i = 0; i < 10;  i+=1 ) {
    tableListDataSource.push({
        role_id: i,
        role_name: `角色${i}`,
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    })
}

export function getRole(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    //定义查询条件
    const params = parse(url, true).query;
    let dataSource = tableListDataSource;
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach(s => {
        filterDataSource = filterDataSource.concat(
          dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
        );
      });
      dataSource = filterDataSource;
    }
  
    if (params.role_name) {
      dataSource = dataSource.filter(data => data.role_name.indexOf(params.role_name) > -1);
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };
  
    return res.json(result);
  }

  export function postRole(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const body = (b && b.body) || req.body;
   

    const { method,  role_id, role_name } = body;

    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableListDataSource = tableListDataSource.filter(item => item.role_id !== role_id);
        break;
      case 'post':
        tableListDataSource.unshift({
            role_id: `${tableListDataSource.length}`,
            role_name:`角色${tableListDataSource.length}`,
            createdAt: new Date().getTime(),
            createdAt: new Date().getTime(),
        });
        break;
      case 'update':
        tableListDataSource = tableListDataSource.forEach((item) => {
          if (item.role_id === role_id) {
            Object.assign(item,{role_name,role_id});
          }
        });
        break;
      default:
        break;
    }

    const result = {
      list: tableListDataSource,
      pagination: {
        total: tableListDataSource.length,
      },
    };
    return res.json(result);
  }



export default {
   getRole,
   postRole,
};