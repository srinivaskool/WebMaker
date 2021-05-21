import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditableText from "../EditableText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60vw",
    margin: "auto"
    // backgroundColor: "grey"
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export default function Accordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isDelVis, setIsVis] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      // style={{ border: isDelVis ? "1.25px dashed " : null }}
      className={classes.root}
      style={{
        color: "white",
        backgroundColor: "#000000",
        // borderRadius: "5px",
        border: "0.1px solid "
      }}
    >
      <Accordion
        style={{
          color: "white",
          backgroundColor: "#000000"
          // borderRadius: "10px"
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <EditableText fSize="18.75" text="General settings" />
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ color: "white" }}
          >
            <EditableText fSize="18.75" text="I am an accordion" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ background: "inherit" }}>
          <Typography className={classes.primaryHeading}>
            <EditableText
              fSize="20"
              text="Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam."
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          color: "white",
          backgroundColor: "#303030"
          // borderRadius: "5px"
        }}
        //  style={{ color: "pink", backgroundColor: "lightgrey" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>
            <EditableText fSize="18.75" text="Users" />
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ color: "white" }}
          >
            <EditableText fSize="18.75" text="You are currently not an owner" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.primaryHeading}>
            <EditableText
              fSize="20"
              text="Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet."
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          color: "white",
          // borderRadius: "5px",
          backgroundColor: "#000000"
        }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>
            <EditableText fSize="18.75" text="Advanced settings" />
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ color: "white" }}
          >
            <EditableText
              fSize="18.75"
              text=" Filtering has been entirely disabled for whole web server"
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.primaryHeading}>
            <EditableText
              fSize="20"
              text="Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue."
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          color: "white",
          backgroundColor: "#303030"
          // borderRadius: "5px"
        }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>
            <EditableText fSize="18.75" text="Personal data" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.primaryHeading}>
            <EditableText
              fSize="20"
              text="Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue."
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
