import React, {useEffect, useState} from 'react';
import style from './Header.module.scss'
import {Nav} from "./Nav/Nav";
import styleContainer from './../../Common/Styles/Container.module.css'
import logo from './../../Common/Images/logo.svg'
import {Fade} from "react-awesome-reveal";


export const Header = () => {

    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 500) setShow(true);
        else setShow(false);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

    }, []);

    if (!show) return null;

    return (
        <div onScroll={handleScroll}>

            <Fade
                className={style.header}>
                <div className={`${styleContainer.container} ${style.headerContainer}`}>
                    <img src={logo} alt="logo" className={style.logo}/>
                    <Nav/>
                </div>

            </Fade>

        </div>
    )
}