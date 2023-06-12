import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import { userRequest } from "../request-methods";
import { useSelector } from "react-redux";

const Orders = () => {
  const user = useSelector((store) => store.auth.currentUser);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const order = (await userRequest.get(`/orders/${user.userId}`)).data;
      setOrders(order);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
      </section>
      <Footer />
    </>
  );
};

export default Orders;
