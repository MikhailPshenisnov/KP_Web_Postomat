import axios from "axios";

export const appApiIns = axios.create({
    baseURL: 'http://localhost:5128/ShopApi/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export function GetProductsApi() {
    return appApiIns.get("GetProducts");
}

export function GetUserApi() {
    return appApiIns.get("GetUser");
}

export function RegisterUserApi(username: string, password: string) {
    return appApiIns.get("RegisterUser", {
        headers: {
            "username": username,
            "password": password,
        },
    });
}

export function LoginUserApi(username: string, password: string) {
    return appApiIns.get("LoginUser", {
        headers: {
            "username": username,
            "password": password,
        },
    });
}

export function LogoutUserApi() {
    return appApiIns.get("LogoutUser");
}

export function SetEmptyCookiesApi() {
    return appApiIns.get(`SetEmptyCookies`);
}

export function UpdateUserCartApi(cart: string) {
    return appApiIns.get("UpdateUserCart", {
        headers: {
            "cart": cart
        }
    });
}