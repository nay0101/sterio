import React from "react";

import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Carousel from "../components/Carousel";
import Movies from "../components/Movies";
import Newsletter from "../components/Newsletter";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Carousel />
      {/* <Categories /> */}
      <Movies title="recommended for you" />
      <Movies title="Featured" />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
