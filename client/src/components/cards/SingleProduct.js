import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "../routes/NoVideo";
import { Random } from "react-animated-text";
import ReviewModal from "../modal/ReviewModal";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({
  product,
  onStarClick,
  star,
  onHandleChange,
  values,
  setOkratingreview,
  existingrating,
}) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id, url } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
    });
  };

  return (
    <>
      {/* yeh jo image carousel hai woh slider hai yeh bol rahai ha agr image hai or uski legth bhi hai toh sare functionality perform kare */}
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
          <TabPane tab="Product Video" key="3">
            <div className="pl-5 pt-5">
              {url ? (
                <ReactPlayer controls url={url} />
              ) : (
                <h1 className="text-danger  text-center">
                  <Random
                    text=" Product Video Not Found !"
                    effect="fadeOut"
                    effectChange={4.0}
                    effectDuration={3}
                  />
                  <Loading />
                </h1>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {/* Product hai or uski rating bhi hai or length bhi hai toh average show kare produt ka wrna no rating show kare "ShowAverage" aik function banawa hai */}
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        {/* rating Modal banaya wa hai jaha aik modal popup hota hai or user rating de sakta hai */}
        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,

            <RatingModal
              handlesubmit={onHandleChange}
              inputValue={values}
              setOkratingreview={setOkratingreview}
              existingrating={existingrating}
            >
              {/* StarRating me hum pass krwa rahai han product ke "_id" kitne stars dekhane hai or kitne rating pe click tha ya agr user ne pehle koi rating de ho toh woh show kare */}
              {/* agr rating change kare toh foran "onStarClick" function trigger ho jae */}
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,

            <ReviewModal product={product} />,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
