import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = ({ cat, loading }) => {
  const showCategories = () =>
    // yeh aik function banaya wa hai jitni bhi categories han usko map kar rahai han with link
    cat.map((c) => (
      
      <div
        key={c}
        className="col btn btn-outlined-primary  btn-block btn-raised m-3"
      >
        <Link to={`/category/${c.toLowerCase().replace(/ /g, "-")}`}>{c.split(' ')[0]}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
