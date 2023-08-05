import { publicRequest } from "../request-methods";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";
import FilmPoster from "../components/FilmPoster";
import FilmsActionButtons from "../components/FilmsActionButtons";
import FilmModal from "../components/FilmModal";
import AdminTitleBar from "../components/AdminTitleBar";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [filmData, setFilmData] = useState();

  const filmColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Tags",
      selector: (row) => row.tags,
      sortable: true,
    },
    {
      name: "Casts",
      selector: (row) => row.casts,
      sortable: true,
    },
    {
      name: "Directors",
      selector: (row) => row.directors,
      sortable: true,
    },
    {
      name: "Poster",
      selector: (row) => row.posters,
      cell: (row) => <FilmPoster image={row.poster} />,
    },
    {
      name: "Last Modified Timestamp",
      selector: (row) => row.lastModified,
      sortable: true,
    },
    {
      name: "Actions",
      button: "true",
      cell: (data) => (
        <FilmsActionButtons
          id={data.id}
          setFilms={setFilms}
          setFilmData={setFilmData}
          setAction={setAction}
          setOpen={setOpen}
          films={films}
        />
      ),
    },
  ];

  const getFilms = async () => {
    try {
      let filmArray = [];
      const { result } = (await publicRequest.get("/film")).data;
      result.forEach((film) => {
        filmArray = [
          ...filmArray,
          {
            id: film._id,
            name: film.film_name,
            year: film.year,
            tags: film.tags.toUpperCase().replaceAll(";", " / "),
            casts: film.casts.replaceAll(";", " / "),
            directors: film.director.replaceAll(";", " / "),
            poster: film.poster,
            lastModified: dayjs(film.updatedAt).format("DD/MM/YY hh:mm:ss A"),
            description: film.film_description,
            source: film.source,
            thumbnail: film.thumbnail,
          },
        ];
      });
      setFilms(filmArray);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (action) => {
    setAction(action);
    setOpen(true);
  };

  const TableTitle = ({ name }) => {
    return (
      <div className="flex flex-wrap items-center gap-5 ">
        <p className="text-2xl">{name}</p>
        <button
          className="flex items-center justify-center border border-teal-700 rounded px-2 py-1 text-2xl text-teal-700 hover:bg-teal-700 hover:text-white"
          onClick={() => openModal("add")}
        >
          <Add fontSize="" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    getFilms();
  }, [open]);

  return (
    <>
      <div className="py-5 pr-5">
        <AdminTitleBar />
        <div className="mt-10">
          <Table
            title={<TableTitle name="Films" />}
            data={films}
            columns={filmColumns}
          />
        </div>
      </div>
      {open && (
        <FilmModal setOpen={setOpen} action={action} filmData={filmData} />
      )}
    </>
  );
};

export default Films;
