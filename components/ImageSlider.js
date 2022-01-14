import { Navigation, Pagination, Autoplay, A11y, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/a11y";

const ImageSlider = ({ images }) => {
	return (
		<Swiper className="experience-slider" modules={[Navigation, Pagination, Autoplay, A11y, Lazy]} spaceBetween={42} slidesPerView={2} centeredSlides={true} lazy={true} navigation pagination={{ clickable: true }} grabCursor={true} autoplay>
			{images.map((i) => {
				return (
					<SwiperSlide key={i}>
						<img data-src={`/img/experiences/${i}`} className="swiper-lazy experience-slide" alt="" />
						<div className="swiper-lazy-preloader"></div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ImageSlider;
