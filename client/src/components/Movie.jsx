import React, { useState } from "react";

import { Link } from "react-router-dom";
import { SHOW_DEFAULT_POSTER } from "../defaults";

const Movie = ({ image, id, title, year }) => {
  return (
    <figure className="relative border rounded-md">
      <img
        src={image}
        alt=""
        className="w-full h-96 object-cover rounded-t-md"
        onError={SHOW_DEFAULT_POSTER}
      />
      <figcaption className="border-t p-2">
        <p className="uppercase text-xl py-2 font-bold text-teal-700 truncate">
          {title} ({year})
        </p>
        <Link
          to={`/film/${id}`}
          className="cursor-pointer w-full h-full flex justify-center items-center p-2 mt-3 border border-teal-700 rounded-full hover:bg-teal-700 hover:text-white"
        >
          Watch
        </Link>
      </figcaption>
    </figure>
  );
};

export default Movie;
