const express = require("express");
const router = express.Router();
const { filmUpload } = require("../middleware/Multer");
const film = require("../controllers/FilmController");

// film
router.get("/", film.getFilms);
router.get("/categories", film.categories);
router.get("/random", film.getRandomFilms);
router.get("/:film_id", film.getFilm);
router.get("/stream/:film_id", film.stream);
router.post(
  "/uploadFilm",
  filmUpload.fields([
    { name: "source" },
    { name: "poster" },
    { name: "thumbnail" },
  ]),
  film.uploadFilm
);
router.put(
  "/:film_id",
  filmUpload.fields([
    { name: "source" },
    { name: "poster" },
    { name: "thumbnail" },
  ]),
  film.updateFilm
);
router.delete("/:film_id", film.deleteFilm);
router.post("/:film/rate", film.rateFilm);

module.exports = router;
