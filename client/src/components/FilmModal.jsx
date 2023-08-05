import { useEffect, useState } from "react";
import { BASE_URL, publicRequest } from "../request-methods";

const FilmModal = ({ action, setOpen, filmData }) => {
  const [filmName, setFilmName] = useState("");
  const [filmDescription, setFilmDescription] = useState("");
  const [year, setYear] = useState("");
  const [tags, setTags] = useState("");
  const [director, setDirector] = useState("");
  const [casts, setCasts] = useState("");
  const [source, setSource] = useState("");
  const [poster, setPoster] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const closeModal = () => {
    setFilmName("");
    setFilmDescription("");
    setYear("");
    setTags("");
    setDirector("");
    setCasts("");
    setSource("");
    setPoster("");
    setThumbnail("");
    setOpen(false);
  };

  const add = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filmName", filmName);
    formData.append("filmDescription", filmDescription);
    formData.append("year", year);
    formData.append("tags", tags);
    formData.append("director", director);
    formData.append("casts", casts);
    formData.append("source", source);
    formData.append("poster", poster);
    formData.append("thumbnail", thumbnail);
    await publicRequest.post("/film/uploadFilm", formData);
    closeModal();
  };

  const edit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filmName", filmName);
    formData.append("filmDescription", filmDescription);
    formData.append("year", year);
    formData.append("tags", tags);
    formData.append("director", director);
    formData.append("casts", casts);
    source !== "" && formData.append("source", source);
    poster !== "" && formData.append("poster", poster);
    thumbnail !== "" && formData.append("thumbnail", thumbnail);
    await publicRequest.put(`/film/${filmData[0].id}`, formData);
    closeModal();
  };

  useEffect(() => {
    if (action === "edit" && filmData) {
      setFilmName(filmData[0].name);
      setFilmDescription(filmData[0].description);
      setYear(filmData[0].year);
      setTags(filmData[0].tags.replaceAll(" / ", ";"));
      setDirector(filmData[0].directors.replaceAll(" / ", ";"));
      setCasts(filmData[0].casts.replaceAll(" / ", ";"));
    }
  }, []);

  return (
    <div className="flex justify-center items-center fixed bg-black/80 w-screen h-full top-0 left-0 z-10">
      <div className="flex flex-col p-10 rounded bg-white">
        <p className="text-2xl border-b pb-2">
          {action === "edit" ? "Edit Film" : "Add Film"}
        </p>
        <form
          className="grid md:grid-cols-2 gap-5 mt-5"
          onSubmit={action === "add" ? add : edit}
          encType="multipart/form-data"
        >
          <div>
            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="filmName">Film Name</label>
              <input
                type="text"
                name="filmName"
                id="filmName"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                placeholder="Please Enter Film Name"
                required
                value={filmName}
                onChange={(e) => setFilmName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="filmDescription">Description</label>
              <textarea
                id="filmDescription"
                className="mb-5 w-80 p-2 outline outline-1 rounded resize-none"
                required
                value={filmDescription}
                onChange={(e) => setFilmDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                name="year"
                id="year"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                placeholder="Please Enter Release Year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="tags">Tags (Separate with ;)</label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                placeholder="Please Enter Tags"
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="director">Directors (Separate with ;)</label>
              <input
                type="text"
                name="director"
                id="director"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                placeholder="Please Enter Directors"
                required
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="casts">Casts (Separate with ;)</label>
              <textarea
                id="casts"
                className="mb-5 w-80 p-2 outline outline-1 rounded resize-none"
                required
                value={casts}
                onChange={(e) => setCasts(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="source">
                Video File {action === "edit" && "(Optional)"}
              </label>
              <input
                type="file"
                name="source"
                id="source"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                required={action === "add"}
                accept="video/*"
                onChange={(e) => setSource(e.target.files[0])}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="poster">
                Poster File {action === "edit" && "(Optional)"}
              </label>
              <input
                type="file"
                name="poster"
                id="poster"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                required={action === "add"}
                accept="image/*"
                onChange={(e) => setPoster(e.target.files[0])}
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <label htmlFor="thumbnail">
                Thumbnail File {action === "edit" && "(Optional)"}
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="mb-5 w-80 p-2 outline outline-1 rounded"
                required={action === "add"}
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <button
              className="border border-red-500 bg-red-600 text-white rounded px-3 py-2 uppercase hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </button>
            {action === "add" && (
              <button className="border border-green-700 bg-green-700 text-white rounded px-3 py-2 uppercase hover:bg-green-800">
                Add
              </button>
            )}
            {action === "edit" && (
              <button className="border border-green-700 bg-green-700 text-white rounded px-3 py-2 uppercase hover:bg-green-800">
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilmModal;
