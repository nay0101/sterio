import React, { useState } from "react";

import { Badge } from "@mui/material";
import { SearchRounded, ShoppingCart } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth-actions";
import Search from "../components/Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.currentUser);
  const [open, setOpen] = useState(false);
  const totalQantity = useSelector((store) => store.cart.totalQantity);
  const userLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="grid grid-cols-2 p-4 border-b font-semibold h-18">
        <h1 className="font-bold text-3xl uppercase flex items-center justify-start px-4 tracking-wider">
          <a href="/">Sterio</a>
        </h1>
        {user ? (
          <div className="flex justify-end items-center px-4 text-md md:text-lg">
            <a className="text-xl text-teal-600 font-bold cursor-pointer uppercase">
              {user.username}
            </a>
            <Link to="/orders" className="uppercase px-4 py-2">
              Subscriptions
            </Link>
            <Link
              to="/"
              onClick={userLogout}
              className="uppercase px-4 py-2 cursor-pointer"
            >
              Logout
            </Link>

            <SearchRounded />
          </div>
        ) : (
          <div className="flex justify-end items-center px-4 text-md md:text-lg gap-5">
            <Link to="/signup" className="uppercase ">
              Register
            </Link>
            <Link to="/login" className="uppercase ">
              Sign in
            </Link>
            <SearchRounded
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        )}
      </nav>
      {open && <Search setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
