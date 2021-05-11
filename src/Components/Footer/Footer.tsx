import React from "react";
import style from './Footer.module.scss'
import styleContainer from "../../Common/Styles/Container.module.css";
import {YaMap} from "../Contacts/YaMap/YaMap";


export function Footer() {
    return (
        <footer className={style.footer}>
            <div className={`${styleContainer.container} ${style.footerContainer}`}>
                {/*<div>
                    Map of site
                </div>*/}
                <div>
                    <YaMap />
                </div>
                <div className={style.contacts} id={'contacts'}>
                    <span>г. Омск</span>
                    <span>ул. Голика, 2</span>
                    <span>Телефон: <a href={'tel:+7381237-85-02'}>+7 (3812) 37-85-02</a></span>
                    <span><a href="mailto:info@etcom.ru">info@etcom.ru</a></span>
                    <span>Понедельник – Пятница 08:00–17:00,<br/> без перерыва на обед, <br/>Суббота, Воскресенье - выходной</span>
                </div>
            </div>


                {/*<h2>Vilena Sazanova</h2>
                <div className={style.social}>---social icons---</div>
                <div><time>2021</time> All rights reserved</div>*/}

        </footer>
    )
}