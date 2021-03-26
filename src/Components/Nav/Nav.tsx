import React from "react";
import styles from './Nav.module.scss'
import styleContainer from './../../Common/Styles/Container.module.css'

export const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.container + ' ' + styleContainer.container}>
                <div className={styles.menu}>
                    <a href="">Главная</a>
                    <a href="">Наши предложения</a>
                    <a href="">Акции</a>
                    <a href="">Партнерам</a>
                    <a href="">О нас</a>
                </div>
                <div className={styles.navBtns}>
                    <div className={styles.signIn + ' ' + styles.navBtn}><a role={'button'} href="" >Войти</a></div>
                    <div className={styles.order + ' ' + styles.navBtn}><a role={'button'} href="">Проверить <br/>статус заказа</a></div>
                </div>
            </div>
        </div>
    )
}
