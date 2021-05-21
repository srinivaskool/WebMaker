import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomIcon from "@material-ui/icons/Room";
import ViewCarouselOutlinedIcon from "@material-ui/icons/ViewCarousel";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Carousel from "./sections/Carousel";
import Accordion from "./sections/Accordion";
import ThreeImages from "./sections/ThreeImages";
import ReviewCard from "./sections/ReviewCard";
import ExpandableTable from "./sections/ExpandableTable";
import Testimonial from "./sections/Testimonial";
import Hero from "./sections/Hero";
import FeaturesTiles from "./sections/FeaturesTiles";
import Pricing from "./sections/PricingTemplate";
import ChatBox from "./sections/ChatBox";
import SigninElement from "./sections/SigninElement";
import CheckOut from "./sections/PlaceOrder/Checkout";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeLine from "./sections/Timeline";
import VerticalLinearStepper from "./sections/VerticalStepper";
import DisplayElements from "./DisplayElements";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import FeaturesSplit from "./sections/FeaturesSplit";
import Cta from "./sections/Cta";
import { AppContext } from "../App";
import NewElements from "./NewElements";
// import { TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1
  //   // margin: "0",
  //   // marginTop: "25vh",
  //   // display: "flex",
  //   // justifyContent: "center"
  //   // ------------------------//
  //   //     position: "fixed",
  //   //     top: "50%",
  //   //     left: "50%",
  // },
  DelBut: {
    position: "sticky",
    bottom: theme.spacing(2),
    left: theme.spacing(142)
  },
  // paper: {
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary
  // },
  Modalroot: {
    flexGrow: 1
  },
  paperroot: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(1),
      height: theme.spacing(15)
    }
  },
  cardroot: {
    minWidth: "140px",
    height: "140px"
  },
  cardtitle: {
    fontSize: 14
  }
}));

function AddElement() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isshowAdd, setShowAdd] = useState(false);
  // const [showCarousel, setShowCarousel] = useState(false);
  const [xelement, setXelement] = useState([]);
  const { isEditable } = React.useContext(AppContext);
  function addXelement(e) {
    console.log(e);
    setXelement((prevElements) => {
      return [...prevElements, e];
    });
    console.log(xelement);
  }

  function deleteXelement(id) {
    setXelement((xelement) => {
      return xelement.filter((val, index) => {
        return index !== id;
      });
    });
  }

  function MakeAModal(NewElements) {
    return (
      <MakeCard
        key={NewElements.id}
        title={NewElements.title}
        OutPut={NewElements.OutPut}
      />
    );
  }

  function MakeCard(props) {
    const classes = useStyles();
    return (
      <Grid item xs={12} lg={4}>
        <Paper
          style={{
            // border: "2px solid black",
            backgroundColor: "#242b3a"
          }}
          elevation={0}
        >
          <Card
            style={{
              border: "2px solid black",
              backgroundColor: "#333642",
              margin: "10px"
            }}
            onClick={() => {
              addXelement(props.OutPut);
              setOpen(false);
            }}
            className={classes.cardroot}
          >
            <CardContent style={{ backgroundColor: "#333642" }}>
              <AccountBoxIcon
                style={{
                  margin: "auto",
                  fill: "#646f86",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "50"
                }}
              />
              <Typography align="center" variant="subtitle1">
                {props.title}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );
  }

  function handleOpen() {
    if (isEditable) {
      setOpen(true);
    }
  }

  function handleMouseEnter() {
    setShowAdd(true);
  }
  function handleMouseLeave() {
    setShowAdd(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <span className={classes.root}>
      <Grid
        container
        xs={12}
        sm={6}
        spacing={1}
        style={{
          backgroundColor: "#242b3a",
          borderRadius: "15px",
          margin: "200px 500px"
        }}
      >
        <React.Fragment>
          <div>
            {/* <h1 className="heading">Add Element</h1> */}
            <Grid className={classes.root} container spacing={0}>
              {NewElements.map(MakeAModal)}
            </Grid>
          </div>
        </React.Fragment>
      </Grid>
    </span>
  );

  return (
    <span>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          margin: "0 10px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          border: isshowAdd && isEditable ? "2px dashed #90caf9" : null
        }}
      >
        {isshowAdd && isEditable ? (
          <Fab color="primary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        ) : null}
      </div>

      {xelement.reverse().map((item, index) => {
        return (
          <DisplayElements
            key={index}
            id={index}
            arr={item}
            onDelete={deleteXelement}
          />
        );
      })}

      <Modal
        style={{ Width: "50vw", maxWidth: "1050px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </span>
  );
}
export default AddElement;
