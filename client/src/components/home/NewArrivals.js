import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import Paginator from "react-hooks-paginator";
import { useDispatch } from "react-redux";

const NewArrivals = () => {
  const [products, setProducts] = useState([]); // aik se zyada product ho sakte han jbhi array use keya hai "useEffect" me
  const [loading, setLoading] = useState(false);

  const pageLimit = 3;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProducts("createdAt", "desc").then((response) => {
      if (!isMounted) return;

      setProducts(response.data);
      setLoading(false);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
    });

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  return (
    <>
      <div className="container">
        {/* yeh jo loading card hai according woh skeleton hai or jo value pass kr rahai han iska mtlb aik row me 3 dekhao loading card */}
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {/* yeh woh product hai jo product state me save han */}
            {currentData.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* initial page 1 set hai  "total" ka mtlb yeh hai ke kitne pagination show krni hai page me */}

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

export default NewArrivals;

// jo iska normal tha pagination woh 10 tha
