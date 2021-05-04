import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";

// Import Swiper styles

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './styles.scss';

import styleContainer from './../../Common/Styles/Container.module.css'
import slide1 from './../../Assets/Images/слайдер_1_.jpg'
import slide2 from './../../Assets/Images/слайдер_2_.jpg'

SwiperCore.use([Autoplay, Navigation, Pagination ]);

export const Slider = () => {


    return (
        <Swiper
            id="main"
            tag="section"
            wrapperTag="ul"

            navigation
            pagination
            autoplay={{delay:5000}}
            spaceBetween={0}
            slidesPerView={1}
            onInit={(swiper) => console.log('Swiper initialized!', swiper)}
            onSlideChange={(swiper) => {
                console.log('Slide index changed to: ', swiper.activeIndex);
            }}
            onReachEnd={() => console.log('Swiper end reached')}>
            <SwiperSlide tag='li'>
                <div className={'bg'} style={{backgroundImage: `url(${slide1})`}}></div>
                <div className={'contentSlider ' + styleContainer.container}>
                    <strong>Уникальное предложение</strong>
                    <div>Особые условия обслуживания картриджей для печатной техники <span>*</span></div>
                    <ul>
                        <li><span>НОВЫЙ картридж после третьего обращения</span></li>
                        <li><span>Фиксированная цена даже если картридж требует восстановления</span></li>
                        <li><span>Нет необходимости покупать новый картридж</span></li>
                    </ul>
                    <a href="" >Оставить заявку</a>
                    <div className={'restriction'}><span>*</span> Предложение действительно только до конца мая 2021 года</div>
                </div>
            </SwiperSlide>
            <SwiperSlide tag='li'>
                <div className={'bg'} style={{backgroundImage: `url(${slide2})`}}></div>
                <div className={'contentSlider ' + styleContainer.container}>
                    <strong>Только до конца мая</strong>
                    <div>Специальные условия логистики <br/>БЕСПЛАТНО <span>*</span></div>
                    <ul>
                        <li><span>Забор, доставка оборудования</span></li>
                        <li><span>Выезд инженера</span></li>
                        <li><span>Диагностика оборудования</span></li>
                    </ul>
                    <a href="" >Оставить заявку</a>
                    <div className={'restriction'}><span>*</span> При условии дальнейшего ремонта</div>
                </div>
            </SwiperSlide>

        </Swiper>
    );
};