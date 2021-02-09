import React from "react";
import style from './YaMap.module.css'

export const YaMap = () => {
    return (
        <div className={style.map} >
            <a href="https://yandex.ru/maps/org/energotelekom/1582049910/?utm_medium=mapframe&utm_source=maps">
                ЭнергоТелеком
            </a>
            <a href="https://yandex.ru/maps/66/omsk/category/office_consumables/184105558/?utm_medium=mapframe&utm_source=maps"
               className={style.mapDescription}>
                Расходные материалы для оргтехники в Омске</a>
            <a href="https://yandex.ru/maps/66/omsk/category/information_security/184105372/?utm_medium=mapframe&utm_source=maps"
               className={style.mapDescription1}>
                Информационная безопасность в Омске</a>
            <iframe src="https://yandex.ru/map-widget/v1/-/CCUM5LUicD" height="400" frameBorder="1"
                    allowFullScreen={true} className={style.iframe} ></iframe>
        </div>
    )
}