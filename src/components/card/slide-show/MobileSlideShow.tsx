'use client'

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { CardImage } from "../card-image/CardImage";

interface Props {
  images: string[]
  title: string
  className?: string
}

export const MobileSlideShow = ({ images, title, className }: Props) => {

  return (
    <div className={`${className}`}>
      <Swiper
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Autoplay, Pagination]}
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
    </div>
  )
}