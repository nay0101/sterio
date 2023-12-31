import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import FilmDetail from "./pages/FilmDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AllFilms from "./pages/AllFilms";
import Subscriptions from "./pages/Subscriptions";
import Dashboard from "./admin/Dashboard";
import AdminLogin from "./admin/AdminLogin";

const App = () => {
  const user = useSelector((store) => store.auth.currentUser);
  const admin = useSelector((store) => store.admin.currentUser);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/film/:id">
        <FilmDetail />
      </Route>
      <Route exact path="/films">
        <AllFilms />
      </Route>
      <Route exact path="/subscriptions">
        <Subscriptions />
      </Route>
      <Route exact path="/login">
        {user?.username ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/signup">
        {user?.username ? <Redirect to="/" /> : <Signup />}
      </Route>
      <Route exact path="/admin">
        {admin?.username ? <Dashboard /> : <AdminLogin />}
      </Route>
    </Switch>
  );
};

export default App;
