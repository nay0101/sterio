import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { register } from "../store/auth-actions";

const Signup = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    if (!password.trim() || !username.trim()) return;
    dispatch(
      register({
        username,
        password,
        email,
      })
    );
  };
  return (
    <div className="px-4 w-full h-screen flex justify-center items-center bg-login bg-no-repeat bg-cover">
      <form
        action=""
        onSubmit={formSubmitHandler}
        className="border bg-white p-6 flex flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]"
      >
        <h1 className="uppercase text-xl mb-4 font-bold">Sign up</h1>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            className="block p-2 border-2 rounded focus:outline-none"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            id="username"
          />
          <input
            className="block p-2 border-2 rounded focus:outline-none"
            type="text"
            placeholder="Email"
            ref={emailRef}
            id="email"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            className="block p-2 border-2 rounded focus:outline-none"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            id="password"
          />
        </div>
        {auth.error && (
          <p className="text-red-500 pb-2">
            Something went wrong. Please try again.
          </p>
        )}
        <p className="mb-4 ">
          By Creating an accounct I consent to the processing of my personal
          data in accordance with the &nbsp;
          <a href="" className="uppercase font-bold">
            Privacy policy
          </a>
        </p>
        <button className="mb-4 bg-teal-700 text-white p-2" id="signUpBtn">
          Create
        </button>
        <Link to="/login" className="capitalize underline mb-4">
          Already have an account
        </Link>
      </form>
    </div>
  );
};

export default Signup;
