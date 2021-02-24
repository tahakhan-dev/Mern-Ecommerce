import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import AnimatedBg from "react-animated-bg";
import Paginator from "react-hooks-paginator";
import {  BackTop } from "antd";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageLimit = 20;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  const imagesList = ['url("https://wallpaperaccess.com/full/2478733.jpg")'];

  return (
    <div className="container-fluid">
      <AnimatedBg
        colors={imagesList}
        duration={2}
        delay={1}
        timingFunction="ease-out"
        className="animated-section animated-images"
      >
        <div className="row">
          <div className="col">
            {loading ? (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Loading...
              </h4>
            ) : (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                {products.length} Products in "{sub.name}" sub category
              </h4>
            )}
          </div>
        </div>

        <div className="row">
          {currentData.map((p) => (
            <div className="col col-md-3 p-3" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
            <Paginator
              totalRecords={products.length}
              pageLimit={pageLimit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </nav>
        </div>
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </AnimatedBg>
    </div>
  );
};

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

export default SubHome;
