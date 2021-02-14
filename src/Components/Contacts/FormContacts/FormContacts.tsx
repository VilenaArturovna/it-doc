import style from './FormContacts.module.scss'
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faBuilding, faBusinessTime, faMobileAlt} from "@fortawesome/free-solid-svg-icons";

export const FormContacts = () => {
    return (
        <div className={style.form}>
            <h2>Контактная информация</h2>
            <div className={style.contactsContainer}>
                <div className={style.contactItem}>
                    <div className={style.iconBlock}>
                        <FontAwesomeIcon icon={faBuilding} className={style.icon}/>
                    </div>
                    <span>ул. Голика, 2</span>
                </div>
                <div className={style.contactItem}>
                    <div className={style.iconBlock}>
                        <FontAwesomeIcon icon={faMobileAlt} className={style.icon}/>
                    </div>
                    <span>Телефон: <a href={'tel:+7381237-85-02'}>+7 (3812) 37-85-03</a></span>
                </div>
                <div className={style.contactItem}>
                    <div className={style.iconBlock}>
                        <FontAwesomeIcon icon={faAt} className={style.icon}/>
                    </div>
                    <span><a href="mailto:info@itdoc55.ru">info@etcom.ru</a></span>
                </div>
                <div className={style.contactItem}>
                    <div className={style.iconBlock}>
                        <FontAwesomeIcon icon={faBusinessTime} className={style.icon}/>
                    </div>
                    <span>пн - пт 08:00–17:00, без перерыва <br/>на обед, сб, вс - выходной</span>
                </div>

            </div>
        </div>
    )
}

