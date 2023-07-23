import React, { useState } from "react";

import { Link } from "react-router-dom";

const Movie = ({ image, id }) => {
  const [overlayIsShown, setOverlayIsShown] = useState(false);
  return (
    <figure className="relative">
      <img src={image} alt="" className="w-full h-80 object-cover" />
      <figcaption>
        <p>Movie 1</p>
        <p>Description</p>
        <Link
          to={`/products/${id}`}
          className="cursor-pointer w-full h-full bg-black/50 flex justify-center items-center"
        >
          Watch
        </Link>
      </figcaption>
    </figure>
  );
};

export default Movie;
