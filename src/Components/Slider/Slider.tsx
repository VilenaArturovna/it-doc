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
import slide1 from './../../Assets/Images/slider_1.jpg'

SwiperCore.use([Autoplay, Navigation, Pagination ]);

export const Slider = () => {


    return (
        <Swiper
            id="main"
            tag="section"
            wrapperTag="ul"

            navigation
            pagination
            /*autoplay={{delay:5000}}*/
            spaceBetween={0}
            slidesPerView={1}
            onInit={(swiper) => console.log('Swiper initialized!', swiper)}
            onSlideChange={(swiper) => {
                console.log('Slide index changed to: ', swiper.activeIndex);
            }}
            onReachEnd={() => console.log('Swiper end reached')}>
            <SwiperSlide tag='li'>
                <img src={slide1}/>
                <div className={'contentSlider ' + styleContainer.container}><h2>Уникальное предложение</h2>
                    <div>Особые условия обслуживания картриджей для печатной техники</div>
                    <ul>
                        <li>НОВЫЙ картридж после третьего обращения</li>
                        <li>Фиксированная цена даже если картридж требует восстановления</li>
                        <li>Нет необходимости покупать новый картридж</li>
                    </ul>
                </div>
            </SwiperSlide>
            <SwiperSlide tag='li'><img src={slide1}/></SwiperSlide>
            <SwiperSlide tag='li'><img src={slide1}/></SwiperSlide>
        </Swiper>
    );
};