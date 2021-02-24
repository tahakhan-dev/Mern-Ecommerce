import React, { useState, useEffect } from "react";
import { getCategory, getCategorySubs } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import AnimatedBg from "react-animated-bg";
import Paginator from "react-hooks-paginator";
import { PropertySafetyOutlined } from "@ant-design/icons";
import { Menu, BackTop } from "antd";
import SubList from "../../components/sub/SubList";
import { useDispatch } from "react-redux";

const { SubMenu } = Menu;

const CategoryHome = ({ match }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const [categorysub, setCategorySub] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageLimit = 20;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const { slug } = match.params;

  useEffect(() => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setLoading(true);
    getCategory(slug).then((res) => {
      // category get kr rahai "slug" ke name se or category ke sath uska product bhi ajae ga
      //console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category); // hum set kr rahai han state category state me
      setProducts(res.data.products); // set kr rahai han product state me
      setLoading(false);
      getCategorySubs(res.data.category._id).then((res) => {
        setCategorySub(res.data);
      });
    });
  }, [slug]);

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
                {products.length} Products in "{category.name}" category
              </h4>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 pt-2">
            <h2>Sub Categories</h2>

            <hr />
            <Menu defaultOpenKeys={["1"]} mode="inline">
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <PropertySafetyOutlined /> Sub Categories of "
                    {category.name}"
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>
                  <SubList subs={categorysub} />
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 ">
            <div className="row pb-5">
              {currentData.map((p) => (
                <div className="col-md-3 mt-3" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
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

export default CategoryHome;
