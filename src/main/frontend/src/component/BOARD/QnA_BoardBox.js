import {Link, useLocation} from "react-router-dom";
import {React} from "react";


const QnA_BoardBox = (props) => {


    const createdDateTime = new Date(props.createdTime);
    const year = createdDateTime.getFullYear();
    const month = createdDateTime.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = createdDateTime.getDate();
    const hours = createdDateTime.getHours();
    const minutes = createdDateTime.getMinutes();
    const formattedCreatedTime = `${year}-${month}-${day}`;


    return (
        <tr>
            <td style={{ width: '5%' }}>{props.id}</td>
            <td style={{ width: '15%' }}>{props.category}</td>
            <td style={{ width: '18%' }}>
                <Link
                    to={{
                        pathname: `/home/board/detail/${props.id}`,
                        state: { id: props.id, currentPage: props.currentPage }
                    }}
                >
                    {props.title}
                </Link>
            </td>
            <td style={{ width: '35%' }}>
                <Link
                    to={{
                        pathname: `/home/board/detail/${props.id}`,
                        state: { id: props.id, currentPage: props.currentPage }
                    }}
                >
                    {props.content.includes('.') ? props.content.substring(0,props.content.indexOf('.')+1) : props.content}
                </Link>
            </td>
            <td>{props.writer}</td>
            <td>{props.view}</td>
            <td>{formattedCreatedTime}</td>
        </tr>

    );
};

export default QnA_BoardBox;
