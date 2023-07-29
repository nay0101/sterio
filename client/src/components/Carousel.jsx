import React, { useState } from "react";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Link as Scroll } from "react-scroll";

const CAROUSEL_DATA = [
  {
    url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
];
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const incrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return (currentIndex + 1) % CAROUSEL_DATA.length;
    });
  };
  const decrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1;
    });
  };
  return (
    <section className="h-carousel relative bg-red-300">
      <img
        src={CAROUSEL_DATA[currentIndex].url}
        className="w-full h-full object-cover"
      />
      <div className="absolute h-full w-full top-0 left-0 bg-black/30"></div>
      <div className="absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center text-white uppercase px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Unlimited Entertainment Awaits!
        </h1>
        <p className="tracking-wider mb-16 text-md md:text-xl">
          Dive into a Universe of Blockbusters, Classics, and Hidden Gems.
        </p>
        <Scroll to="movies" spy={true} smooth={true} offset={50} duration={500}>
          <button className="border p-3 bg-white text-black text-lg hover:bg-teal-600 hover:border-none hover:text-white transition ease-out	duration-500">
            Explore <ArrowRight />
          </button>
        </Scroll>
      </div>
      <div
        onClick={decrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 left-4 cursor-pointer"
      >
        <ArrowLeft className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
      <div
        onClick={incrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 right-4 cursor-pointer"
      >
        <ArrowRight className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
};

export default Carousel;
