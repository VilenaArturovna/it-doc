import style from './FormContacts.module.css'
import React from "react";

export const FormContacts = () => {
    return (
        <div className={style.form}>
            <h2>Контактная информация</h2>
            <div className={style.contactsContainer}>
                <div className={style.contactItem}><span>ул. Голика, 2</span></div>
                <div className={style.contactItem}><span>Телефон: <a href={'tel:+7381237-85-02'}>+7 (3812) 37-85-02</a></span></div>
                <div className={style.contactItem}><span><a href="mailto:info@etcom.ru">info@etcom.ru</a></span></div>
                <div className={style.contactItem}><span>пн - пт 08:00–17:00, без перерыва на обед, сб, вс - выходной</span></div>

            </div>
        </div>
    )
}

