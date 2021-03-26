import React from "react";
import styles from './Header.module.scss'
import styleContainer from './../../Common/Styles/Container.module.css'
import logo from './../../Assets/Images/horizontal_on_transparent_2000x899px_by_logaster.png'
import logoRicoh from './../../Assets/Images/Ricoh_partner.png'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerContainer + ' ' + styleContainer.container}>
                <img src={logo} className={styles.logo} alt=""/>
                <img src={logoRicoh} className={styles.logo} alt=""/>
                <a href="">Контакты</a>
                <span><a href={'tel:+7381237-85-02'}>8 (3812) 37-85-03</a></span>
                <span>Пн-Пт<br/>8:00-18:00</span>
            </div>
        </div>
    )
}