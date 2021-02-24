import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard1 = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card
          style={{ width: 400, marginTop: 16, marginLeft: 20, height: "30%" }}
          className="col-md-2"
          key={i}
        >
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row  ">{cards()}</div>;
};

export default LoadingCard1;
