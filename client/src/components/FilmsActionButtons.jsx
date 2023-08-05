import { Delete, Edit } from "@mui/icons-material";
import { publicRequest } from "../request-methods";

const FilmsActionButtons = ({
  id,
  setFilms,
  setFilmData,
  setAction,
  setOpen,
  films,
}) => {
  const editFilm = () => {
    setAction("edit");
    setOpen(true);
    setFilmData(films.filter((film) => film.id === id));
  };

  const deleteFilm = async () => {
    if (await publicRequest.delete(`film/${id}`)) {
      setFilms((prev) => prev.filter((film) => film.id !== id));
    }
  };
  return (
    <div className="flex gap-2">
      <Edit className="text-green-700 cursor-pointer" onClick={editFilm} />
      <Delete className="text-red-700 cursor-pointer" onClick={deleteFilm} />
    </div>
  );
};

export default FilmsActionButtons;
