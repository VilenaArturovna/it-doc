import {OrderType} from "../Prices";
import styles from './Price.module.scss'
import bg from "../../../Common/Images/tild3366-6633-4839-a638-633363316466__1.jpg";


export const Price = (props: OrderType) => {
    const titleStyle = {
        color: props.titleColor
    }
    return (
        <div className={styles.item}>
            <h3 style={titleStyle}>{props.title}</h3>
            <p>{props.description}</p>
            <ul>
            {props.features.map((item, i) => <li key={i} style={titleStyle}><span>{item}</span></li> )}
            </ul>
            <div><a href={props.href}>Узнать, как это работает</a></div>
        </div>
    )
}