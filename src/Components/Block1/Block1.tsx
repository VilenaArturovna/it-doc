import React from 'react'
import styleContainer from './../../Common/Styles/Container.module.css'
import styles from './Block1.module.scss'

export const Block1 = () => {
    return (
        <div className={styles.block}>
            <div className={styleContainer.container}>
                <h2>Также мы выполним для Вас</h2>
                <div className={styles.content}>
                    <div>
                        <h3>Ремонт <span>печатной техники</span></h3>
                        <p>Ремонты любой сложности от технического обслуживания до сложных ремонтов электронных
                            компонентов к Вашим услугам</p>
                        <ul>
                            <li>Команда высококвалифицированных инженеров с большим опытом работы</li>
                            <li>Профессиональные инструменты и приборы, позволяющие быстро найти поломку и качественно
                                ее устранить</li>
                            <li>Самые популярные и ходовые запчасти в наличии на складе</li>
                            <li>Собственный автопарк позволяет нам быстро добраться к Вам</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Ремонт <span>любой офисной техники</span></h3>
                        <p>Ремонты офисной, компьютерной техники от замены клавиатуры на Вашем ноутбуке до замены
                            микрочипа сервера</p>
                    </div>
                </div>
            </div>
        </div>
    )
}