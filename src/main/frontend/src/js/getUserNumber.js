export function getUserNumber(){

    const getCookie = (name) => {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }
    const parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    try {

        return parseJwt(getCookie("accessToken"));

    } catch (e) {
        console.error(e)
        return "";
    }
}