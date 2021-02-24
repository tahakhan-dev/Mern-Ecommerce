import React from "react";
import Lottie from "react-lottie";
import * as loading from "./Comment.json";
import * as done from "./done.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: done.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = ({ loading }) => {
  return (
    <div>
      {!loading ? (
        <Lottie options={defaultOptions} height={200} width={300} />
      ) : (
        <Lottie options={defaultOptions2} height={200} width={300} />
      )}
    </div>
  );
};

export default Loading;
