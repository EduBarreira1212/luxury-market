'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    '/images/bentley.jpg',
    '/images/moto1.jpg',
    '/images/Porsche-Cayenne.jpeg',
    '/images/moto2.jpg',
    '/images/Ferrari.jpg',
    '/images/moto3.jpg',
];

const ImagesCarousel = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="h-full w-full"
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        priority
                        className="h-full w-full object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImagesCarousel;
