import styleContainer from './../../Common/Styles/Container.module.css'
import style from './Block3.module.css'
import bg from './../../Common/Images/tild3366-6633-4839-a638-633363316466__1.jpg'



export const Block3 = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`
    }
    return (
        <div className={style.block} style={bgStyle}>
            <div className={styleContainer.container} >

            </div>
        </div>
    )
}