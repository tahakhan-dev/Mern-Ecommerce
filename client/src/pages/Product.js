import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Typewriter from "typewriter-effect";
import NoData from "../components/routes/NoData";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0); // default value 0 hoge start ke
  const [review, setReview] = useState("");
  const [okratingreview, setOkratingreview] = useState(false);
  const [name, setName] = useState("");
  const [existingrating, setExistingrating] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state })); // user ke value le rahai han q ke hum token cha heye

  const { slug } = match.params; // params le rahai han q ke  product ka name cha heye

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      // agr product ke rating hai or user bhi exist krta hai
      var RatingObject = product.ratings.find(
        // us product ke rating me jake find karo ke user ne rating de hai
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      // existingRatingObject && setStar(existingRatingObject.star); // agr current user ne rating de hai toh "star" ke state set krdo
      RatingObject ? setExistingrating(true) : console.log("nothing");
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data); // jisme user ne view keya hai usko load krdo  or sare chese uski object ke form me save krdo state me
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    // function banaya hai "onStarClick" ka ke jese user click kare rating ke leye
    setStar(newRating); // jo rating hoge woh set ho jae ge "setStar" state me
    setName(name);
    // loadSingleProduct();

    console.table(newRating, name);
  };
  if (okratingreview) {
    console.log("taha");
    productStar(name, star, review, user.token).then((res) => {
      // console.log("rating clicked", res);
      // loadSingleProduct();
      // if you want to show updated rating in real time
    });
  }

  const handleChange = (e) => {
    setReview(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          onHandleChange={handleChange}
          values={review}
          setOkratingreview={setOkratingreview}
          existingrating={existingrating}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr
            style={{
              color: "red",
              backgroundColor: "grey",
              height: 2,
            }}
          />
          <h4>Related Products</h4>
          <hr
            style={{
              color: "red",
              backgroundColor: "grey",
              height: 2,
            }}
          />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-3">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">
            <h3>
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
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
