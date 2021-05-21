import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditableText from "../EditableText";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <Timeline align="alternate" style={{ width: "60vw", margin: "auto" }}>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body1">
            <EditableText fSize="20" text=" 9:30 am" />
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={{ width: "2.8vw" }}>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={{ color: "white", backgroundColor: "#303030" }}
          >
            <Typography variant="h6" component="h1">
              <EditableText fSize="25" text="Eat" />
            </Typography>
            <Typography>
              {" "}
              <EditableText fSize="20" text="Because you need strength" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2">
            <EditableText fSize="20" text="10:00 am" />
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" style={{ width: "2.8vw" }}>
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={{ color: "white", backgroundColor: "#303030" }}
          >
            <Typography variant="h6" component="h1">
              <EditableText fSize="25" text="Code" />
            </Typography>
            <Typography>
              <EditableText fSize="20" text="Because it's awesome!" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            style={{ width: "2.8vw" }}
          >
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={{ color: "white", backgroundColor: "#303030" }}
          >
            <Typography variant="h6" component="h1">
              <EditableText fSize="25" text="Sleep" />
            </Typography>
            <Typography>
              <EditableText fSize="20" text="Because you need rest" />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" style={{ width: "2.8vw" }}>
            <RepeatIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={{ color: "white", backgroundColor: "#303030" }}
          >
            <Typography variant="h6" component="h1">
              <EditableText fSize="25" text=" Repeat" />
            </Typography>
            <Typography>
              <EditableText
                fSize="20"
                text="Because this is the life you love!"
              />
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
