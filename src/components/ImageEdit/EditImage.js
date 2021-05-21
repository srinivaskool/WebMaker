import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Portal from "@material-ui/core/Portal";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { AlertTitle } from "@material-ui/lab";
import { AppContext } from "../../App";

import Fab from "@material-ui/core/Fab";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // borderColor: "#000",
  // borderStyle: "dashed",
  backgroundColor: "#5f5f5f",
  borderRadius: "15px",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "15px",
    position: "absolute",
    width: "50vw",
    maxWidth: "1000px",
    minWidth: "400px",
    marginTop: "20vh",
    border: null,
    backgroundColor: "#303030",
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  DelBut: {
    position: "sticky",
    bottom: theme.spacing(142),
    left: theme.spacing(200)
  }
}));
// const useSnackStyles = makeStyles((theme) => ({
//   root: {
//     marginLeft: "-125px",

//     "& > * + *": {
//       marginBottom: theme.spacing(90)
//     }
//   }
// }));
const useSnackStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));
const useStylesBut = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const activeStyle = {
  // borderColor: "#2196f3"
};

const acceptStyle = {
  // borderColor: "#00e676"
};

const rejectStyle = {
  // borderColor: "#ff1744"
};

export default function EditImage(props) {
  const Snackclasses = useSnackStyles();
  const [Snackopen, setSnackopen] = React.useState(false);
  const [infoSnackopen, setinfoSnackopen] = React.useState(false);
  const classes = useStyles();
  const [imageAsFile, setImageAsFile] = useState("");
  const [img, setimg] = useState(props.src);
  const [progress, setProgress] = useState(0);
  const [Modopen, setModopen] = React.useState(false);
  const classesBut = useStylesBut();
  const [isMousedOver, setMouseOver] = useState(false);
  const [showText, setShowText] = useState(false);
  const { isEditable } = React.useContext(AppContext);

  // const handleModclose = () => {
  //   setModopen(false);
  // };
  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography
            style={{ display: showText ? "block" : "none" }}
            variant="body2"
            color="Default"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function handleModelOpen() {
    if (isEditable) {
      setModopen(true);
    }
  }

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackopen(false);
    setinfoSnackopen(true);
  };
  const handle2SnackClose = () => {
    setModopen(false);
    setProgress(0);
    setinfoSnackopen(false);
    setShowText(false);
    setMouseOver(false);
  };

  const handleFinalClose = () => {
    setProgress(0);
    setSnackopen(false);
    setinfoSnackopen(false);
    setModopen(false);
    setMouseOver(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setImageAsFile(acceptedFiles[0]);
      setShowText(true);
      // console.log(imageAsFile);
    }
  });

  const files = acceptedFiles.map((file) => <p key={file.path}>{file.path}</p>);

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    // console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setimg(fireBaseUrl);
          });
      }
    );
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <React.Fragment>
        {Modopen ? (
          <Modal
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "auto"
            }}
            open={Modopen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div className={classes.paper}>
                <div>
                  <div className="container">
                    <br />
                    <br />
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here</p>
                      {/* <button type="button" onClick={open}>
                        Upload From Device
                      </button> */}
                      <Button
                        onClick={open}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classesBut.button}
                        startIcon={<ImportantDevicesIcon />}
                      >
                        Upload From Local Device
                      </Button>
                    </div>
                  </div>
                  <aside>
                    <center>
                      <h5 style={{ display: showText ? "block" : "none" }}>
                        Selected File {files[0]}
                      </h5>
                    </center>
                  </aside>
                  <div className={Snackclasses.root}>
                    <Portal>
                      <Snackbar
                        open={progress === 100}
                        autoHideDuration={1500}
                        onClose={handleSnackClose}
                      >
                        <Alert severity="success">
                          <strong>Image Uploaded Succesfully :) </strong>
                        </Alert>
                      </Snackbar>
                      <Snackbar
                        open={infoSnackopen}
                        autoHideDuration={4000}
                        onClose={handle2SnackClose}
                      >
                        <Alert
                          severity="info"
                          open={infoSnackopen}
                          autoHideDuration={4000}
                          onClose={handle2SnackClose}
                        >
                          <strong>
                            It might take a few seconds for the image to get
                            reflected in the website.
                          </strong>
                        </Alert>
                      </Snackbar>
                    </Portal>
                  </div>
                  <div>
                    <center>
                      <form onSubmit={handleFireBaseUpload}>
                        {/* <button>SUBMIT</button> */}
                        <Button
                          variant="contained"
                          color="default"
                          type="submit"
                          // onSubmit={handleFireBaseUpload}
                          className={classesBut.button}
                          startIcon={<CloudUploadIcon />}
                          onClick={handleFireBaseUpload}
                          //onClick={setShowProgress(true)}
                        >
                          Upload
                        </Button>
                      </form>
                      <LinearProgressWithLabel
                        variant="determinate"
                        value={progress}
                      />
                      {/* <progress value={progress} max="100" /> */}
                    </center>
                  </div>
                  <Fab
                    onClick={handleFinalClose}
                    className={classes.DelBut}
                    color="primary"
                    aria-label="add"
                  >
                    <CloseIcon />
                  </Fab>
                </div>
              </div>
            }
          </Modal>
        ) : (
          <span
            // style={{
            //   border: !Modopen && isMousedOver ? "1.25px dashed " : null
            // }}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
            onClick={() => handleModelOpen()}
          >
            <img
              // onClick={() => setModopen(true)}
              style={{
                width: "80",
                height: "80",
                border:
                  !Modopen && isMousedOver && isEditable ? "2px dashed " : null
              }}
              src={img}
              alt="Hi"
            />
          </span>
        )}
      </React.Fragment>
    </div>
  );
}
