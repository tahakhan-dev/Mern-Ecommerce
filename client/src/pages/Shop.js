import React, { useState, useEffect } from "react";
import {
  getProductsByCountPagination,
  getProductsCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio, BackTop } from "antd";
import {
  DollarOutlined,
  StarOutlined,
  PropertySafetyOutlined,
  TagsOutlined,
  AimOutlined,
  BgColorsOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
import Paginator from "react-hooks-paginator";

import { Pagination } from "antd";
import LoadingCard from "../components/cards/LoadingCard";
import { Random } from "react-animated-text";
import Loading1 from "../components/routes/Loading";
import AnimatedBg from "react-animated-bg";
import Typewriter from "typewriter-effect";
import NoData from "../components/routes/NoData";

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

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [fproducts, setFProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "EverGlowOrganics",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0); // initial count 0 rakha hai but jb yeh next page pe jae toh hum count phir "state" me save kare ge

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const pageLimit = 25;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data)); // jitna bhi product hoga uska count ajae ga  for example 20 ya 30 istarha
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCurrentData(fproducts.slice(offset, offset + pageLimit));
  }, [offset, fproducts]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setFProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCountPagination(page).then((p) => {
      // jb bhi bnda land hoga direct page me toh use srf product dekha koi filtering use na ho
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      // "setTimeOut" is wajha se lagaya hai q ke thora delay se hit lage agr delay se nhi lage ge aik wqt me 300 hit lage rahe hai toh performance pe farq par raha hai
      fetchProducts({ query: text }); // hum use effect me "query" krke variable is wajha se de rahai han ke backend pe api jo hit hoge woh "query" ke name se hoge
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  console.log(star + " start");

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

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
          <div className="col-md-3 pt-2">
            <h4>Search/Filter</h4>
            <hr />

            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `$${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="4999"
                  />
                </div>
              </SubMenu>

              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <PropertySafetyOutlined /> Categories
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showStars()}</div>
              </SubMenu>

              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <TagsOutlined /> Sub Categories
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showSubs()}
                </div>
              </SubMenu>

              {/* brands */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <AimOutlined /> Brands
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showBrands()}
                </div>
              </SubMenu>

              {/* colors */}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <BgColorsOutlined /> Colors
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showColors()}
                </div>
              </SubMenu>

              {/* shipping */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <RadarChartOutlined /> Shipping
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showShipping()}
                </div>
              </SubMenu>
            </Menu>
          </div>

          <div className="col-md-9 ">
            {loading ? (
              <Loading1 />
            ) : (
              <div style={{ marginTop: "20px" }}>
                <h1 className="text-danger  text-center">
                  <Random
                    text="Products !"
                    effect="fadeOut"
                    effectChange={4.0}
                    effectDuration={3}
                  />
                </h1>
              </div>
            )}
            {!text ? (
              <div>
                {price[0] == 0 &&
                price[1] == 0 &&
                categoryIds.length == 0 &&
                brand.length == 0 &&
                star == 0 &&
                sub.length == 0 &&
                brand.length == 0 &&
                color.length == 0 &&
                shipping.length == 0 ? (
                  <div>
                    {products.length < 1 && (
                      <h2>
                        <NoData />
                        <div className="text-info d-flex justify-content-center pt-5 mt-5">
                          <Typewriter
                            options={{
                              strings: ["No products found"],
                              autoStart: true,
                              loop: true,
                            }}
                          />
                        </div>
                      </h2>
                    )}

                    {loading ? (
                      <LoadingCard count={12} />
                    ) : (
                      <div className="row pb-5">
                        {products.map((p) => (
                          <div key={p._id} className="col-md-3 mt-3">
                            <ProductCard product={p} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {/*-----------------------------------pagination will be done here ----------------------------------------- */}
                    {/* mene shop wala alg krleya hai or filter wala alag krleya hai  */}
                    {fproducts.length < 1 && (
                      <h2>
                        <NoData />
                        <div className="text-info d-flex justify-content-center pt-5 mt-5">
                          <Typewriter
                            options={{
                              strings: ["No products found"],
                              autoStart: true,
                              loop: true,
                            }}
                          />
                        </div>
                      </h2>
                    )}

                    {loading ? (
                      <LoadingCard count={12} />
                    ) : (
                      <div className="row pb-5">
                        {currentData.map((p) => (
                          <div key={p._id} className="col-md-3 mt-3">
                            <ProductCard product={p} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="row pb-5">
                {fproducts.map((p) => (
                  <div key={p._id} className="col-md-3 mt-3">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}

            <div className="row">
              <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Paginator
                  totalRecords={fproducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </nav>
            </div>
          </div>
        </div>
        {!text ? (
          <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
              {price[0] == 0 &&
              price[1] == 0 &&
              categoryIds.length == 0 &&
              brand.length == 0 &&
              star == 0 &&
              sub.length == 0 &&
              brand.length == 0 &&
              color.length == 0 &&
              shipping.length == 0 ? (
                <Pagination
                  current={page}
                  defaultCurrent={1}
                  total={(productsCount / 4) * 2}
                  onChange={(value) => setPage(value)}
                />
              ) : (
                console.log("no pagination show")
              )}
            </nav>
          </div>
        ) : (
          console.log("nhi chale ge q ke text on hai")
        )}

        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </AnimatedBg>
    </div>
  );
};

export default Shop;
