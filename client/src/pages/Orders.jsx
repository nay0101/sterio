import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import { publicRequest } from "../request-methods";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const Orders = () => {
  const user = useSelector((store) => store.auth.currentUser);
  const [orders, setOrders] = useState([]);
  const [filmName, setFilmName] = useState();
  const [source, setSource] = useState();
  const [poster, setPoster] = useState();
  const [thumbnail, setThumnail] = useState();
  const [filmDescription, setFilmDescription] = useState();
  const [year, setYear] = useState();
  const [tags, setTags] = useState();
  const [director, setDirector] = useState();
  const [casts, setCasts] = useState();

  // useEffect(() => {
  //   console.log(source);
  // }, [source]);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filmName", filmName);
    formData.append("filmDescription", filmDescription);
    formData.append("year", year);
    formData.append("tags", tags);
    formData.append("director", director);
    formData.append("casts", casts);
    formData.append("source", source);
    formData.append("poster", poster);
    formData.append("thumbnail", thumbnail);
    await publicRequest.post(
      "http://localhost:5000/api/film/uploadFilm",
      formData
    );
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <h1
        className="uppercase mt-4 mb-8 text-4xl text-center"
        onClick={() => console.log(orders)}
      >
        Orders
      </h1>
      <section className="grid gap-4 grid-cols-1 px-8 py-4 place-items-center">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border-2 border-teal-600 p-4 rounded w-2/3"
            >
              <div className="pb-2">
                <div className="flex justify-between">
                  <h2>Order ID: {order._id}</h2>
                  <div>Status: {order.status}</div>
                </div>
                <div>Amount: $ {order.amount}</div>
              </div>
              <div className="border-2 border-teal-600 border-double p-4">
                <p className="font-bold text-xl pb-2">Items</p>
                <div className="flex align-center justify-between pb-1">
                  <div className="italic underline">Name</div>
                  <div className="italic underline">Quantity</div>
                </div>
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex align-center justify-between pb-1"
                  >
                    <div>
                      {product.title} - {product.size}
                    </div>
                    <div>{product.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No Order History</div>
        )}
        <ReactPlayer
          controls={true}
          width="100%"
          height={700}
          url="http://localhost:5000/api/film/stream/64c390bffab1edfbf38d4f52"
        />
        <form onSubmit={submit} encType="multipart/form-data">
          Film Name:{" "}
          <input
            type="text"
            name="filmname"
            onChange={(e) => setFilmName(e.target.value)}
          />
          Film Description:{" "}
          <input
            type="text"
            name="filmdescripiton"
            onChange={(e) => setFilmDescription(e.target.value)}
          />
          Year:{" "}
          <input
            type="number"
            name="year"
            onChange={(e) => setYear(e.target.value)}
          />
          Tags:{" "}
          <input
            type="text"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
          />
          Director:{" "}
          <input
            type="text"
            name="director"
            onChange={(e) => setDirector(e.target.value)}
          />
          Casts:{" "}
          <input
            type="text"
            name="casts"
            onChange={(e) => setCasts(e.target.value)}
          />
          Source:{" "}
          <input
            type="file"
            name="source"
            onChange={(e) => setSource(e.target.files[0])}
          />
          Poster:{" "}
          <input
            type="file"
            name="poster"
            onChange={(e) => setPoster(e.target.files[0])}
          />
          Thumbnail:{" "}
          <input
            type="file"
            name="thumbnail"
            onChange={(e) => setThumnail(e.target.files[0])}
          />
          <input type="submit" />
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Orders;
