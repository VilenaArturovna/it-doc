import React from "react";
import style from './Contacts.module.scss'
import {YaMap} from '../Footer/components/YaMap';
import styleContainer from './../../Common/Styles/Container.module.css'
import {FormContacts} from "./FormContacts/FormContacts";
import bg from './../../Common/Images/tild3366-6633-4839-a638-633363316466__1.jpg'


export const Contacts = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`
    }
    return (
        <section className={style.contactsBlock} style={bgStyle}>
            <div className={`${styleContainer.container} ${style.container}`}>
                <YaMap/>
                <FormContacts />
            </div>
        </section>
    )
}
