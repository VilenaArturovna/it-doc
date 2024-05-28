import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './styles.scss';

import slide1 from './../../Assets/Images/слайдер_1_.jpg';
import slide2 from './../../Assets/Images/слайдер_2_.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const Slider = () => {
  return (
    <Swiper
      id="main"
      tag="section"
      wrapperTag="ul"
      navigation
      pagination
      autoplay={{ delay: 5000 }}
      spaceBetween={0}
      slidesPerView={1}
      onInit={(swiper) => console.log('Swiper initialized!', swiper)}
    >
      <SwiperSlide tag="li">
        <Background style={{ backgroundImage: `url(${slide1})` }} />
        <Content>
          <StrongText>Уникальное предложение</StrongText>
          <Text>
            Особые условия обслуживания картриджей для печатной техники <Star>*</Star>
          </Text>
          <ul>
            <ListItem>
              <ListItemText>НОВЫЙ картридж после третьего обращения</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Фиксированная цена даже если картридж требует восстановления</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Нет необходимости покупать новый картридж</ListItemText>
            </ListItem>
          </ul>
          <Ref to={'/plug'}>Оставить заявку</Ref>
          <Text2>
            <Star2>*</Star2> Предложение действительно только до конца 2021 года
          </Text2>
        </Content>
      </SwiperSlide>
      <SwiperSlide tag="li">
        <Background style={{ backgroundImage: `url(${slide2})` }} />
        <Content>
          <StrongText>Только до конца года</StrongText>
          <Text>
            Специальные условия логистики <br />
            БЕСПЛАТНО <Star>*</Star>
          </Text>
          <ul>
            <ListItem>
              <ListItemText>Забор, доставка оборудования</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Выезд инженера</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Диагностика оборудования</ListItemText>
            </ListItem>
          </ul>
          <Ref to={'/plug'}>Оставить заявку</Ref>
          <Text2>
            <Star2>*</Star2> При условии дальнейшего ремонта
          </Text2>
        </Content>
      </SwiperSlide>
    </Swiper>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 0;
`;
const Content = styled.div`
  ${({ theme: { container } }) => container}
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const StrongText = styled.strong`
  font-family: 'Rubik', sans-serif;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.04;
  color: ${({ theme: { colors } }) => colors.btnColor};
  padding-top: 1rem;
`;
const Text = styled.div`
  font-family: 'Rubik', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.33;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const Star = styled.span`
  color: red;
`;
const Text2 = styled(Text)`
  font-size: 0.8em;
  padding-bottom: 1rem;
`;
const Star2 = styled(Star)`
  font-size: 1.5em;
`;
const ListItem = styled.li`
  color: ${({ theme: { colors } }) => colors.btnColor};
  list-style-type: disc;
  margin: 0 0 4px;
  background-position: right;
`;
const ListItemText = styled.span`
  color: ${({ theme: { colors } }) => colors.textColor};
  font-size: 1.2rem;
`;
const Ref = styled(Link)`
  text-decoration: none;
  padding: 1rem 2rem;
  background-color: ${({ theme: { colors } }) => colors.btnColor};
  border-radius: 5px;
  color: ${({ theme: { colors } }) => colors.textColor};
  font-size: 1.25em;
`;
