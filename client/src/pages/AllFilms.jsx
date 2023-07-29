import Movies from "../components/Movies";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const AllFilms = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Movies />
      <Footer />
    </>
  );
};

export default AllFilms;
