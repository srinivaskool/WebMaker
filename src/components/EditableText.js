import React, { useState, useRef, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import InputColor from "react-input-color";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import { AppContext } from "../App";

const useStylesVerticalDividors = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    width: "fit-content",
    color: "inherit",
    display: "flex",

    border: `3px solid `,
    borderRadius: theme.shape.borderRadius,
    "& svg": {
      margin: theme.spacing(0.0)
    },
    "& hr": {
      margin: theme.spacing(0, 0)
    }
  },
  divider: {
    margin: theme.spacing(0)
  },
  box: {
    height: "200px",
    width: "200px",
    background:
      "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)",
    zIndex: 9999,

    backgroundColor: "red" /*this your primary color*/
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

const EditableText = (props) => {
  // We use hooks to declare "initial" states
  const classesVerticalDividors = useStylesVerticalDividors();
  const inputRef = useRef(null);
  const { isEditable } = React.useContext(AppContext);
  const [textinputVisible, settextInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const [link, setLink] = useState(props.link);
  const [isMousedOver, setMouseOver] = useState(false);
  const [VD, setVD] = useState(false);
  const [linkinputVisible, setlinkInputVisible] = useState(false);
  const [isbold, SetIsBold] = useState(false);
  const [isItalic, SetIsItalic] = useState(false);
  const [isUnderLine, SetIsUnderLine] = useState(false);
  const [alignment, setAlignment] = useState();
  const [formats, setFormats] = useState("");
  const [incfont, SetIncFont] = useState(parseInt(props.fSize, 10));
  const [color, setColor] = React.useState({});

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  function handleClick() {
    if (isEditable) {
      settextInputVisible(true);
      setVD(true);
    }

    // // if (isEditable === true) {
    // //   setInputVisible(true);
    // //   setVD(true);
    // // } else {
    // setInputVisible(true);
    // setVD(true);
    // // }
  }

  function handleFormat(event, newFormats) {
    setFormats(newFormats);
  }

  function handleAlignment(event, newAlignment) {
    setAlignment(newAlignment);
    setVD(!VD);
    settextInputVisible(false);
    setMouseOver(false);
  }

  function HandleBold() {
    SetIsBold(!isbold);
  }
  function HandleItalic() {
    SetIsItalic(!isItalic);
  }
  function HandleUnderLine() {
    SetIsUnderLine(!isUnderLine);
  }

  async function handleIncFont() {
    await SetIncFont(incfont + 1);
  }

  function handleDecFont() {
    SetIncFont(incfont - 1);
  }
  function handleLinkClick(e) {
    if (isEditable) {
      e.preventDefault();
    }
  }

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (
      inputRef.current &&
      // toggleLayerProps.isOpen &&
      !inputRef.current.contains(e.target)
    ) {
      settextInputVisible(false);
      setlinkInputVisible(false);
      setMouseOver(false);
      setVD(false);
      // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (textinputVisible || linkinputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      <div
        style={{
          fontWeight: isbold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "normal",
          textDecoration: isUnderLine ? "underline" : "none",
          textAlign: alignment,
          fontSize: incfont + "px",
          color: color.hex
        }}
      >
        <div ref={inputRef}>
          {VD === true ? (
            <span>
              <Grid
                container
                alignItems="center"
                className={classesVerticalDividors.root}
              >
                <Paper elevation={0} className={classesVerticalDividors.paper}>
                  <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="left" aria-label="left aligned">
                      <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                      <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                      <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justified">
                      <FormatAlignJustifyIcon />
                    </ToggleButton>
                  </StyledToggleButtonGroup>

                  <Divider
                    flexItem
                    orientation="vertical"
                    className={classesVerticalDividors.divider}
                  />
                  <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={() => handleFormat()}
                    aria-label="text formatting"
                  >
                    <ToggleButton
                      value="link"
                      aria-label="Link"
                      onClick={() => {
                        setlinkInputVisible(true);
                        settextInputVisible(false);
                        setVD(false);
                      }}
                    >
                      <InsertLinkIcon />
                    </ToggleButton>
                    <Divider
                      flexItem
                      orientation="vertical"
                      className={classesVerticalDividors.divider}
                    />
                    <ToggleButton
                      value="bold"
                      aria-label="bold"
                      onClick={() => HandleBold()}
                    >
                      <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="italic"
                      aria-label="italic"
                      onClick={() => HandleItalic()}
                    >
                      <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="underlined"
                      aria-label="underlined"
                      onClick={() => HandleUnderLine()}
                    >
                      <FormatUnderlinedIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="incfont"
                      aria-label="underlined"
                      onClick={() => handleIncFont()}
                    >
                      <ZoomInIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="incfont"
                      aria-label="underlined"
                      onClick={() => handleDecFont()}
                    >
                      <ZoomOutIcon />
                    </ToggleButton>
                    <Divider
                      flexItem
                      orientation="vertical"
                      className={classesVerticalDividors.divider}
                    />
                  </StyledToggleButtonGroup>
                  <InputColor
                    className={classesVerticalDividors.box}
                    initialValue="null"
                    onChange={setColor}
                    placement="right"
                    autoAdjust="true"
                    style={{
                      zIndex: 9999,
                      margin: "auto",
                      display: "flex",
                      position: "relative",
                      height: "30px"
                    }}
                  />
                </Paper>
              </Grid>
            </span>
          ) : null}

          {textinputVisible || linkinputVisible ? (
            <>
              {textinputVisible ? (
                <InputBase
                  multiline
                  variant="outlined"
                  fullWidth
                  size="medium"
                  style={{
                    fontSize: "inherit",
                    backgroundColor: "inherit",
                    color: "inherit",
                    border: "0.001px solid ",
                    borderRadius: "5px"
                  }}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              ) : null}
              {linkinputVisible ? (
                <InputBase
                  multiline
                  variant="outlined"
                  fullWidth
                  placeholder="Add a Link"
                  size="medium"
                  style={{
                    fontSize: "inherit",
                    backgroundColor: "inherit",
                    color: "inherit",
                    border: "0.001px solid ",
                    borderRadius: "5px"
                  }}
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              ) : null}
            </>
          ) : (
            <span
              onMouseOver={() => handleMouseOver()}
              onMouseOut={() => handleMouseOut()}
              onClick={() => handleClick()}
            >
              {link ? (
                <div
                  style={{
                    border: isMousedOver && isEditable ? "1.25px dashed " : null
                  }}
                >
                  <a
                    style={{ color: "inherit" }}
                    href={link}
                    onClick={handleLinkClick}
                  >
                    <p>{text}</p>
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    border: isMousedOver && isEditable ? "1.25px dashed " : null
                  }}
                >
                  {" "}
                  {text}
                </div>
              )}
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditableText;
