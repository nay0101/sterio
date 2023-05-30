import React from "react";

import { Badge } from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth-actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.currentUser);
  const totalQantity = useSelector((store) => store.cart.totalQantity);
  const userLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="grid grid-cols-2 p-4 border-b font-semibold h-18">
      <h1 className="font-bold text-3xl uppercase flex items-center justify-start px-4 tracking-wider">
        <a href="/">SECO</a>
      </h1>
      {user ? (
        <div className="flex justify-end items-center px-4 text-md md:text-lg">
          <a className="text-xl text-teal-600 font-bold cursor-pointer uppercase">
            {user.username}
          </a>
          <Link to="/orders" className="uppercase px-4 py-2">
            Orders
          </Link>
          <Link
            to="/"
            onClick={userLogout}
            className="uppercase px-4 py-2 cursor-pointer"
          >
            Logout
          </Link>
          <Link to="/cart">
            <Badge
              badgeContent={totalQantity}
              color="primary"
              className="cursor-pointer"
            >
              <ShoppingCart />
            </Badge>
          </Link>
        </div>
      ) : (
        <div className="flex justify-end items-center px-4 text-md md:text-lg">
          <Link to="/signup" className="uppercase px-4 py-2">
            Register
          </Link>
          <Link to="/login" className="uppercase px-4 py-2">
            Sign in
          </Link>
          <Link to="/cart">
            <Badge
              badgeContent={totalQantity}
              color="primary"
              className="cursor-pointer"
            >
              <ShoppingCart />
            </Badge>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
