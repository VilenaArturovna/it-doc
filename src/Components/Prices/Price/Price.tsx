import {OrderType} from "../Prices";


export const Price = (props: OrderType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>{props.description}</div>
            <ul></ul>
            <div><a href={props.href}>Узнать, как это работает</a></div>
        </div>
    )
}