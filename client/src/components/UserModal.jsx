import { useEffect, useState } from "react";
import { publicRequest } from "../request-methods";

const UserModal = ({ setOpen, action, userType, userData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  const add = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") return;
    let url;
    if (userType === "normal") url = "/auth/signup";
    if (userType === "admin") url = "/admin/signup";
    if (
      await publicRequest.post(url, {
        username,
        email,
        password,
      })
    )
      closeModal();
  };

  const edit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") return;
    if (
      await publicRequest.put(`/users/${userData[0].id}`, {
        username,
        email,
        password,
      })
    )
      closeModal();
  };

  useEffect(() => {
    if (action === "edit" && userData) {
      setUsername(userData[0].username);
      setEmail(userData[0].email);
    }
  }, []);

  return (
    <div className="flex justify-center items-center fixed bg-black/80 w-screen h-full top-0 left-0 z-10">
      <div className="flex flex-col p-10 rounded bg-white">
        <p className="text-2xl border-b pb-2">
          {action === "edit" ? "Edit User" : "Add User"}
        </p>
        <form
          className="flex flex-col gap-2 mt-5"
          onSubmit={action === "add" ? add : edit}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="mb-5 w-80 p-2 outline outline-1 rounded"
            placeholder="Please Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mb-5 w-80 p-2 outline outline-1 rounded"
            placeholder="Please Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mb-5 w-80 p-2 outline outline-1 rounded"
            placeholder="Please Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-2 w-full">
            <button
              className="border border-red-500 bg-red-600 text-white rounded px-3 py-2 uppercase hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </button>
            {action === "add" && (
              <button className="border border-green-700 bg-green-700 text-white rounded px-3 py-2 uppercase hover:bg-green-800">
                Add
              </button>
            )}
            {action === "edit" && (
              <button className="border border-green-700 bg-green-700 text-white rounded px-3 py-2 uppercase hover:bg-green-800">
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
