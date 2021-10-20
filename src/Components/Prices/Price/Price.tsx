import {OrderType} from "../Prices";
import styles from './Price.module.scss'
import styled from "styled-components";

export const Price = (props: OrderType) => {
    const titleStyle = {
        color: props.titleColor
    }
    return (
        <Root>
            <Title style={titleStyle}>{props.title}</Title>
            <Description>{props.description}</Description>
            <List>
                {props.features.map((item, i) => <li key={i} style={titleStyle}><ListText>{item}</ListText></li>)}
            </List>
            <div><a href={props.href}>Узнать, как это работает</a></div>
        </Root>
    )
}

const Root = styled.div`
  width: 32%;
  height: 520px;
  background-color: beige;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0.6;
  transition: all 1.2s ease-out;

  &:hover {
    opacity: 1;
    background-color: burlywood;
    transform: scale(1.05);
  }
`
const Title = styled.h3`
  margin: 0 auto;
  text-align: center;
  font-weight: 400;
  font-size: 2.5rem;
`
const Description = styled.p`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  padding: 0 0.5rem;
  font-size: 1.1rem;
  line-height: 1.2;
  text-align: justify;
`
const List = styled.li`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`
const ListText = styled.span`
  color: black;
`
