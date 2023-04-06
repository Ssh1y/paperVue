import service from "@/utils/axios";

export function login(data) {
    return service({
        url: "/sms/system/login",
        method: "post",
        data
    });
}

export function getInfo() {
    return service({
        url: "/user/getInfo",
        method: "get"
    });
}

export function logout() {
    return service({
        url: "/user/logout",
        method: "get"
    });
}

export function updateInfo(data) {
    return service({
        url: "/user/updateInfo",
        method: "post",
        data
    });
}