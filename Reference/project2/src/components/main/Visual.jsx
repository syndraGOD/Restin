import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Visual = () => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
            >
                <SwiperSlide>
                    <img src="./images/img1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/img2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/img3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/img4.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Visual;
