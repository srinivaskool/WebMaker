import React from "react";
import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
import AddElement from "../components/AddElement";
// import TopNav from "../components/sections/TopNav";

const LayoutDefault = ({ children }) => (
  <>
    {/* <TopNav /> */}
    <Header navPosition="right" />
    <AddElement />
    <main className="site-content">{children}</main>
    {/* <Footer /> */}
  </>
);

export default LayoutDefault;
