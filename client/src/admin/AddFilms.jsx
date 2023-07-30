import { publicRequest } from "../request-methods";

const AddFilms = () => {
  const submit = async (e) => {
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
    await publicRequest.post(
      "http://localhost:5000/api/film/uploadFilm",
      formData
    );
  };
  return (
    <>
      <form encType="multipart/form-data">
        Film Name:{" "}
        <input
          type="text"
          name="filmname"
          onChange={(e) => setFilmName(e.target.value)}
        />
        <br />
        <br />
        Film Description:{" "}
        <textarea
          name="filmdescripiton"
          onChange={(e) => setFilmDescription(e.target.value)}
        />
        <br />
        <br />
        Year:{" "}
        <input
          type="number"
          name="year"
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        <br />
        Tags:{" "}
        <input
          type="text"
          name="tags"
          onChange={(e) => setTags(e.target.value)}
        />
        <br />
        <br />
        Director:{" "}
        <input
          type="text"
          name="director"
          onChange={(e) => setDirector(e.target.value)}
        />
        <br />
        <br />
        Casts:{" "}
        <input
          type="text"
          name="casts"
          onChange={(e) => setCasts(e.target.value)}
        />
        <br />
        <br />
        Source File:{" "}
        <input
          type="file"
          name="source"
          onChange={(e) => setSource(e.target.files[0])}
        />
        <br />
        <br />
        Poster:{" "}
        <input
          type="file"
          name="poster"
          onChange={(e) => setPoster(e.target.files[0])}
        />
        <br />
        <br />
        Thumbnail:{" "}
        <input
          type="file"
          name="thumbnail"
          onChange={(e) => setThumnail(e.target.files[0])}
        />
        <br />
        <br />
        <button onClick={submit}>Submit</button>
      </form>
    </>
  );
};

export default AddFilms;
