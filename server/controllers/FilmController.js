const Film = require("../models/films");
const Rating = require("../models/ratings");
const fs = require("fs");

// const stream = async (req, res) => {
//   const { film_id } = req.params;

//   try {
//     const film = await Film.findOne({ _id: film_id });
//     if (!film) {
//       error = "Error";
//       return res.status(200).send({ error });
//     }

//     const filePath = film.source;
//     const stat = fs.statSync(filePath);
//     const fileSize = stat.size;

//     const range = req.headers.range;
//     if (range) {
//       const positions = rangeParser(fileSize, range);
//       const start = positions[0].start;
//       const end = positions[0].end;
//       const chunkSize = end - start + 1;
//       const stream = fs.createReadStream(filePath, { start, end });
//       res.writeHead(206, {
//         "Content-Type": "video/mp4",
//         "Content-Length": chunkSize,
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//       });
//       stream.pipe(res);
//     } else {
//       const stream = fs.createReadStream(filePath);
//       res.writeHead(200, {
//         "Content-Type": "video/mp4",
//         "Content-Length": fileSize,
//         "Accept-Ranges": "bytes",
//       });
//       stream.pipe(res);
//     }
//   } catch (err) {
//     res.sendStatus(400);
//   }
// };

const stream = async (req, res) => {
  const { film_id } = req.params;
  try {
    const film = await Film.findOne({ _id: film_id });
    if (!film) {
      let error = "Error";
      return res.status(200).send({ error });
    }
    const filePath = film.source;
    // const filePath = "public\\videos\\sound.mp4";
    if (!filePath) {
      return res.status(404).send("File not found");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (e) {
    res.sendStatus(400);
  }
};

const getFilm = async (req, res) => {
  const { film_id } = req.params;
  try {
    let result = await Film.findById(film_id);
    res.status(200).send({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const getFilms = async (req, res) => {
  try {
    const result = await Film.find();
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const uploadFilm = async (req, res) => {
  const { filmName, filmDescription, views, year, tags, director, casts } =
    req.body;
  const file = req.files;
  const source = file["source"][0].path;
  const thumbnail = file["thumbnail"][0].path;
  const poster = file["poster"][0].path;
  try {
    console.log(file);
    const result = await Film.create({
      film_name: filmName,
      film_description: filmDescription,
      views,
      year,
      tags,
      director,
      casts,
      source,
      thumbnail,
      poster,
      views: 0,
    });
    res.status(201).send({ film_id: result._id });
  } catch (err) {
    res.sendStatus(400);
  }
};

const updateFilm = async (req, res) => {
  try {
    const file = req.file;
    if (file) req.body.source = file.path;
    await Film.findByIdAndUpdate(req.params.film_id, req.body);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

const deleteFilm = async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.film_id);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

const rateFilm = async (req, res) => {
  try {
    const { rating } = req.body;
    const film_id = req.params.film_id;
    const user_id = req.user_id;
    const result = await Rating.findOne({ user_id });
    if (result) {
      await Rating.findOneAndUpdate({ user_id }, { rating });
      return res.sendStatus(200);
    }
    await Rating.create({
      user_id,
      film_id,
      rating,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  stream,
  getFilm,
  getFilms,
  uploadFilm,
  updateFilm,
  deleteFilm,
  rateFilm,
};
