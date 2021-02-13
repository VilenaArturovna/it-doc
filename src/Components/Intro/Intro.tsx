import React from "react";
import style from './Intro.module.css'
import logotype from './../../Common/Images/logo.png'
import {Button} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudDownloadAlt, faMobileAlt, faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import Particles from "react-particles-js";

export const Intro = () => {
    return (
        <section className={style.intro}>
            <div className={style.logotype}>
                <Particles className={style.particles}
                    params={{
                        "particles": {
                            "number": {
                                "value": 250
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />
                <img src={logotype} className={style.logoImage} alt=""/>
                <Button variant={"contained"} color={"secondary"} className={style.btn}>Перейти в каталог услуг</Button>
                <Button variant={"contained"} color={"secondary"} className={style.btn}>Статус заказа</Button>
                <hr className={style.hr}/>
                <div className={style.iconsBlock}>
                    <FontAwesomeIcon icon={faEnvelopeOpen} className={style.icon}/>
                    <FontAwesomeIcon icon={faMobileAlt} className={style.icon}/>
                    <FontAwesomeIcon icon={faCloudDownloadAlt} className={style.icon}/>
                </div>

            </div>
        </section>
    )
}
