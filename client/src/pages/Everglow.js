import React, { useEffect, useState } from "react";
import { Random } from "react-animated-text";
import Typewriter from "typewriter-effect";
import Paginator from "react-hooks-paginator";
import { getEverGlowProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard1";
import { Menu, BackTop } from "antd";
import CategoryList from "../components/category/CategoryList";
import AnimatedBg from "react-animated-bg";
import Slider from "react-slick";
import "../index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import css files

const { SubMenu } = Menu;

const Everglow = () => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageLimit = 15;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [categoryies, setCategoryies] = useState([]);

  const config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true, // enable center mode
    centerPadding: "50px", // set center padding
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const imagesList = ['url("https://wallpaperaccess.com/full/2478733.jpg")'];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getEverGlowProducts("sold", "desc").then((response) => {
      if (!isMounted) return;

      setFilterProduct(response.data.filterProduct);
      setProducts(response.data.product);
      setCategoryies(response.data.glowCategory);
      setLoading(false);
    });

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth", });
    setCurrentData(products.slice(offset, offset + pageLimit));
  }, [offset, products]);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <AnimatedBg
          colors={imagesList}
          duration={2}
          delay={1}
          timingFunction="ease-out"
          className="animated-section animated-images"
        >
          <h2 className="text-center p-3 mt-4 mb-5 display-4 jumbotron">
            <Typewriter
              options={{
                strings: [
                  "Here will be a tag line  ",
                  "Which attracts people",
                  "Best Seller Product",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          {loading ? (
            <LoadingCard count={5} />
          ) : (
            <Slider {...config} >
              {filterProduct.map((product) => {
                return (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </Slider>
          )}

          <h2 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            <Typewriter
              options={{
                strings: [
                  "Ever Glow Products  ",
                  "Which attracts people",
                  "Best Seller Product",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>

          {loading ? (
            <LoadingCard count={18} />
          ) : (
            <div className="row">
              <div className="col-md-2 pt-2 ml-4 pr-2 mr-5">
                <h2 className="ml-4">
                  <Random
                    text="Ever Glow "
                    effect="fadeOut"
                    effectChange={4.0}
                    effectDuration={3}
                  />
                </h2>

                <h3 className="ml-5">
                  <Random
                    text="Organics "
                    effect="fadeOut"
                    effectChange={4.0}
                    effectDuration={3}
                  />
                </h3>

                <hr />
                <Menu defaultOpenKeys={["1"]} mode="inline">
                  <SubMenu
                    key="1"
                    title={<span className="h6">Categories</span>}
                  >
                    <div style={{ maringTop: "-10px" }}>
                      <CategoryList cat={categoryies} loading={loading} />
                      {/* <SubList cat={categorysub} /> */}
                    </div>
                  </SubMenu>
                </Menu>
              </div>
              <div className="col-md-9">
                <div className="row pd-5 pr-5">
                  {currentData.map((product) => (
                    <div key={product._id} className="col-md-3">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
    </>
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

export default Everglow;
