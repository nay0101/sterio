import React, { useEffect, useState } from "react";

import { publicRequest } from "../request-methods";

import Movie from "./Movie";
import { Link } from "react-router-dom";

const Movies = ({ category, title }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const url = category ? `/products?category=${category}` : "/products"; //For the Home Page
      const response = await publicRequest.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="pb-8 mx-8" id="products">
      {title && <p className="uppercase">{title}</p>}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Movie key={product._id} image={product.image} id={product._id} />
        ))}
      </div>
      <Link to="#">See More</Link>
    </section>
  );
};

export default Movies;
