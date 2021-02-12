import style from './FormContacts.module.css'
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faBuilding, faBusinessTime, faMobileAlt} from "@fortawesome/free-solid-svg-icons";

export const FormContacts = () => {
    return (
        <div className={style.form}>
            <h2>Контактная информация</h2>
            <div className={style.contactsContainer}>
                <div className={style.contactItem}>
                    <div className={style.iconBlock}><FontAwesomeIcon icon={faBuilding} className={style.icon}/></div>
                    <span>ул. Голика, 2</span>
                </div>
                <div className={style.contactItem}>
                    <FontAwesomeIcon icon={faMobileAlt} className={style.icon}/>
                    <span>Телефон: <a href={'tel:+7381237-85-02'}>+7 (3812) 37-85-02</a></span>
                </div>
                <div className={style.contactItem}>
                    <FontAwesomeIcon icon={faAt} className={style.icon}/>
                    <span><a href="mailto:info@etcom.ru">info@etcom.ru</a></span>
                </div>
                <div className={style.contactItem}>
                    <FontAwesomeIcon icon={faBusinessTime} className={style.icon}/>
                    <span>пн - пт 08:00–17:00, без перерыва на обед, сб, вс - выходной</span>
                </div>

            </div>
        </div>
    )
}

