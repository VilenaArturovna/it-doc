import logo from './../../Assets/Images/IT Doc Team.png'
import styleContainer from './../../Common/Styles/Container.module.css'
import styles from './Main.module.scss'



export const Main = () => {

    return (
        <section>
            <div className={styles.container + ' ' + styleContainer.container}>
                <img src={logo} alt="logo"/>
                <div>
                    <h2>5 причин, почему следует выбрать нас</h2>
                    <ul>
                        <li><span>It Doc</span> – это команда высококвалифицированных специалистов</li>
                        <li>Мы предлагаем ПОЛНЫЙ спектр услуг от заправки картриджа, до сложных электронных ремонтов <b>ЛЮБОЙ</b> офисной техники</li>
                        <li>Наличие профессионального оборудования, для ремонта  и обслуживания офисной техники, а так же <b>огромный опыт</b></li>
                        <li>Вы сможете снять вопрос содержания и ремонта офисной техники, имея <span>ОДНОГО ПАРТНЁРА</span> в лице <span>It Doc</span></li>
                        <li><b>Прозрачное</b> и понятное ценообразование</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}