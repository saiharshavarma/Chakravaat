"use client";

import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import NavBar from "../components/NavBar";
import Tiptap from "../components/Tiptap";
import NoteTaker from "../components/NoteTaker";
import MiniChatbot from "../components/MiniChatbot";

import jsPDF from "jspdf";

import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tooltip from "@mui/material/Tooltip";

import { useSession } from "next-auth/react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import Button from "@mui/material/Button";

const filter = createFilterOptions();

const Notebook = () => {
  const [visible, setVisible] = useState(false);
  const [editor, setEditor] = useState();
  const [notesVisible, setNotesVisible] = useState(false);

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [anonymity, setAnonymity] = useState(true);

  const [emails, setEmails] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    const storedEmails = localStorage.getItem("emails");
    if (session) {
      setEmails([{ name: "Email Self", email: session.user.email }]);
    }
    if (storedEmails) {
      setEmails((prevEmails) => {
        return [...prevEmails, ...JSON.parse(storedEmails)];
      });
    }
  }, []);

  const handleDeleteLog = (key) => {
    setData((prevData) => {
      const newData = { ...prevData };
      delete newData[key];
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });
  };

  const handleNoteTransfer = (key) => {
    editor.commands.insertContent(`${key} : ${data[key]}\n`);
  };

  const handleEditorRender = (editorObject) => {
    setEditor(editorObject);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // const htmlString = "<h1 style='color: black;'>Hello, world!</h1><p style='color: black;'>This is a sample HTML string with black text.</p>";
    const htmlString =
      `<div style='color: black; font-size: 6px;'>${
        session ? session.user.name + "'s Report" : "User Report"
      }<br />` +
      (editor ? editor.getHTML() : "") +
      "</div>";
    console.log(htmlString);

    // doc.html(htmlString).then(() => doc.save('fileName.pdf'));

    doc.html(htmlString, {
      callback: () => {
        // Save the PDF
        doc.save("chakravaat.pdf");
      },
    });

    // doc.fromHTML('<h1>Hello world!</h1>', 10, 10);
    // doc.save('example.pdf');
  };

  const printPage = () => {
    window.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(editor ? editor.getText() : "")
      .then(() => {
        toast.success("Text copied to clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Failed To Copy To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error("Error copying text: ", error);
      });
  };

  const clearDocument = () => {
    if (editor) {
      editor.commands.clearContent();
    }
  };

  // const actions = [
  //   { icon: <IconButton onClick={generatePDF}><FileCopyIcon /></IconButton>, name: 'Download' },
  //   { icon: <IconButton onClick={printPage}><PrintIcon /></IconButton>, name: 'Print' },
  //   { icon: <SaveIcon />, name: 'Print' },
  //   { icon: <ShareIcon />, name: 'Share' },
  // ];
  const actions = [
    {
      icon: (
        <IconButton onClick={generatePDF}>
          <DownloadIcon />
        </IconButton>
      ),
      name: "Download",
    },
    {
      icon: (
        <IconButton onClick={printPage}>
          <PrintIcon />
        </IconButton>
      ),
      name: "Print",
    },
    {
      icon: (
        <IconButton onClick={copyToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      ),
      name: "Copy",
    },
    {
      icon: (
        <IconButton onClick={clearDocument}>
          <HighlightOffIcon />
        </IconButton>
      ),
      name: "Clear",
    },
    {
      icon: (
        <IconButton onClick={handleOpen}>
          <EmailIcon />
        </IconButton>
      ),
      name: "Email",
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    outline: "none",
    borderRadius: "5px",
  };

  async function handleSubmit(event) {
    toast.info("Your Message Has Been Submitted!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", editor ? editor.getHTML() : "");
    formData.append(
      "sender",
      anonymity ? "Chakravaat" : session ? session.user.name : ""
    );

    try {
      const response = await fetch("/api/data", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Please Try Resending Your Message!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      const responseData = await response.json();
      if (responseData.message == "Success") {
        toast.success("Your Email Has Been Sent!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Please Try Resending Your Message!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Please Try Resending Your Message!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const [dialog, toggleDialog] = useState(false);

  const handleDialogClose = () => {
    setDialogValue({
      email: "",
      name: "",
    });
    toggleDialog(false);
  };

  const [dialogValue, setDialogValue] = useState({
    email: "",
    name: "",
  });

  const handleAddEmailSubmit = (event) => {
    event.preventDefault();
    setEmails((prevEmails) => {
      return [
        ...prevEmails,
        {
          email: dialogValue.email,
          name: dialogValue.name,
        },
      ];
    });
    handleDialogClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <div
        className="bg-black flex items-center p-6 h-screen w-screen"
        onClick={() => {
          setNotesVisible(false);
          setVisible(false);
        }}
      >
        <NavBar
          setVisible={setVisible}
          visible={visible}
          setNotesVisible={setNotesVisible}
          notesVisible={notesVisible}
        />
        <div className="flex items-center rounded-lg h-full w-full">
          <div className="flex flex-col h-full">
            <div className="h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-96 mb-4 mr-6">
              NOTED LOGS
            </div>
            <div className="bg-white h-full bg-opacity-10 rounded-lg w-96 mr-6 overflow-scroll p-4 text-center">
              {Object.keys(data).length === 0 ? (
                <div className="opacity-30 w-full border border-white rounded-lg p-2">
                  There are no logs yet!
                </div>
              ) : (
                ""
              )}
              {Object.entries(data).map(([key, value]) => (
                <div className="flex flex-row rounded-lg border border-white p-2 border-opacity-20 mb-4">
                  <div className="flex flex-row w-full">
                    <div className="w-full bg-white bg-opacity-20 text-white rounded-md text-center p-2 mr-2">
                      {key} : {value}
                    </div>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150 mr-2"
                      onClick={() => handleNoteTransfer(key)}
                    >
                      <Tooltip title="Copy To Editor">
                        <ExitToAppIcon />
                      </Tooltip>
                    </button>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                      onClick={() => handleDeleteLog(key)}
                    >
                      <Tooltip title="Remove From Logs">
                        <DeleteIcon />
                      </Tooltip>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full w-full">
            <div className="w-full rounded-lg p-2 mb-4 text-center bg-white bg-opacity-20">
              {session ? `${session.user.name}'S LOGS` : "USER'S LOGS"}
            </div>
            <div className="relative flex flex-col items-center rounded-lg h-full w-full bg-white bg-opacity-10 rounded-lg">
              <Tiptap onEditorRender={handleEditorRender} className="w-full" />
              <SpeedDial
                ariaLabel="Log book actions"
                sx={{
                  position: "absolute",
                  bottom: 40,
                  right: 40,
                  "& .MuiButtonBase-root:hover": {
                    background: "black",
                    opacity: 1.0,
                  },
                  "& .MuiButtonBase-root": {
                    background: "black",
                    opacity: 0.5,
                  },
                }}
                icon={
                  <SpeedDialIcon
                    sx={{
                      color: "white",
                      marginBottom: "3px",
                    }}
                  />
                }
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
              <MiniChatbot visible={visible} />
              <NoteTaker notesVisible={notesVisible} />
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="h-full w-full flex flex-col p-4">
              {/* <TextField
                id="outlined-basic"
                label="Receiver Email"
                variant="filled"
                className="rounded-lg mb-4"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              /> */}
              <TextField
                id="outlined-basic"
                label="Receiver Name"
                variant="filled"
                className="rounded-lg mb-4"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Subject"
                variant="filled"
                className="rounded-lg mb-4"
                type="text"
                onChange={(event) => setSubject(event.target.value)}
              />
              <div className="flex w-full mb-4">
                <div className="mr-4 bg-white bg-opacity-20 flex flex-col text-center justify-center w-1/2 opacity-50">
                  Anonymity
                </div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={anonymity ? "Yes" : "No"}
                  // label="Anonymity"
                  onChange={(event) => {
                    if (event.target.value == "Yes") {
                      setAnonymity(true);
                    } else {
                      setAnonymity(false);
                    }
                  }}
                  className="w-1/2"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </div>
              <button
                className={
                  email == ""
                    ? "w-full bg-white bg-opacity-20 rounded p-2 text-center opacity-50"
                    : "w-full bg-white bg-opacity-20 rounded p-2 text-center hover:bg-opacity-100 hover:text-black transition ease-in-out delay-150"
                }
                disabled={email == "" ? true : false}
                onClick={handleSubmit}
              >
                SEND EMAIL
              </button>
              <Autocomplete
                value={email}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                      toggleDialog(true);
                      setDialogValue({
                        email: newValue,
                        name: "",
                      });
                    });
                  } else if (newValue && newValue.inputValue) {
                    toggleDialog(true);
                    setDialogValue({
                      email: newValue.inputValue,
                      name: "",
                    });
                  } else {
                    setEmail(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      email: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                id="free-solo-dialog-demo"
                options={emails}
                getOptionLabel={(option) => {
                  // for example value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.email;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li {...props}>{option.email}</li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="outlined-basic"
                    label="Receiver Email"
                    variant="filled"
                    className="rounded-lg mb-4"
                    type="text"
                    // onChange={(event) => setEmail(event.target.value)}
                  />
                )}
              />
              <Dialog open={dialog} onClose={handleDialogClose}>
                <form onSubmit={handleAddEmailSubmit}>
                  <DialogTitle>Add a new contact</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Want to add a new contact to your recents? Add it!
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      value={dialogValue.email}
                      onChange={(event) =>
                        setDialogValue({
                          ...dialogValue,
                          email: event.target.value,
                        })
                      }
                      label="title"
                      type="text"
                      variant="standard"
                    />
                    <TextField
                      margin="dense"
                      id="name"
                      value={dialogValue.name}
                      onChange={(event) =>
                        setDialogValue({
                          ...dialogValue,
                          name: event.target.value,
                        })
                      }
                      label="year"
                      type="text"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default Notebook;
