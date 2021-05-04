import styleContainer from './../../Common/Styles/Container.module.css'
import style from './Block2.module.scss'
import cartridge from './../../Assets/Images/kartridj_gg_2.png'

export const Block2 = () => {
    return (
        <div className={style.block}>
            <div className={styleContainer.container}>
                <img src={cartridge} alt=""/>
                <h2>Профессиональный подход к обслуживанию картриджей</h2>
                <ul>
                    <li>Использование только высококачественных материалов</li>
                    <li>Замена ресурсных запчастей</li>
                    <li>Несколько вариантов предоставления услуг, каждый подберёт для себя максимально удобные и
                        выгодные варианты сотрудничества
                    </li>
                </ul>
            </div>
        </div>
    )
}