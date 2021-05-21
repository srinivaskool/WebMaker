import React, { useState } from "react";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
// import AddElement from "../components/AddElement";
// import DisplayElement from "../components/DisplayElements";
// import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DisplayElements from "../components/DisplayElements";
// import TopNav from "../components/sections/TopNav";

const Home = () => {
  const [finArr, setfinArr] = useState([
    // <Header />,
    // <AddElement />,
    <Hero />,
    // <AddElement />,
    <FeaturesTiles />,
    // <AddElement />,
    <FeaturesSplit />,
    // <AddElement />,
    <Testimonial />,
    // <AddElement />,
    <Cta />,
    // <AddElement />,
    <Footer />
  ]);

  function deleteXelement(id) {
    setfinArr((xelement) => {
      return xelement.filter((val, index) => {
        return index !== id;
      });
    });
  }

  return (
    <>
      {finArr.map((item, index) => {
        return (
          <DisplayElements
            key={index}
            id={index}
            arr={item}
            onDelete={deleteXelement}
          />
        );
      })}
    </>
  );
};

export default Home;
