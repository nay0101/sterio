import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { useState } from "react";

const Search = () => {
  const items = ["art", "book", "cock"];
  const [searchValue, setSearchValue] = useState("");

  const search = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-center fixed bg-black/70 w-screen h-full top-0 left-0 z-10">
      <div className="flex flex-col w-full p-10">
        <p className="flex text-white text-5xl self-end gap-2">
          <CloseRounded fontSize="100" />
        </p>
        <div className="flex items-center justify-center text-white mb-5 mt-10">
          <p className="flex text-5xl items-center gap-2">
            <SearchRounded fontSize="100" />
            Search
          </p>
        </div>
        <div className="flex justify-center items-center">
          <input
            type="text"
            name="search"
            className="outline-none text-xl border-solid py-3 px-3 w-3/6 rounded-lg border-white"
            value={searchValue}
            onChange={search}
          />
        </div>

        <div className="flex justify-center items-center">
          {items.map((item, index) => (
            <div key={index}>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
