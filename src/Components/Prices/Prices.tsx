import {Price} from "./Price/Price";

export type OrderType = {
    title: string
    description: string
    href: string

}

const orders: Array<OrderType> = [
    {
        title: 'Fixed Price',
        description: 'Подойдёт компаниям, которым требуется регулярно заправлять картриджи к своей печатной технике. При этом режиме обслуживания вы сможете существенно сэкономить на ремонте и покупки нового картриджа',
        href: ''
    },
    {
        title: 'Standard',
        description: 'Подойдёт как частным лицам, так и малому бизнесу. Возможность выполнения работ в вашем офисе или дома',
        href: ''
    },
    {
        title: 'Full-cycle service (All in one)',
        description: 'Идеально подходит, для среднего и крупного бизнеса. Но доступен и малым компаниям и ИП. Вы снимите с себя или Ваших сотрудников вопрос о содержании Вашего парка печатной техники, тем самым высвободится время для дел, связанных непосредственно с профессиональной деятельностью. Не думай где, как и когда заправить картридж, занимайся тем, что тебе приносит доход.',
        href: ''
    },
]

export const Prices = () => {
    return (
        <div>
            {orders.map((o, i) => {
                return <Price title={o.title} description={o.description} href={o.href} key={i}/>
            })}
        </div>
    )
}