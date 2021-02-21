import React from 'react'
import styleContainer from './../../Common/Styles/Container.module.css'
import style from './Block1.module.scss'
import iconBlock from "./../../Assets/Images/Icon_block.png"
import {Bounce} from "react-awesome-reveal";

export const Block1 = () => {
    return (
        <div className={style.block}>
            <div className={styleContainer.container}>
                <img src={iconBlock} alt={"it-doc_group"} className={style.iconBlock}/>
                <div><Bounce><p className={style.about}>
                    IT Doc, выводит уровень предоставляемого сервисного обслуживания на принципиально новый уровень.
                    Впервые в нашем городе среднему и малому бизнесу и даже частному клиенту доступен уровень услуг,
                    который ранее был доступен только большим корпорациям.

                </p></Bounce></div>


            </div>
        </div>
    )
}