import http from './index';
// 部分接口需要取消缓存

// 账号密码登陆
export function loginByCellphone({
  phone,
  password,
  md5_password,
  captcha,
}: loginTypes) {
  return http.get(`/login/cellphone`, {
    params: {
      phone,
      password,
      md5_password,
      captcha,
      t: +Date.now(),
    },
  });
}
export function captchaSent({ phone }: { phone: string }) {
  return http.get(`/captcha/sent`, {
    params: {
      phone,
    },
  });
}

// 游客登陆
export function registerAnonimous() {
  return http.get(`/register/anonimous`);
}

// 查看登陆状态
export function loginStatus() {
  return http.get(`/login/status`, {
    params: {
      t: +Date.now(),
    },
  });
}
// 退出登陆
export function Logout() {
  return http.post(`/logout`, {
    data: {
      t: +Date.now(),
    },
  });
}

// 二维码 生成接口
export function loginQrCreate() {
  let key = '';
  return http
    .get(`/login/qr/key`, {
      params: {
        t: +Date.now(),
      },
    })
    .then((res: any) => {
      key = res.unikey;
      return http.get(`/login/qr/create`, {
        params: {
          key: res.unikey,
          qrimg: true,
        },
      });
    })
    .then((res) => {
      return {
        ...res,
        key,
      };
    });
}

// 轮询二维码登陆
export function qrCheck(key: string) {
  return http.get(`login/qr/check`, {
    isAll: true,
    params: {
      key,
      t: +Date.now(),
    },
  });
}
