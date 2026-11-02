
"use client"

import { useState } from "react"
import Image from "next/image"
import type { Swiper as SwiperType } from "swiper"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

interface Props {
  images: string[]
  title: string
}

export function CarouselWithThumbnails({
  images,
  title,
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null)

  if (!images?.length) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
        No images available
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-3 sm:space-y-4">

      {/* Main Image Carousel */}
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        navigation
        loop={images.length > 1}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="main-gallery rounded-xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 sm:aspect-[16/9]">
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={8}
          slidesPerView={3}
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 12,
            },
          }}
          freeMode
          watchSlidesProgress
          className="thumbnail-gallery w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image}-thumb-${index}`}
              className="cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 480px) 33vw, (max-width: 768px) 25vw, 150px"
                  className="object-cover transition-opacity duration-200 hover:opacity-80"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        .main-gallery {
          width: 100%;
          overflow: hidden;
        }

        .main-gallery .swiper-button-next,
        .main-gallery .swiper-button-prev {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.45);
          color: white;
          transition: background 0.2s ease;
        }

        .main-gallery .swiper-button-next:hover,
        .main-gallery .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        .main-gallery .swiper-button-next::after,
        .main-gallery .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }

        .thumbnail-gallery {
          width: 100%;
          overflow: hidden;
        }

        .thumbnail-gallery .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .thumbnail-gallery .swiper-slide-thumb-active {
          opacity: 1;
        }

        .thumbnail-gallery .swiper-slide-thumb-active > div {
          outline: 2px solid currentColor;
          outline-offset: -2px;
        }

        @media (max-width: 640px) {
          .main-gallery .swiper-button-next,
          .main-gallery .swiper-button-prev {
            width: 28px;
            height: 28px;
          }

          .main-gallery .swiper-button-next::after,
          .main-gallery .swiper-button-prev::after {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .thumbnail-gallery .swiper-slide {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}
