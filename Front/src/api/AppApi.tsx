import axios from "axios";

export const appApiIns = axios.create({
    baseURL: 'http://localhost:5221/Postomat/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export function GetOrderApi(secretCode: string) {
    return appApiIns.get("GetOrder", {
        headers: {
            "secret_code": secretCode
        },
    });
}

export function DeliverOrderApi(secretCode: string, description: string, size: number) {
    return appApiIns.get("DeliverOrder", {
        headers: {
            "secret_code": secretCode,
            "description": description,
            "size": size.toString()
        },
    });
}

export function CreateUserApi(login: string, password: string, roleId: number) {
    return appApiIns.get("CreateUser", {
        headers: {
            "login": login,
            "password": password,
            "role_id": roleId.toString()
        },
    });
}

export function LoginUserApi(login: string, password: string) {
    return appApiIns.get("LoginUser", {
        headers: {
            "login": login,
            "password": password
        },
    });
}

export function SetEmptyCookiesApi() {
    return appApiIns.get("SetEmptyCookies");
}

export function GetUserApi() {
    return appApiIns.get("GetUser");
}

export function CheckAccessLvlApi() {
    return appApiIns.get("CheckAccessLvl");
}

export function LogoutUserApi() {
    return appApiIns.get("LogoutUser");
}