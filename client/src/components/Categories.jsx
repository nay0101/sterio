import React from "react";

import Categorie from "./Categorie";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="p-8" id="categories">
      <p>Categories</p>
      <div className="grid gap-2 md:grid-cols-3 mb-2">
        <Categorie
          name="Clothes"
          image="https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        />
        <Categorie
          name="Shoes"
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        />
        <Categorie
          name="Electronics"
          image="https://images.unsplash.com/photo-1598325628310-704e43d7410a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgwfHxlbGVjdHJvbmljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <Categorie
          name="Furniture"
          image="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        />
        <Categorie
          name="Others"
          image="https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        />
      </div>
      <Link to="#">See More</Link>
    </section>
  );
};

export default Categories;
