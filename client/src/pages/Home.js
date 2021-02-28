import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import Footer from "../components/footer/footer";
import "../index.css";
import TextLoop from "react-text-loop";
import { Parallax } from "react-parallax";
import AnimatedBg from "react-animated-bg";
import { Random } from "react-animated-text";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Home = () => {
  // const slideImages = [
  //   'images/slide_2.jpg',
  //   'images/slide_3.jpg',
  //   'images/slide_4.jpg'
  // ];

  const properties = {
    autoplay: true,
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    easing: "ease",
    arrows: true,
    onChange: (oldIndex, newIndex) => {},
  };

  const slideImages = [
    "https://picsum.photos/800/300/?random",
    "https://picsum.photos/800/301/?random",
    "https://picsum.photos/800/302/?random",
  ];

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
  };
  const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  const image1 =
    "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
  const image2 =
    "https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg";

  const imagesList = ['url("https://wallpaperaccess.com/full/2478733.jpg")'];

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
          <div
            className="jumbotron text-danger   h1 font-weight-bold text-center"
            style={{
              background: "linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)",
            }}
          >
            {/* humne jumbotron ka "jumbotron effect" uthaya wa hai toh hum value pass kr rahai han jumbotron me */}
            <Jumbotron
              text={[
                "Here will be a tag line  ",
                "Which attracts people",
                "----",
              ]}
            />
          </div>

          <div style={{ paddingLeft: "22%" }}>
            <Slide {...properties}>
              <div className="each-slide">
                <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
                  <span>Slide 1</span>
                </div>
              </div>
              <div className="each-slide">
                <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
                  <span>Slide 2</span>
                </div>
              </div>
              <div className="each-slide">
                <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
                  <span>Slide 3</span>
                </div>
              </div>
            </Slide>
          </div>
          <h2
            className="text-center p-3 mt-5 mb-5 display-4 jumbotron"
            style={{
              background:
                "linear-gradient(315deg, rgb(73 130 147 / 64%) 0%, rgb(217 167 167 / 58%) 74%)",
            }}
          >
            Product Categories
            <TextLoop springConfig={{ stiffness: 60, damping: 5 }}>
              {[
                "Trade faster",
                "Increase sales",
                "Stock winners",
                "Price perfectly",
              ]}
            </TextLoop>
          </h2>

          <div style={styles}>
            <Parallax bgImage={image1} strength={700}>
              <div style={{ height: 400 }}>
                <div style={insideStyles}>HTML inside the parallax</div>
              </div>
            </Parallax>

            <h2>| | |</h2>
            <Parallax bgImage={image2} strength={-400}>
              <div style={{ height: 400 }}>
                <div style={insideStyles}>Reverse direction</div>
              </div>
            </Parallax>
          </div>

          <h4
            className="text-center p-3 mt-5 mb-5 display-4 jumbotron"
            style={{
              background:
                "linear-gradient(315deg, rgb(73 130 147 / 64%) 0%, rgb(217 167 167 / 58%) 74%)",
            }}
          >
            <Random
              text="N e w   A r r i v a l s !"
              effect="pop"
              effectChange={2}
              effectDuration={1}
            />
          </h4>
          <NewArrivals />
          {/* yeh hum component istamal kr rahai han "newArrival" ka */}
          <h4
            className="text-center p-3 mt-5 mb-5 display-4 jumbotron"
            style={{
              background:
                "linear-gradient(315deg, rgb(73 130 147 / 64%) 0%, rgb(217 167 167 / 58%) 74%)",
            }}
          >
            <Random
              text="B e s t   S e l l e r s  !"
              effect="pop"
              effectChange={2}
              effectDuration={1}
            />
          </h4>
          <BestSellers />

          <br />
          <br />
          <div>
            <Footer />
          </div>
        </AnimatedBg>
      </div>
    </>
  );
};

export default Home;
