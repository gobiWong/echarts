export function setAccessToken(token) {
  return localStorage.setItem('token', token);
}

export function getAccessToken() {
  return localStorage.getItem('token');
}

export function setUserInfo(username) {
  return localStorage.setItem('username', username);
}

export function getUserInfo() {
  return localStorage.getItem('username');
}

export function setUserId(userid) {
  return localStorage.setItem('userid', userid);
}

export function getUserId() {
  return localStorage.getItem('userid');
}
