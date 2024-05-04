import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";

import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { IconButton } from "@mui/material";

import {
  pressureConverter,
  speedConverter,
  pressureConversionFactor,
  speedConversionFactor,
} from "./UnitConversionFunctions";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';

import Drawer from "@mui/material/Drawer";

import InfoContent from "./InfoContent";

import HelperDrawerContent from "./HelperDrawerContent";

export default function PredictionBar({
  windIntensity,
  windPressure,
  windCategory,
  setSpeedConversionFactorFunction,
  setPressureConversionFactorFunction,
  setCurrentWindUnitParent,
  setCurrentPressureUnitParent,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpenDrawer) => () => {
    setOpenDrawer(newOpenDrawer);
  };

  const [windDisabled, setWindDisabled] = useState(true);

  const [pressureDisabled, setPressureDisabled] = useState(false);

  const [currentIntensityUnit, setCurrentIntensityUnit] = useState("knots");
  const [currentPressureUnit, setCurrentPressureUnit] = useState("Pa");

  const [intensity, setIntensity] = useState(20);

  const handleIntensityChange = () => {
    const fromUnit = intensityUnit["curr"];
    const newIntensityUnits = {
      prev: intensityUnit["curr"],
    };
    if (fromUnit == "knots") {
      newIntensityUnits["curr"] = "kmh";
    } else if (fromUnit == "kmh") {
      newIntensityUnits["curr"] = "mps";
    } else if (fromUnit == "mps") {
      newIntensityUnits["curr"] = "mph";
    } else if (fromUnit == "mph") {
      newIntensityUnits["curr"] = "fps";
    } else {
      newIntensityUnits["curr"] = "knots";
    }

    const changedSpeed = speedConverter(
      intensity,
      newIntensityUnits["prev"],
      newIntensityUnits["curr"]
    );
    setCurrentWindUnitParent(newIntensityUnits.curr);
    setSpeedConversionFactorFunction(
      speedConversionFactor(newIntensityUnits.prev, newIntensityUnits.curr)
    );
    setIntensityUnit(newIntensityUnits);
    setIntensity(changedSpeed);
  };

  const [pressure, setPressure] = useState(20);

  const handlePressureChange = () => {
    const fromUnit = pressureUnit["curr"];
    const newPressureUnits = {
      prev: pressureUnit["curr"],
    };
    if (fromUnit == "Pa") {
      newPressureUnits["curr"] = "mbar";
    } else if (fromUnit == "mbar") {
      newPressureUnits["curr"] = "bar";
    } else if (fromUnit == "bar") {
      newPressureUnits["curr"] = "mmHg";
    } else if (fromUnit == "mmHg") {
      newPressureUnits["curr"] = "atm";
    } else {
      newPressureUnits["curr"] = "Pa";
    }

    const changedPressure = pressureConverter(
      pressure,
      newPressureUnits["prev"],
      newPressureUnits["curr"]
    );

    setCurrentPressureUnitParent(newPressureUnits.curr);
    setPressureConversionFactorFunction(
      pressureConversionFactor(newPressureUnits.prev, newPressureUnits.curr)
    );

    setPressureUnit(newPressureUnits);
    setPressure(changedPressure);
  };

  const [category, setCategory] = useState("Cat-1");

  const [intensityUnit, setIntensityUnit] = useState({
    prev: "knots",
    curr: "knots",
  });

  const handleIntensityUnitChange = (event) => {
    setWindDisabled(false);
    setCurrentIntensityUnit(event.target.value);
  };

  const [pressureUnit, setPressureUnit] = useState({
    prev: "Pa",
    curr: "Pa",
  });

  const handlePressureUnitChange = (event) => {
    setPressureDisabled(false);
    setCurrentPressureUnit(event.target.value);
  };

  function settingsSaveHandler() {
    // window.open(`https://www.google.com/search?q=${encodeURIComponent('Wind Intensity: 20')}`, '_blank');
    if (!windDisabled) {
      const newIntensityUnits = {
        prev: intensityUnit["curr"],
        curr: currentIntensityUnit,
      };
      setCurrentWindUnitParent(currentIntensityUnit);
      setSpeedConversionFactorFunction(
        speedConversionFactor(newIntensityUnits.prev, newIntensityUnits.curr)
      );
      setIntensityUnit(newIntensityUnits);

      const changedSpeed = speedConverter(
        intensity,
        intensityUnit["prev"],
        intensityUnit["curr"]
      );

      setIntensity(changedSpeed);
    }

    if (!pressureDisabled) {
      const newPressureUnits = {
        prev: pressureUnit["curr"],
        curr: currentPressureUnit,
      };
      setCurrentPressureUnitParent(currentPressureUnit);
      setPressureConversionFactorFunction(
        pressureConversionFactor(newPressureUnits.prev, newPressureUnits.curr)
      );
      setPressureUnit(newPressureUnits);

      const changedPressure = pressureConverter(
        pressure,
        pressureUnit["prev"],
        pressureUnit["curr"]
      );

      setPressure(changedPressure);
    }

    setOpen(false);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    outline: "none",
  };

  const styleInfo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '70vw',
    height: '70vh',
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    // borderRadius: "10px",
    // overflow: "scroll",
  };

  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const pressureCopyHandler = () => {
    const dateTimeString = new Date();
    const newData = {
      ...data,
      ["Current Pressure"]: `${pressure} ${
        pressureUnit["curr"]
      } at ${dateTimeString.toString()}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Pressure Copied To Logs!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const windCopyHandler = () => {
    const dateTimeString = new Date();
    const newData = {
      ...data,
      ["Current Wind"]: `${intensity} ${
        intensityUnit["curr"]
      } at ${dateTimeString.toString()}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Intensity Copied To Logs!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const categoryCopyHandler = () => {
    const dateTimeString = new Date();
    const newData = {
      ...data,
      ["Current Category"]: `${category} at ${dateTimeString.toString()}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Category Copied To Logs!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const windClipboardHandler = () => {
    const dateTimeString = new Date();
    const textToCopy = `Cyclone Wind Intensity At: ${dateTimeString.toString()}: ${intensity} ${
      intensityUnit["curr"]
    }`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Intensity Copied To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Info copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Failed to copy info to clipboard:", error);
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
      });
  };

  const windWebSearchHandler = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `Cyclone Wind Intensity: ${intensity} ${intensityUnit["curr"]}`
      )}`,
      "_blank"
    );
  };

  const pressureClipboardHandler = () => {
    const dateTimeString = new Date();
    const textToCopy = `Cyclone Pressure At: ${dateTimeString.toString()}: ${pressure} ${
      pressureUnit["curr"]
    }`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Pressure Copied To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Info copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Failed to copy info to clipboard:", error);
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
      });
  };

  const categoryClipboardHandler = () => {
    const dateTimeString = new Date();
    const textToCopy = `Cyclone Category At: ${dateTimeString.toString()}: ${category}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Category Copied To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Info copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Failed to copy info to clipboard:", error);
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
      });
  };

  const pressureWebSearchHandler = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `Cyclone Pressure: ${pressure} ${pressureUnit["curr"]}`
      )}`,
      "_blank"
    );
  };

  const categoryWebSearchHandler = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `Cyclone Category: ${category}`
      )}`,
      "_blank"
    );
  };

  const pressureChatbotHandler = () => {
    const dateTimeString = new Date();
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The current cyclone pressure at the Indian Ocean is ${pressure} ${
          pressureUnit["curr"]
        } at ${dateTimeString.toString()}. Can you please analyze this?`,
        ...prevQuestions,
      ];
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      return newQuestions;
    });
    toast.success("Pressure Copied To Questions!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const windChatbotHandler = () => {
    const dateTimeString = new Date();
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The current cyclone intensity at the Indian Ocean is ${intensity} ${
          intensityUnit["curr"]
        } at ${dateTimeString.toString()}. Can you please analyze this?`,
        ...prevQuestions,
      ];
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      return newQuestions;
    });
    toast.success("Intensity Copied To Questions!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const categoryChatbotHandler = () => {
    const dateTimeString = new Date();
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The current cyclone category at the Indian Ocean is ${category} at ${dateTimeString.toString()}. Can you please analyze this?`,
        ...questions,
      ];
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      return prevQuestions;
    });
    toast.success("Category Copied To Questions!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    setIntensity(windIntensity);
    setPressure(windPressure);
    setCategory(windCategory);
  }, [windIntensity, windPressure, windCategory]);

  // const actions = [
  //   { icon: <FileCopyIcon />, name: 'Copy to Clipboard' },
  //   { icon: <ExitToAppIcon />, name: 'Copy to Logs' },
  //   { icon: <ContactSupportIcon />, name: 'Ask the Chatbot' },
  //   { icon: <TravelExploreIcon />, name: 'Search the Web' },
  // ];
  const actionsWind = [
    {
      icon: (
        <IconButton onClick={windClipboardHandler}>
          <FileCopyIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Clipboard",
    },
    {
      icon: (
        <IconButton onClick={windCopyHandler}>
          <ExitToAppIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Logs",
    },
    {
      icon: (
        <IconButton onClick={windWebSearchHandler}>
          <TravelExploreIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Search the Web",
    },
    {
      icon: (
        <IconButton onClick={windChatbotHandler}>
          <ContactSupportIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Ask the Chatbot",
    },
  ];

  const actionsPressure = [
    {
      icon: (
        <IconButton onClick={pressureClipboardHandler}>
          <FileCopyIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Clipboard",
    },
    {
      icon: (
        <IconButton onClick={pressureCopyHandler}>
          <ExitToAppIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Logs",
    },
    {
      icon: (
        <IconButton onClick={pressureWebSearchHandler}>
          <TravelExploreIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Search the Web",
    },
    {
      icon: (
        <IconButton onClick={pressureChatbotHandler}>
          <ContactSupportIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Ask the Chatbot",
    },
  ];

  const actionsCategory = [
    {
      icon: (
        <IconButton onClick={categoryClipboardHandler}>
          <FileCopyIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Clipboard",
    },
    {
      icon: (
        <IconButton onClick={categoryCopyHandler}>
          <ExitToAppIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Copy to Logs",
    },
    {
      icon: (
        <IconButton onClick={categoryWebSearchHandler}>
          <TravelExploreIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Search the Web",
    },
    {
      icon: (
        <IconButton onClick={categoryChatbotHandler}>
          <ContactSupportIcon sx={{ fontSize: 20 }} />
        </IconButton>
      ),
      name: "Ask the Chatbot",
    },
  ];

  const getNextPressureUnit = () => {
    if (pressureUnit["curr"] == "Pa") {
      return "mbar";
    } else if (pressureUnit["curr"] == "mbar") {
      return "bar";
    } else if (pressureUnit["curr"] == "bar") {
      return "mmHg";
    } else if (pressureUnit["curr"] == "mmHg") {
      return "atm";
    } else {
      return "Pa";
    }
  };

  const getNextWindUnit = () => {
    if (intensityUnit["curr"] == "knots") {
      return "kmh";
    } else if (intensityUnit["curr"] == "kmh") {
      return "mps";
    } else if (intensityUnit["curr"] == "mps") {
      return "mph";
    } else if (intensityUnit["curr"] == "mph") {
      return "fps";
    } else {
      return "knots";
    }
  };

  return (
    <div className="flex flex-row w-full">
      <ToastContainer />
      <div className="flex items-center rounded-lg h-16 mt-6 py-6 pl-4 w-full bg-white bg-opacity-10">
        <Tooltip title="Unit Settings">
          <button
            className="rounded-md border border-white flex items-center mr-4 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
            onClick={handleOpen}
          >
            <SettingsIcon
              sx={{ fontSize: 25, height: "2rem", width: "2rem" }}
            />
          </button>
        </Tooltip>
        <Tooltip title={"Change Intensity Unit To " + getNextWindUnit()}>
          <button
            className="w-full h-10 text-sm bg-white bg-opacity-10 rounded-lg mr-3 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
            onClick={handleIntensityChange}
          >
            Predicted Intensity: {intensity} {intensityUnit["curr"]}
          </button>
        </Tooltip>
        {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex flex-row items-center mr-6 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                onClick={windCopyHandler}
              >
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
        <div className="flex ml-2 mr-4">
          <div className="relative h-10 w-10">
            <SpeedDial
              ariaLabel="Log book actions"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                // top:0,
                // left:0,
                "& .MuiButtonBase-root:hover": {
                  background: "white",
                  color: "black",
                  border: 2,
                },
                "& .MuiButtonBase-root": {
                  background: "black",
                  height: "2.5rem",
                  width: "2.5rem",
                  border: 2,
                  color: "rgba(255,255,255,0.5)",
                },
              }}
              icon={
                <SpeedDialIcon
                  sx={{
                    "& .MuiSpeedDialIcon-icon": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              // icon={<AddCircleOutlineIcon />}
            >
              {actionsWind.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>
        </div>
        <Tooltip title={"Change Pressure Unit To " + getNextPressureUnit()}>
          <button
            className="w-full h-10 text-sm bg-white bg-opacity-10 rounded-lg mr-3 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
            onClick={handlePressureChange}
          >
            Estimated Pressure: {pressure} {pressureUnit["curr"]}
          </button>
        </Tooltip>
        {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex items-center mr-6 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                onClick={pressureCopyHandler}
              >
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
        <div className="flex ml-2 mr-4">
          <div className="relative h-10 w-10">
            <SpeedDial
              ariaLabel="Log book actions"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                // top:0,
                // left:0,
                "& .MuiButtonBase-root:hover": {
                  background: "white",
                  color: "black",
                  border: 2,
                },
                "& .MuiButtonBase-root": {
                  background: "black",
                  height: "2.5rem",
                  width: "2.5rem",
                  border: 2,
                  color: "rgba(255,255,255,0.5)",
                },
              }}
              icon={
                <SpeedDialIcon
                  sx={{
                    "& .MuiSpeedDialIcon-icon": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              // icon={<AddCircleOutlineIcon />}
            >
              {actionsPressure.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="unit-conversion-settings"
          aria-describedby="unit-conversion-for-predicted-categories"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              UNIT SETTINGS
            </Typography>
            <div className="rounded-md mt-4 flex justify-between p-3 border border-white opacity-40">
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, marginLeft: 2 }}
              >
                Wind Intensity
              </Typography>
              <Select
                defaultValue={"knots"}
                value={currentIntensityUnit}
                label=""
                onChange={handleIntensityUnitChange}
                sx={{ color: "white", width: 400 }}
              >
                {intensityUnit["curr"] == "knots" ? (
                  <MenuItem disabled value={"knots"}>
                    Knots
                  </MenuItem>
                ) : (
                  <MenuItem value={"knots"}>Knots</MenuItem>
                )}
                {intensityUnit["curr"] == "kmh" ? (
                  <MenuItem disabled value={"kmh"}>
                    Kilometers per hour
                  </MenuItem>
                ) : (
                  <MenuItem value={"kmh"}>Kilometers per hour</MenuItem>
                )}
                {intensityUnit["curr"] == "mps" ? (
                  <MenuItem disabled value={"mps"}>
                    Meters per second
                  </MenuItem>
                ) : (
                  <MenuItem value={"mps"}>Meters per second</MenuItem>
                )}
                {intensityUnit["curr"] == "mph" ? (
                  <MenuItem disabled value={"mph"}>
                    Miles per hour
                  </MenuItem>
                ) : (
                  <MenuItem value={"mph"}>Miles per hour</MenuItem>
                )}
                {intensityUnit["curr"] == "fps" ? (
                  <MenuItem disabled value={"fps"}>
                    Feet per second
                  </MenuItem>
                ) : (
                  <MenuItem value={"fps"}>Feet per second</MenuItem>
                )}
              </Select>
            </div>
            <div className="rounded-md mt-4 flex justify-between p-3 border border-white opacity-40">
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, marginLeft: 2 }}
              >
                Cyclonic Pressure
              </Typography>
              <Select
                defaultValue={10}
                value={currentPressureUnit}
                label=""
                onChange={handlePressureUnitChange}
                sx={{ color: "white", width: 400 }}
              >
                {pressureUnit["curr"] == "Pa" ? (
                  <MenuItem disabled value={"Pa"}>
                    Pascal
                  </MenuItem>
                ) : (
                  <MenuItem value={"Pa"}>Pascal</MenuItem>
                )}
                {pressureUnit["curr"] == "mbar" ? (
                  <MenuItem disabled value={"mbar"}>
                    Millibar
                  </MenuItem>
                ) : (
                  <MenuItem value={"mbar"}>Millibar</MenuItem>
                )}
                {pressureUnit["curr"] == "bar" ? (
                  <MenuItem disabled value={"bar"}>
                    Bar
                  </MenuItem>
                ) : (
                  <MenuItem value={"bar"}>Bar</MenuItem>
                )}
                {pressureUnit["curr"] == "mmHg" ? (
                  <MenuItem disabled value={"mmHg"}>
                    Millimeter of Mercury
                  </MenuItem>
                ) : (
                  <MenuItem value={"mmHg"}>Millimeter of Mercury</MenuItem>
                )}
                {pressureUnit["curr"] == "atm" ? (
                  <MenuItem disabled value={"atm"}>
                    Standard Atmosphere
                  </MenuItem>
                ) : (
                  <MenuItem value={"atm"}>Standard Atmosphere</MenuItem>
                )}
              </Select>
            </div>
            <div className="w-full flex justify-center">
              <button
                className={
                  "flex-none h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-8 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950"
                }
                onClick={settingsSaveHandler}
              >
                SAVE
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="flex items-center rounded-lg h-16 mt-6 ml-4 py-6 px-4 w-[34rem] bg-white bg-opacity-10">
        <Tooltip title="How to Handle">
          <button
            className="w-full h-10 border border-white rounded-lg mr-3 hover:bg-white hover:text-black border-opacity-20 hover:border-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
            onClick={toggleDrawer(true)}
          >
            Predicted Category: {category}
          </button>
        </Tooltip>
        <Modal
          open={openInfo}
          onClose={handleCloseInfo}
          aria-labelledby="unit-conversion-settings"
          aria-describedby="unit-conversion-for-predicted-categories"
        >
          <Box sx={styleInfo}>
            <InfoContent />
          </Box>
        </Modal>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 750, height: "100vh", padding: "1rem" }}
            role="presentation"
            // onClick={toggleDrawer(false)}
          >
            <div className="h-full w-full flex flex-col">
              <div className="w-full rounded-lg p-2 bg-white bg-opacity-20 mb-4 text-center">
                DISASTER MANAGEMENT
              </div>
              <HelperDrawerContent />
            </div>
          </Box>
        </Drawer>
        {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'>
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
        <div className="flex ml-2">
          <div className="relative h-10 w-10">
            <SpeedDial
              ariaLabel="Log book actions"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                // top:0,
                // left:0,
                "& .MuiButtonBase-root:hover": {
                  background: "white",
                  color: "black",
                  border: 2,
                },
                "& .MuiButtonBase-root": {
                  color: "rgba(255,255,255,0.5)",
                  background: "black",
                  height: "2.5rem",
                  width: "2.5rem",
                  border: 2,
                },
              }}
              icon={
                <SpeedDialIcon
                  sx={{
                    "& .MuiSpeedDialIcon-icon": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              // icon={<AddCircleOutlineIcon />}
            >
              {actionsCategory.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>
        </div>
        <div>
          <div>
            <Tooltip title="Cyclone Categories">
              <button
                className="opacity-40 hover:opacity-100 transition ease-in-out delay-150"
                onClick={handleOpenInfo}
              >
                <InfoIcon sx={{ fontSize: 40 }} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
