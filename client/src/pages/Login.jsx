import React, { useRef } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth-actions";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (!password.trim() || !username.trim()) return;
    dispatch(
      login({
        username,
        password,
      })
    );
  };
  return (
    <div className="px-4 w-full h-screen flex justify-center items-center bg-login bg-no-repeat bg-cover">
      <form
        onSubmit={formSubmitHandler}
        action=""
        className="border bg-white p-6 flex flex-col min-w-[17rem] sm:min-w-[22rem] md:min-w-[25rem]"
      >
        <h1 className="uppercase text-xl mb-4 font-bold">Log in</h1>
        <input
          className="p-2 mb-4 border-2 rounded focus:outline-none"
          type="text"
          placeholder="Username"
          ref={usernameRef}
          id="username"
        />
        <input
          className="p-2 mb-4 border-2 rounded focus:outline-none"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          id="password"
        />
        <button
          className="mb-4 bg-teal-700 text-white p-2 disabled:bg-teal-500 disabled:cursor-not-allowed"
          id="loginBtn"
        >
          Login
        </button>
        {auth.error && (
          <p className="text-red-500 pb-2">Wrong username or password</p>
        )}
        <Link to="/signup" className="capitalize underline mb-4">
          create a new account
        </Link>
      </form>
    </div>
  );
};

export default Login;
