const DEFAULT_POSTER = "../public/posters/default.jpg";
const DEFAULT_THUMBNAIL = "../public/thumbnails/default.jpg";
const DEFAULT_VIDEO = "../public/videos/default.mp4";

const SHOW_DEFAULT_POSTER = (e) => {
  e.target.src = DEFAULT_POSTER;
};

const SHOW_DEFAULT_THUMBNAIL = (e) => {
  e.target.src = DEFAULT_THUMBNAIL;
};

const SHOW_DEFAULT_VIDEO = (e) => {
  e.target.url = DEFAULT_VIDEO;
};

export { SHOW_DEFAULT_POSTER, SHOW_DEFAULT_THUMBNAIL, SHOW_DEFAULT_VIDEO };
