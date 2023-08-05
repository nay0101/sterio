import { SHOW_DEFAULT_POSTER } from "../defaults";
import { BASE_URL } from "../request-methods";

const FilmPoster = ({ image }) => {
  return (
    <img
      src={`${BASE_URL}/${image}`}
      className="object-cover w-full h-24"
      alt="Poster"
      onError={SHOW_DEFAULT_POSTER}
    />
  );
};

export default FilmPoster;
