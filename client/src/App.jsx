import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import ShoppingCategorie from "./pages/ShoppingCategorie";
import FilmDetail from "./pages/FilmDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Orders from "./pages/Orders";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AllFilms from "./pages/AllFilms";
import Subscriptions from "./pages/Subscriptions";
import AddFilms from "./admin/AddFilms";
import Dashboard from "./admin/Dashboard";

const App = () => {
  const user = useSelector((store) => store.auth.currentUser);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/categories/:category">
        <ShoppingCategorie />
      </Route>
      <Route exact path="/film/:id">
        <FilmDetail />
      </Route>
      <Route exact path="/films">
        <AllFilms />
      </Route>
      <Route exact path="/cart">
        <ShoppingCart />
      </Route>
      <Route exact path="/test">
        <Orders />
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
        <Dashboard />
      </Route>
      <Route exact path="/admin/addfilm">
        <AddFilms />
      </Route>
    </Switch>
  );
};

export default App;
