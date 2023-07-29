import React, { useEffect, useState } from "react";

import { BASE_URL, publicRequest } from "../request-methods";

import Movie from "./Movie";
import { Link } from "react-router-dom";

const Movies = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [category, setCategory] = useState("");

  const getMovies = async () => {
    try {
      const url = title ? "/film/random" : "/film";
      const { result } = (await publicRequest.get(url)).data;
      setFilteredMovies(result);
      setMovies(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { result } = (await publicRequest.get("/film/categories")).data;
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredFilms = () => {
    if (category === "") return setFilteredMovies(movies);
    const filterd_movies = movies.filter((film) => {
      const tags = film.tags.toLowerCase().split(";");
      return tags.includes(category.toLowerCase());
    });
    setFilteredMovies(filterd_movies);
  };

  const changeCategory = (name) => {
    if (name === category) return setCategory("");
    setCategory(name);
  };

  useEffect(() => {
    getMovies();
    if (!title) getCategories();
  }, [title]);

  useEffect(() => {
    getFilteredFilms();
  }, [category]);

  return (
    <section className="pb-8 mx-8 mt-5" id="movies">
      {title ? (
        <>
          <div className="flex justify-between my-10">
            <p className="text-3xl uppercase font-bold">{title}</p>
            <Link to="/films">See All Movies</Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie, index) => (
              <Movie
                key={index}
                image={`${BASE_URL}/${movie.poster}`}
                id={movie._id}
                title={movie.film_name}
                year={movie.year}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full mb-5 p-5 border border-teal-700 rounded-lg">
            <p className="text-2xl uppercase">Categories</p>
            <div className="flex flex-wrap uppercase gap-3 mt-5 cursor-pointer">
              {categories &&
                categories.map((result, index) => (
                  <div
                    key={index}
                    className={`border border-teal-700 rounded-full px-4 py-2 ${
                      result.name === category && "bg-teal-700 text-white"
                    }`}
                    onClick={() => changeCategory(result.name)}
                  >
                    {result.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {filteredMovies.map((movie, index) => (
              <Movie
                key={index}
                image={`${BASE_URL}/${movie.poster}`}
                id={movie._id}
                title={movie.film_name}
                year={movie.year}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Movies;
