import {useEffect} from "react";
import ApexCharts from "apexcharts";

export default function UserChart(){

    const a = new Date();

   console.log(a.getDate() + 12)

    useEffect(()=>{
        const options = {
            chart: {
                type: 'line',
                width:450,
                height:250
            },
            series: [{
                name: 'sales',
                data: [30,40,35,50,49,60,70,91,1250]
            }],

            colors: ['#0095ff'],

            xaxis: {
                categories: [1993,1994,1995,1996,1997, 1998,1999]
            },


        }

        const chart = new ApexCharts(document.getElementById("chart"), options);

        chart.render().then().catch();
    },[])
    return(
        <>
            <div id={"chart"}></div>
        </>
    )
}