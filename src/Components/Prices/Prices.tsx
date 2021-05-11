import {Price} from "./Price/Price";
import styleContainer from './../../Common/Styles/Container.module.css'
import styles from './Prices.module.scss'

export type OrderType = {
    title: string
    description: string
    href: string
    features: string[]
    titleColor: string
}

const orders: Array<OrderType> = [
    {
        title: 'Fixed Price',
        description: 'Подойдёт компаниям, которым требуется регулярно заправлять картриджи к своей печатной технике. ' +
            'При этом режиме обслуживания вы сможете существенно сэкономить на ремонте и покупки нового картриджа',
        href: '',
        features: ['Цена не изменится',
            'Фиксированная цена, даже если картридж требует замены запчастей (восстановление)',
            'Если ваш картридж невозможно починить, IT Doc поменяет его на новый',
            'Гарантия'
        ],
        titleColor: '#7fba2f'
    },
    {
        title: 'Standard',
        description: 'Подойдёт как частным лицам, так и малому бизнесу. Возможность выполнения работ в вашем офисе ' +
            'или дома',
        href: '',
        features: ['Понятное ценообразование',
            'Профессиональный подход к обслуживанию картриджей/принтера/МФУ',
            'Возможность выполнения работ на территории заказчика',
            'Гарантия'
        ],
        titleColor: '#2678bc'
    },
    {
        title: 'Full-cycle',
        description: 'Идеально подходит, для среднего и крупного бизнеса. Но доступен и малым компаниям, и ИП. ' +
            'Вы снимите с себя или Ваших сотрудников вопрос о содержании Вашего парка печатной техники, тем самым ' +
            'высвободится время для дел, связанных непосредственно с профессиональной деятельностью. Не думай где, ' +
            'как и когда заправить картридж, занимайся тем, что тебе приносит доход.',
        href: '',
        features: ['Заправка картриджей БЕСПЛАТНО',
            'Ремонт вашей печатной техники БЕСПЛАТНО',
            'Необходимые запчасти БЕСПЛАТНО',
            'Выезд специалистов БЕСПЛАТНО',
            'Плановые ТО и профилактики БЕСПЛАТНО',
            'Подменное оборудование на время ремонта БЕСПЛАТНО'
        ],
        titleColor: 'red'
    },
]

export const Prices = () => {
    return (
        <div className={'pricesBlock'}>
            <div className={styles.container + ' ' + styleContainer.container}>
                {orders.map((o, i) => {
                        return <Price title={o.title}
                                      description={o.description}
                                      href={o.href}
                                      features={o.features}
                                      titleColor={o.titleColor}
                                      key={i}/>
                    }
                )}
            </div>
        </div>
    )
}