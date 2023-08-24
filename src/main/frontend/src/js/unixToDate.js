export default function unixToDate(t){
    let date = new Date(t*1000);
    let year = date.getFullYear();
    let month = "0" + (date.getMonth()+1);
    let day = "0" + date.getDate();
    let hour = "0" + date.getHours();
    let minute = "0" + date.getMinutes();
    let second = "0" + date.getSeconds();
    return year + "-" + month.substring(0,2) + "-" + day.substring(1,3) + " " + hour.substring(1,3) + ":" + minute.substring(1,3) + ":" + second.substring(1,3);
}