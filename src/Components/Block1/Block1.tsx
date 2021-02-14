import React from 'react'
import styleContainer from './../../Common/Styles/Container.module.css'
import style from './Block1.module.scss'
import SimpleModal from "../../Common/components/SimpleModal";
import iconBlock from "./../../Assets/Images/Icon_block.png"

export const Block1 = () => {
    return (
        <div className={style.block}>
            <div className={styleContainer.container}>
                <img src={iconBlock} alt={"it-doc_group"} className={style.iconBlock}/>
                <p className={style.about}>
                    IT Doc, выводит уровень предоставляемого сервисного обслуживания на принципиально новый уровень.
                    Впервые в нашем городе среднему и малому бизнесу и даже частному клиенту доступен уровень услуг,
                    который ранее был доступен только большим корпорациям.
                    <SimpleModal title={'О нас'}
                                 description={"МЫ ВЫПОЛНИМ любую работу или ремонт связанный с работой вашего офисного" +
                                 " оборудования начиная от таких простых задач как заправка картриджа заканчивая " +
                                 "сложными электронными ремонтами как замена видеочипа или процессора в ноутбуке, " +
                                 "и даже предоставим подменной оборудование на время ремонта вашего, для того чтоб " +
                                 "Ваши дела не останавливались, а двигались только ВПЕРЁД."}
                                 btnText={'Подробнее'} href={'https://www.npmjs.com/package/react-particles-js'} />
                </p>

            </div>
        </div>
    )
}