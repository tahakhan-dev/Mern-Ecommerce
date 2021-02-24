import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import Paginator from "react-hooks-paginator";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageLimit = 3;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProducts("sold", "desc").then((response) => {
      if (!isMounted) return;

      setProducts(response.data);
      setLoading(false);
    });

    return () => (isMounted = false);
  }, []);

  // yeh jo neche wal use kr raha tha ise memory leak ho rahe thi

  // useEffect(() => {
  //   loadAllProducts();
  // }, []);

  // const loadAllProducts = () => {
  //   setLoading(true);
  //   // sort, order, limit
  //   getProducts("sold", "desc").then((res) => {
  //     setProducts(res.data);
  //     setLoading(false);
  //   });
  // };

  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {currentData.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
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
    </>
  );
};

export default BestSellers;
