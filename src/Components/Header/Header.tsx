import React from "react";
import style from './Header.module.css'
import {Nav} from "./Nav/Nav";
import styleContainer from './../../Common/Styles/Container.module.css'
import logo from './../../Common/Images/logo.svg'

export const Header = () => {
    return (
        <header className={style.header}>
            <div className={`${styleContainer.container} ${style.headerContainer}`}>
                <img src={logo} alt="logo" className={style.logo}/>
                <Nav/></div>
        </header>
    )
}