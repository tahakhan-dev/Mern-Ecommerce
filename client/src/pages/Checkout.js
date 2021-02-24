import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  saveUserContactName,
  saveUserName,
  saveUserLocation,
  saveUserEmail,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input, Steps } from "antd";
import {
  UserOutlined,
  NumberOutlined,
  LineHeightOutlined,
} from "@ant-design/icons";
import AnimatedBg from "react-animated-bg";

const { TextArea } = Input;
const { Step } = Steps;

const imagesList = ['url("https://wallpaperaccess.com/full/2478733.jpg")'];

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [contact, setContact] = useState();
  const [contactSaved, setContactSaved] = useState(false);
  const [current, setCurrent] = useState(0);
  const [locationSave, setLocationSave] = useState(false);
  const [currentCartTotal, setCurrentCartTotal] = useState(0);
  const [locationUser, setLocationUser] = useState("");
  const [CurrentUserEmail, setCurrentUserEmail] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);

      if (res.data.cartTotal > 1000) {
        setTotal(res.data.cartTotal);
        setCurrentCartTotal(res.data.cartTotal);
      } else {
        setTotal(200 + res.data.cartTotal);
        setCurrentCartTotal(res.data.cartTotal);
      }
    });
  }, []);
  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      setCurrentCartTotal(0);
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        setCurrent(4);
        toast.success("Address saved");
      }
    });
    saveUserLocation(user.token, locationUser).then((res) => {
      if (res.data.ok) {
      }
    });
    if (user.email) {
      setCurrentUserEmail(user.email);
      saveUserEmail(user.token, user.email).then((res) => {
        if (res.data.ok) {
          toast.success("Every thing Is Processed ");
        }
      });
    }
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const saveContact = () => {
    saveUserContactName(user.token, contact).then((res) => {
      if (res.data.ok) {
        setContactSaved(true);
        setCurrent(2);
        toast.success("Contact saved");
      }
    });
  };

  const saveName = () => {
    saveUserName(user.token, name).then((res) => {
      if (res.data.ok) {
        setNameSaved(true);
        setCurrent(1);
        toast.success("Name saved");
      }
    });
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeContact = (e) => {
    setContact(e.target.value);
  };

  const showName = () => (
    <>
      <Input
        size="large"
        placeholder="Enter Name Here"
        value={name}
        onChange={handleChangeName}
        prefix={<UserOutlined />}
        minLength="4"
        maxLength="40"
      />
      <br />
      <button className="btn btn-raised btn-success mt-2" onClick={saveName}>
        Save
      </button>
    </>
  );

  const showContactNumber = () => (
    <>
      <Input
        size="large"
        placeholder="Enter Contact Number Here"
        value={contact}
        onChange={handleChangeContact}
        maxLength="12"
        minLength="10"
        prefix={<NumberOutlined />}
        type="number"
      />
      <br />
      <button
        className="btn btn-raised btn-success mt-2"
        onClick={saveContact}
        disabled={!nameSaved}
      >
        Save
      </button>
    </>
  );

  const saveLocations = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      // setLatitude(position.coords.latitude);
      // setLongitude(position.coords.longitude);
      setLocationUser(
        `latitude =  ${position.coords.latitude} longitude = ${position.coords.longitude}`
      );
      setLocationSave(true);
      toast.success("Loction Is Saved");
      setCurrent(3);
    });
  };

  const showLocation = () => (
    <>
      {locationSave ? (
        <button className="btn btn-raised btn-success " disabled={true}>
          User Location Is Saved
        </button>
      ) : (
        <button
          className="btn btn-raised btn-success "
          onClick={saveLocations}
          disabled={!contactSaved}
        >
          Allow Location
        </button>
      )}
    </>
  );
  const onChange = (e) => {
    setAddress(e.target.value);
  };

  const showAddress = () => (
    <>
      <TextArea
        maxLength={100}
        value={address}
        allowClear
        onChange={onChange}
        placeholder={"Enter Address Here and then click on Save Button"}
      />
      {/* <ReactQuill
        theme="snow"
        value={address}
        onChange={setAddress}
        placeholder={"Enter Address Here and then click on Save Button"}
      /> */}
      <button
        className="btn btn-raised btn-success mt-2"
        onClick={saveAddressToDb}
        disabled={!locationSave}
      >
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} <b>=</b>{" "}
          {p.product.price * p.count} <b>Rs</b>
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button
        onClick={applyDiscountCoupon}
        className="btn btn-raised btn-success mt-2"
      >
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(
      user.token,
      COD,
      couponTrueOrFalse,
      name,
      address,
      contact,
      locationUser,
      CurrentUserEmail
    ).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

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
          <div className="row justify-content-center mb-1 pt-3">
            <h1> To Place Order</h1>
          </div>
          <div className="row">
            <div>
              <h4 className="ml-5 pl-5 pb-2">
                <i>Follow these Steps:</i>
              </h4>
              <div className="ml-5 pl-5 mb-2 pb-2">
                <Steps direction="vertical" current={current}>
                  <Step
                    title="Enter Your Name"
                    description="Press Save Button."
                  />
                  <Step
                    title="Enter Your Contact Number"
                    description="Hit Save Button for Further Process."
                  />
                  <Step title="Enter Your Address" description="Press Save." />
                  <Step
                    title="Save your Current Location"
                    description="Allow Location for ease of delivery ."
                  />
                </Steps>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-7 ml-5 pl-3">
              <h4 className="mt-2 pt-2">Enter Your Name</h4>
              <br />
              {showName()}
              <hr />
              <br />
              <h4 className="mt-1">Enter Your Contact Number</h4>
              <br />
              {showContactNumber()}
              <hr />
              <h4 className="mt-1">Allow User Location</h4>
              <br />
              {showLocation()}
              <hr />
              <h4 className="mt-1">Delivery Address</h4>
              <br />
              {showAddress()}
              <hr />
              <h4>Got Coupon?</h4>
              <br />
              {showApplyCoupon()}
              <br />
              {discountError && (
                <p className="bg-danger p-2">{discountError}</p>
              )}
            </div>

            <div className="col-md-4 ml-5 pl-2">
              <h4>Order Summary</h4>
              <hr />
              <p>Products: {products.length}</p>
              <hr />
              {showProductSummary()}
              <hr />
              {currentCartTotal > 1000 ? (
                <p>No Delivery Charges </p>
              ) : (
                <p>
                  Delivery Charges: 200 <b>Rs</b>
                </p>
              )}
              <hr />
              <p>
                Total Price : {total} <b>Rs</b>
              </p>
              {totalAfterDiscount > 0 && (
                <p className="bg-success p-2">
                  Discount Applied: Total Payable: {totalAfterDiscount}{" "}
                  <b>Rs</b>
                </p>
              )}
              <div className="row">
                <div className="col-md-6">
                  {COD ? (
                    <button
                      className="btn btn-raised btn-success"
                      disabled={
                        !addressSaved ||
                        !nameSaved ||
                        !contactSaved ||
                        !products.length
                      }
                      onClick={createCashOrder}
                    >
                      Place Order
                    </button>
                  ) : (
                    <button
                      className="btn btn-raised btn-success"
                      disabled={
                        !addressSaved ||
                        !nameSaved ||
                        !contactSaved ||
                        !products.length
                      }
                      onClick={() => history.push("/payment")}
                    >
                      Place Order
                    </button>
                  )}
                </div>

                <div className="col-md-6">
                  <button
                    disabled={!products.length}
                    onClick={emptyCart}
                    className="btn btn-raised btn-success"
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
              {currentCartTotal < 1000 ? (
                <div>
                  <h4 className="ml-4 pl-4 mt-4 pt-4">
                    <span className="badge badge-secondary">
                      If Your Total Price Is More Than
                    </span>
                  </h4>
                  <h4 className="ml-5 pl-5">
                    <span className="badge badge-warning  ml-5 "> 1000</span>
                  </h4>
                  <h4 className="ml-4 pl-4">
                    <span className="badge badge-secondary">
                      There will be no Delivery charges
                    </span>
                  </h4>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </AnimatedBg>
      </div>
    </>
  );
};

export default Checkout;
