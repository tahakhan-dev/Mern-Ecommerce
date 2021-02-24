import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" => "}
        {order.paymentIntent.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "PKR",
        })}
      </span>
      {" / "}
      <span>Currency: {"RUPEES"}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>

      <span>
        Orderd on:{" => "}
        {new Date(order.paymentIntent.created).toLocaleString()}
      </span>
      {" / "}
      <br />

      <span>
        {" "}
        Customer Email : <span className="text-warning">{order.UserEmail}</span>
      </span>
      <br />
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
