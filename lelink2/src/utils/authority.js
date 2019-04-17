// use localStorage to store the authority info, which might be sent from server in actual project.
//使用localstorage存储授权信息，该信息可能从实际项目中的服务器发送。
// 重写该方法实现路由权限调整
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('lelink-authority');
}

export function setAuthority(authority) {
  return localStorage.setItem('lelink-authority', authority);
}


// const expireTime = 60 * 60;

// export  function  unAuthorized(req, res, next) {
//   res.header('Access-Control-Expose-Headers', 'access-token');
//   const now = Date.now();

//   let unauthorized = true;
//   const token = req.headers['access-token'];
//   if (token) {
//     const expired = now - token > expireTime;
//     if (!expired) {
//       unauthorized = false;
//       res.header('access-token', now);
//     }
//   }

//   if (unauthorized) {
//     res.sendStatus(401);
//   } else {
//     next();
//   }
// };

