import {useSelector} from "react-redux";

export default function ThemeToggleBtn() {

    const themeDefault = useSelector(data=>data.dataSet).mode
    const style = {
        width: '45px',
        borderRadius: '20px',
        border:'1px solid gray',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize:'14px',
        lineHeight:'20px',
        marginTop:'5px'
   
    }
    const inner = {
        transition : 'width 0.3s',
        width:themeDefault?'45px':'20px',
        height:'20px',
        backgroundColor:'tomato',
        borderRadius:'20px',
        display:'flex',
        
    }
    const circle = {
        transition: 'opacity 0.3s ease',
        borderRadius: '20px',
        width: '20px',
        height: '20px',
        backgroundColor: 'tomato',
        opacity:themeDefault? 0 : 1,
    }
    const outerCricle = {
        borderRadius:'20px',
        width:'20px',
        height:'20px',
        backgroundColor:'white',
        transition: 'margin-left 0.3s ease, opacity 0.3s ease',
        marginLeft: themeDefault ? '25px' : '0px'

    }
    return (

        <div style={style}>
            <div style={inner}>
                <div style={outerCricle} ><div style={circle}></div></div>
            </div>
        </div>

    )
}