import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getProductsByCount,
  getProductsCount,
} from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import LocalSearch from "../../../components/forms/LocalSearch";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // initial "pageSize" humne 1 rakha hai jese dosre pe click kare toh page size hum set krde state me
  const [productsCount, setProductsCount] = useState(0); // initial count 0 rakha hai but jb yeh next page pe jae toh hum count phir "state" me save kare ge
  const [keyword, setKeyword] = useState(""); //sb se pehle humne banaya state for filtering category
  // redux
  const { user } = useSelector((state) => ({ ...state })); // user ka token get krleya from redux se

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loadAllProducts(); // "loadAllProduct" ka function run keya take sare product ajae
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data)); // jitna bhi product hoga uska count ajae ga  for example 20 ya 30 istarha
  }, []);

  const loadAllProducts = () => {
    setLoading(true); // jb product load ho toh loading true krde
    getProductsByCount(page) //humne limit lagade hai bss abhi 100 product dekhao
      .then((res) => {
        setProducts(res.data); // jitna bhi product aye usko state me save krdo
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token) //product remove krne ke leye humne slug name or uska sath user ka token send keya for authentication
        .then((res) => {
          loadAllProducts(); // jese product remove ho toh "loadAllProducts" run ho jae
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  // includes yeh hota hai ke agr user ne type keya "a" check kare ga "a" name ka koi hai ya ise milta julta agr hoga toh value true dega agr nhi hoga toh false dega
  const searched = (keyword) => (c) => c.title.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <div className="row">
            {/* jitne bhi product display ho rahe han usko map krdo or id insert krdo product ke sath */}

            {products.filter(searched(keyword)).map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>

          <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
              <Pagination
                current={page}
                total={productsCount / 2}
                onChange={(value) => setPage(value)}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
