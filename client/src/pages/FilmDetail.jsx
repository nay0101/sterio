import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import { useParams } from "react-router-dom";

import { BASE_URL, publicRequest } from "../request-methods";

import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import { useSelector } from "react-redux";

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [tags, setTags] = useState([]);
  const [casts, setCasts] = useState([]);
  const [director, setDirector] = useState([]);
  const user = useSelector((store) => store.auth.currentUser);

  const getFilm = async () => {
    try {
      const url = `/film/${id}`;
      const { result } = (await publicRequest.get(url)).data;
      setCasts(result.casts.split(";"));
      setTags(result.tags.split(";"));
      setDirector(result.director.split(";"));
      setFilm(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilm();
  }, [id]);

  return (
    <>
      <Announcement />
      <Navbar />
      <section className="p-8 grid md:grid-cols-1 gap-8">
        <div className="grow">
          {user && user.subscription_status === "Active" ? (
            <ReactPlayer
              controls={true}
              light={`${BASE_URL}/${film.thumbnail}`}
              width="100%"
              height={800}
              url={`${BASE_URL}/film/stream/${film._id}`}
              playing={true}
            />
          ) : (
            <div className="flex justify-center items-center w-full h-96 bg-gray-100 uppercase cursor-pointer">
              Subscribe to Watch
            </div>
          )}
        </div>
        <div className="grow">
          <div className="mb-10">
            <h2 className="text-5xl mb-3 font-bold text-teal-700 uppercase">
              {film.film_name}
            </h2>
            <p>Release Year: {film.year}</p>
          </div>
          <div className="mb-10">
            <p className="mb-3 text-3xl text-teal-700">Sypnosis</p>
            <p className="text-xl">{film.film_description}</p>
          </div>
          <div className="grid sm:grid-cols-1 gap-4 mb-10">
            <label htmlFor="" className="text-3xl text-teal-700">
              Tags
            </label>
            <div className="flex flex-wrap justify-start align-start gap-3 uppercase">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded-full border border-black px-5"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-1 gap-4 mb-10">
            <label htmlFor="" className="text-3xl text-teal-700">
              Casts
            </label>
            <div className="flex flex-wrap justify-start align-start gap-3 uppercase">
              {casts.map((cast, index) => (
                <div
                  key={index}
                  className="rounded-full border border-black px-5"
                >
                  {cast}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-1 gap-4 mb-6">
            <label htmlFor="" className="text-3xl text-teal-700">
              Director
            </label>
            <div className="flex flex-wrap justify-start align-start gap-3 uppercase">
              {director.map((d, index) => (
                <div
                  key={index}
                  className="rounded-full border border-black px-5"
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FilmDetail;
