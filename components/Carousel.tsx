"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CarouselItem {
  image: string;
  title: string;
  active?: boolean;
}

const CarouselItem = ({ item }: { item: CarouselItem }) => (
  <>
    <div
      className={cn(
        "carousel-item absolute opacity-0 left-0 top-0 h-full w-full",
        item.active ? "active" : ""
      )}
    >
      <div
        className="h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
        style={{
          backgroundImage: `url("${item.image}")`,
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
            <p className="text-black text-2xl my-4">{item.title}</p>
            <a
              className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
              href="#"
            >
              view product
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

export const Carousel = ({ auto = false }: { auto?: boolean }) => {
  const [activeItem, setActiveItem] = useState(0);
  const items: CarouselItem[] = [
    {
      image:
        "https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
      title: "Stripy Zig Zag Jigsaw Pillow and Duvet Set",
    },
    {
      image:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80",
      title: "Some other tag",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
      title: "any other tag",
    },
  ];

  const moveItem = (next = false) => {
    if (next) {
      setActiveItem((prevActiveItem) =>
        prevActiveItem === items.length - 1 ? 0 : prevActiveItem + 1
      );
    } else {
      setActiveItem((prevActiveItem) =>
        prevActiveItem === 0 ? items.length - 1 : prevActiveItem - 1
      );
    }
  };

  return (
    <div
      className="carousel relative container mx-auto"
      style={{ maxWidth: 1600 }}
    >
      <div className="carousel-inner relative overflow-hidden w-full h-[50vh]">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            item={{ ...item, active: index === activeItem }}
          />
        ))}
        {/* Add additional indicators for each slide*/}
        <ol className="carousel-indicators">
          {items.map((_, index) => (
            <li className="inline-block mr-3" key={index}>
              <label
                htmlFor="carousel-1"
                className={cn(
                  "carousel-bullet cursor-pointer block text-4x hover:text-gray-900",
                  index === activeItem ? "text-gray-800" : "text-gray-400"
                )}
                onClick={() => setActiveItem(index)}
              >
                •
              </label>
            </li>
          ))}
        </ol>
        <div className="relative w-full h-full">
          <label
            onClick={() => moveItem()}
            className="w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center  inset-y-0 left-0 my-auto"
          >
            ‹
          </label>
          <label
            onClick={() => moveItem(true)}
            className="w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center  inset-y-0 right-0 my-auto"
          >
            ›
          </label>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => (
  <section
    className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
    style={{
      maxWidth: 1600,
      height: "32rem",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")',
    }}
  >
    <div className="container mx-auto">
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
        <h1 className="text-black text-2xl my-4">
          Stripy Zig Zag Jigsaw Pillow and Duvet Set
        </h1>
        <a
          className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
          href="#"
        >
          products
        </a>
      </div>
    </div>
  </section>
);
