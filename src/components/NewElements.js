import React from "react";
import ReviewCard from "./sections/ReviewCard";
import Accordian from "./sections/Accordion";
import Carousel from "./sections/Carousel";
import Timeline from "./sections/Timeline";
import ThreeImages from "./sections/ThreeImages";
import VerticalStepper from "./sections/VerticalStepper";

const NewElements = [
  {
    id: 1,
    title: "carousel",
    OutPut: <Carousel />
  },
  {
    id: 2,
    title: "accordian",
    OutPut: <Accordian />
  },
  {
    id: 3,
    title: "timeline",
    OutPut: <Timeline />
  },
  {
    id: 4,
    title: "Review Card",
    OutPut: <ReviewCard />
  },
  {
    id: 5,
    title: "Three Images",
    OutPut: <ThreeImages />
  },
  {
    id: 6,
    title: "VerticalStepper",
    OutPut: <VerticalStepper />
  }
];

export default NewElements;
