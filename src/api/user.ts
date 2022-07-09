import http from './index'
 
// 账号密码登陆
export function loginByCellphone({phone,password}:{phone:string,password:string}) {
    return http.get(`/login/cellphone`,{
        params:{
            phone,
            password
        }
    })
}
// 查看登陆状态
export function loginStatus() { 
    return http(`/login/status`)
}