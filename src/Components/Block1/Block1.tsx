import React from 'react'
import styleContainer from './../../Common/Styles/Container.module.css'
import styles from './Block1.module.scss'
import iconBlock from "./../../Assets/Images/Icon_block.png"

export const Block1 = () => {
    return (
        <div className={styles.block}>
            <div className={styleContainer.container}>
                <img src={iconBlock} alt={"it-doc_group"} className={styles.iconBlock}/>
                <p className={styles.about}>
                    IT Doc, выводит уровень предоставляемого сервисного обслуживания на принципиально новый уровень.
                    Впервые в нашем городе среднему и малому бизнесу и даже частному клиенту доступен уровень услуг,
                    который ранее был доступен только большим корпорациям.
                </p>
            </div>
        </div>
    )
}