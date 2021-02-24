import React from "react";
import Lottie from "react-lottie";
import * as loading from "./NoVideo.json";
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
    <div style={{ marginTop: "2rem" }}>
      {!loading ? (
        <Lottie options={defaultOptions} height={250} width={250} />
      ) : (
        <Lottie options={defaultOptions2} height={250} width={250} />
      )}
    </div>
  );
};

export default Loading;
