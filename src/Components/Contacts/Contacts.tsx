import React from "react";
import style from './Contacts.module.css'
import {YaMap} from "./YaMap/YaMap";
import styleContainer from './../../Common/Styles/Container.module.css'
import {FormContacts} from "./FormContacts/FormContacts";


export const Contacts = () => {
    return (
        <section className={style.contactsBlock}>
            <div className={`${styleContainer.container} ${style.container}`}>
                <YaMap/>
                <FormContacts />
            </div>
        </section>
    )
}