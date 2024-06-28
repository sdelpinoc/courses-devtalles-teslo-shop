'use client'

import { useState } from "react";

import Image from "next/image";

import { Swiper as SwiperObject } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { CardImage } from "../card-image/CardImage";

interface Props {
  images: string[]
  title: string
  className?: string
}

export const SlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={`${className}`}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#007aaf',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        // autoplay={{
        //   delay: 2500
        // }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <CardImage
                src={image}
                alt={title}
                width={300}
                height={0}
                className="rounded"
              // style={{width: '100%', height: 'auto'}}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(image => (
            <SwiperSlide key={`${image}_thumb`}>
              <CardImage src={image} alt={title} width={100} height={100} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}