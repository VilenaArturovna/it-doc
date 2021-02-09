import React from "react";
import style from './Intro.module.css'
import logotype from './../../Common/Images/logo.png'
import {Button} from "@material-ui/core";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import EmailIcon from '@material-ui/icons/Email';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Intro = () => {
    return (
        <section className={style.intro}>
            <div className={style.logotype}>
                <img src={logotype} className={style.logoImage} alt=""/>
                <Button variant={"contained"} color={"secondary"} className={style.btn}>Перейти в каталог услуг</Button>
                <Button variant={"contained"} color={"secondary"} className={style.btn}>Статус заказа</Button>
                <hr className={style.hr}/>
                <div className={style.iconsBlock}>
                    <AddIcCallIcon className={style.icon} />
                    <EmailIcon className={style.icon}/>
                    <CloudDownloadIcon className={style.icon}/>
                </div>

            </div>
        </section>
    )
}
