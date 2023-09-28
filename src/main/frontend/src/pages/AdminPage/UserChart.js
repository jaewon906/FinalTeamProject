import {useEffect} from "react";
import ApexCharts from "apexcharts";
import axios from "axios";
import unixToDate from "../../js/unixToDate";

export default function UserChart(props){

    const oneDay = 24 * 3600 * 1000
    const a = new Date();
    const twoWeeks = 15 * 24 * 3600 * 1000
    let user=[]
    let dates = [];
    let dateArr=[]

    for(let i=1; i<=15; i++){
        const dateSevenDaysAgo = unixToDate(Math.floor(a-(twoWeeks-oneDay*i))/1000);

        dateArr[i-1] = dateSevenDaysAgo.split("-")[1] +"/"+
            dateSevenDaysAgo.split("-")[2].split(" ")[0]

    }
    console.log(props.today)

    useEffect(()=>{
        const options = {
            annotations: {
                points: [
                    {
                        x: dateArr[dateArr.length-1],
                        y: props.today,
                        marker: {
                            size: 6,
                            fillColor: "#fff",
                            strokeColor: "#2698FF",
                            radius: 2
                        },
                        label: {
                            borderColor: "#FF4560",
                            offsetX: -10,
                            offsetY: 0,
                            style: {
                                color: "#fff",
                                background: "#FF4560"
                            },

                            text: "TODAY"
                        }
                    }
                ]
            },
            chart: {
                type: 'line',
                width:550,
                height:250,
                toolbar:{
                    show:false
                },
            },
            series: [{
                name: 'newCustomer',
                data: []
            }],

            colors: ['#0095ff'],

            xaxis: {
                type:'range',
                categories: dateArr,
                tickAmount:6,
                labels: {
                    datetimeUTC: false // UTC 시간 사용 여부 설정
                },
                min: dateArr[dateArr.length-8], // 초기 시작 날짜
                max: dateArr[dateArr.length-1]

            },
            yaxis:{

            },
            markers:{
                size:5
            },
            grid: {
                padding:{
                    right:0
                }
            },

        }

        const chart = new ApexCharts(document.getElementById("chart"), options);

        axios.get(process.env.REACT_APP_DB_HOST+"/api/admin/summaryNewUserPerDay").then(res=>{
            let i=0

            const dataFromServer = res.data

            const datesFromServer = Object.keys(dataFromServer);

            const sortedDates = datesFromServer.sort((a, b) => new Date(a) - new Date(b));

            sortedDates.forEach(date => {
                const value = dataFromServer[date];
                dates[i] = date
                user[i] = value
                i++;
            });

            chart.updateSeries([{
                name: 'newCustomer',
                data: user
            }]).then()
        }).catch(e=> console.error(e))

        chart.render().then().catch();

    },[props.today])

    return(
        <div>
            <div id={"chart"}></div>
        </div>
    )
}