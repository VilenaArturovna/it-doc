import styleContainer from './../../Common/Styles/Container.module.css'
import style from './Block1.module.css'

export const Block1 = () => {
    return (
        <div className={style.block}>
            <div className={styleContainer.container}>
                <div className={style.about}>
                    IT Doc расширяет горизонты рынка ИТ-услуг нашего города и предлагает заключить договор на
                    обслуживание Вашей офисной печатной техники с простой и понятной структурой стоимости оказываемых
                    услуг.
                </div>
            </div>
        </div>
    )
}