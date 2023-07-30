import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { useState } from "react";
import { BASE_URL, publicRequest } from "../request-methods";
import { Link } from "react-router-dom";
import { SHOW_DEFAULT_POSTER } from "../defaults";

const Search = ({ setOpen }) => {
  const [searchValue, setSearchValue] = useState("");
  const [films, setFilms] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const getFilms = async () => {
    try {
      const { result } = (await publicRequest.get("/film")).data;
      setFilms(result);
    } catch (e) {
      console.log(e);
    }
  };

  const search = () => {
    const search_value = searchValue.toLowerCase();
    const filtered_items = films.filter((film) => {
      const name = film.film_name;
      return name.toLowerCase().includes(search_value);
    });
    if (search_value === "") return setFilteredResults([]);
    setFilteredResults(filtered_items);
  };

  return (
    <div className="flex justify-center fixed bg-black/80 w-screen h-full top-0 left-0 z-10">
      <div className="flex flex-col items-center w-full p-10">
        <p className="flex text-white text-5xl self-end gap-2 cursor-pointer">
          <CloseRounded fontSize="100" onClick={() => setOpen(false)} />
        </p>
        <div className="flex items-center justify-center text-white mb-5 mt-10">
          <p className="flex text-5xl items-center gap-2">
            <SearchRounded fontSize="100" />
            Search
          </p>
        </div>
        <div className="flex justify-center items-center w-full">
          <input
            type="text"
            name="search"
            className="outline-none text-xl border-solid py-3 px-3 w-3/6 rounded-lg border-white"
            value={searchValue}
            onKeyUp={search}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={getFilms}
          />
        </div>

        <div className="flex flex-col justify-start items-start mt-3 w-3/6 bg-white overflow-y-auto rounded">
          {filteredResults &&
            filteredResults.map((result, index) => (
              <Link
                to={`/film/${result._id}`}
                key={index}
                className="flex items-start justify-start w-full p-3 gap-2 cursor-pointer hover:bg-teal-50"
                onClick={() => setOpen(false)}
              >
                <img
                  className="lg:w-1/4 w-1/2 h-80 object-cover"
                  src={`${BASE_URL}/${result.poster}`}
                  onError={SHOW_DEFAULT_POSTER}
                />
                <div className="flex flex-col">
                  <p className="text-xl font-bold mb-3">
                    {result.film_name} ({result.year})
                  </p>
                  <p className="line-clamp-2 md:line-clamp-3 break-all">
                    {result.film_description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
