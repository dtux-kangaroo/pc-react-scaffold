import { createHashHistory } from 'history';
export const history = createHashHistory();
export const filterMenu = (location, navData, authCode) => {
  if (!navData.length || !authCode.length) return;
  let menuKeys = location.pathname.match(/(\/[a-z]+)/g) || [], curCode = "", default_url = "";
  let curUrl = menuKeys.length > 3 ? menuKeys.slice(0, 3).join('') : location.pathname;
  let setDefaultUrl = (item) => {
    authCode.forEach(auth => {
      if (auth == item.permissionCode) {
        default_url = item.permissionUrl;
        return;
      }
    })
  }
  let loopMenu = (data, flag) => {
    data.forEach(item => {
      if (!item.children.length) {
        if (flag) {
          if (item.permissionUrl == curUrl) {
            curCode = item.permissionCode;
            return;
          }
        } else {
          if (!default_url.length) {
            setDefaultUrl(item);
          }
        }
      } else {
        loopMenu(item.children, flag)
      }
    })
  }
  loopMenu(navData, false);
  loopMenu(navData, true);
  if (default_url.length) {
    if (default_url == location.pathname) return;
    if (authCode.includes(curCode)) {
      //history.push(location.pathname);
    } else {
      history.push(default_url);
    }
  } else {
    if (!authCode.includes(curCode)) {
      history.push('/no-auth');
    }
  }
}

export const formatCode = (data) => {
  let codes = [];
  data.forEach(item => {
    for (let [key, val] of Object.entries(item)) {
      codes.push(val);
    }
  })
  const map = new Map();
  codes = codes.filter((key) => !map.has(key) && map.set(key, 1))
  return codes;
}

export const redirectTop = (navData, authCode) => {
  let default_url_arr = [];
  let loopTop = (data) => {
    data.forEach(item => {
      if (!item.children.length) {
        if (authCode.includes(item.permissionCode)) {
          default_url_arr.push(item.permissionUrl)
          return;
        }
      } else {
        loopTop(item.children)
      }
    })
  }
  loopTop(navData);
  history.push(default_url_arr[0]);
}

export const delAllCookies = function (domain, path) {
  var cookies = document.cookie.split(";");
  var d = new Date(0);
  for (var i = 0; i < cookies.length; i++)
    if (cookies[i]) {
      setCookie(cookies[i].split("=")[0], '', d.toUTCString());
    }
}
