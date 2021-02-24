import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import { Modal } from "antd";
import Working from "../components/routes/Working";
import Loading from "../components/routes/EmptyCart";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
  }, []);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // jb proced to checkout kare ge toh yeh function chalega or save kare ga cart srf localstorgae pe nhi db me bhi
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Quantity</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4 className="mt-2">Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <div style={{ textAlign: "justify", margin: 40 }}>
              <h3 style={{ color: "red", marginLeft: "35%" }}>
                NoProduct In Cart Found
              </h3>
              <Loading />
              <p style={{ marginTop: "7%", fontSize: 20 }}>
                Nothing Is Found In The Cart.
                <Link to="/shop"> Continue Shopping.</Link>
              </p>
            </div>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.price * c.count} Rs
              </p>
            </div>
          ))}
          <hr />
          Total: <b>{getTotal()} Rs</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={showModal}
                // onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                // disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <Modal
                title="Working On This Module"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Working />

                <p>
                  Working On this Module
                  <b>
                    <i> "InshaAllah" </i>
                  </b>
                  Soon this feature will be available
                </p>
              </Modal>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
