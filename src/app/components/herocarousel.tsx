"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

export default function HeroCarousel () {
    return (

        <>
            <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    loop
                    className="w-full h-[450px] rounded-2xl overflow-hidden"
            >
                <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/banner/pic1.jpg"
                                alt="Childcare carousel image 1"
                                priority
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover rounded-2xl"
                            />
                        </div>
                </SwiperSlide>
                        
                <SwiperSlide>

                        <div className="relative w-full h-full">
                            <Image
                                src="/banner/pic2.jpg"
                                alt="Childcare carousel image 2"
                                priority
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                </SwiperSlide>

                <SwiperSlide>

                        <div className="relative w-full h-full">
                            <Image
                                src="/banner/pic3.jpg"
                                alt="Childcare carousel image 3"
                                priority
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                </SwiperSlide>

                <SwiperSlide>

                        <div className="relative w-full h-full">
                            <Image
                                src="/banner/pic4.jpg"
                                alt="Childcare carousel image 4"
                                priority
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}