import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddElement from "./AddElement";
import { AppContext } from "../App";

const useStyles = makeStyles((theme) => ({
  DelBut: {
    position: "sticky",
    bottom: theme.spacing(2),
    left: theme.spacing(142)
  }
}));

function DisplayElements(props) {
  const classes = useStyles();
  const [isDelVis, setIsVis] = useState(false);
  const { isEditable } = React.useContext(AppContext);
  function handleDelMouseEnter() {
    setIsVis(true);
  }
  function handleDelMouseLeave() {
    setIsVis(false);
  }
  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div>
      {/* <div>
        <AddElement />{" "}
      </div> */}

      <div
        style={{
          border: isDelVis && isEditable ? "2px dashed " : "0",
          margin: "0 10px "
        }}
      >
        {/* <AddElement /> */}
        {/* {console.log("Display called")}
      {console.log(props)} */}

        <span
          onMouseEnter={handleDelMouseEnter}
          onMouseLeave={handleDelMouseLeave}
        >
          <span>
            <Fab
              style={{ opacity: isDelVis && isEditable ? "1" : "0" }}
              onClick={handleClick}
              className={classes.DelBut}
              color="default"
              aria-label="delete"
            >
              <DeleteIcon />
            </Fab>
            {props.arr}
          </span>
        </span>
      </div>
      <div>
        <AddElement />{" "}
      </div>
    </div>
  );
}
export default DisplayElements;
