"use client";

import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import TimeSeriesPredictionBar from "../components/TimeSeriesPredictionBar";
import TimeDateBar from "../components/TimeDateBar";
import TimeSeriesPictureBar from "../components/TimeSeriesPictureBar";
import NoteTaker from "../components/NoteTaker";

import MiniChatbot from "../components/MiniChatbot";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import { Tooltip } from "@mui/material";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1.5px solid ${theme.palette.divider}`,

  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, .1)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const hurricaneCategoriesDescriptionsWind = [
  {
    category: 0,
    description:
      "With winds reaching speeds of up to 65 knots, minimal damage is anticipated in this cyclone category.",
  },
  {
    category: 1,
    description:
      "Winds ranging from 66 to 90 knots signify this category, where some damage is expected to occur.",
  },
  {
    category: 2,
    description:
      "With wind speeds ranging from 91 to 102 knots, significant damage is probable in this cyclone category.",
  },
  {
    category: 3,
    description:
      "Expect severe damage with winds ranging from 103 to 115 knots in this cyclone category.",
  },
  {
    category: 4,
    description:
      "With winds ranging from 116 to 140 knots, there is a possibility of catastrophic damage in this category.",
  },
  {
    category: 5,
    description:
      "With wind speeds surpassing 140 knots, extreme devastation is highly probable in this cyclone category.",
  },
];

const hurricaneCategoriesPressure = [
  {
    category: 0,
    description:
      "Pressure approximately 1000 hPa suggests relatively calm conditions, typical for lower intensity cyclones in this category.",
  },
  {
    category: 1,
    description:
      "With pressure around 987 hPa, this category typically denotes mild cyclones with slightly lower atmospheric pressure.",
  },
  {
    category: 2,
    description:
      "At around 970 hPa, the pressure indicates a moderate drop, signifying increasing cyclonic intensity in this category.",
  },
  {
    category: 3,
    description:
      "Around 960 hPa, significant pressure decrease implies intensified cyclonic conditions within this category.",
  },
  {
    category: 4,
    description:
      "At approximately 948 hPa, the pressure indicates a severe cyclone with notably low atmospheric pressure in this category.",
  },
  {
    category: 5,
    description:
      "Around 921 hPa, the pressure denotes an extremely intense cyclone, characterized by very low atmospheric pressure in this category.",
  },
];

function pressureContent(pressure) {
  if (pressure < 921)
    return "Around 921 hPa and lower, the pressure denotes an extremely intense cyclone, characterized by very low atmospheric pressure in this category";
  else if (pressure >= 921 && pressure < 949)
    return "At approximately 948 hPa and lower, the pressure indicates a severe cyclone with notably low atmospheric pressure in this category.";
  else if (pressure >= 949 && pressure < 961)
    return "Around 960 hPa, significant pressure decrease implies intensified cyclonic conditions within this category.";
  else if (pressure >= 961 && pressure < 971)
    return "At around 970 hPa, the pressure indicates a moderate drop, signifying increasing cyclonic intensity in this category.";
  else if (pressure >= 971 && pressure < 978)
    return "At around 970 hPa, the pressure indicates a moderate drop, signifying increasing cyclonic intensity in this category.";
  else if (pressure >= 979 && pressure < 990)
    return "With pressure around 987 hPa, this category typically denotes mild cyclones with slightly lower atmospheric pressure.";
  else
    return "Pressure approximately 1000 hPa suggests relatively calm conditions, typical for lower intensity cyclones in this category.";
}

function intensityContent(intensity) {
  if (intensity < 56)
    return "With winds reaching speeds of up to 56 knots, minimal damage is anticipated in this cyclone category.";
  else if (intensity >= 56 && intensity < 78)
    return "Winds ranging from 56 to 78 knots signify this category, where some damage is expected to occur.";
  else if (intensity >= 78 && intensity < 90)
    return "With wind speeds ranging from 78 to 90 knots, significant damage is probable in this cyclone category.";
  else if (intensity >= 90 && intensity < 102)
    return "Expect severe damage with winds ranging from 90 to 102 knots in this cyclone category.";
  else if (intensity >= 102 && intensity < 115)
    return "With winds ranging from 102 to 115 knots, there is a possibility of catastrophic damage in this category.";
  else if (intensity >= 115 && intensity < 128)
    return "Wind speeds exceeding 115 to 128 knots indicate a high likelihood of extreme devastation occurring within this cyclone category.";
  else
    return "With wind speeds surpassing 128 knots, extreme devastation is highly probable in this cyclone category.";
}

const TimeSeries = () => {
  const [visible, setVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [currentWindUnit, setCurrentWindUnit] = useState("knots");
  const [currentPressureUnit, setCurrentPressureUnit] = useState("Pa");

  const setWindConversionFactorFunction = (conversionFactor) => {
    setWindData((prevWindData) => {
      const updatedWindData = prevWindData.map((obj) => {
        const updatedWind = obj.Wind * conversionFactor;

        return {
          ...obj,
          Wind: updatedWind.toFixed(4),
        };
      });
      return updatedWindData;
    });
  };

  const setPressureConversionFactorFunction = (conversionFactor) => {
    setPressureData((prevPressureData) => {
      const updatedPressureData = prevPressureData.map((obj) => {
        const updatedPressure = obj.Pressure * conversionFactor;

        return {
          ...obj,
          Pressure: updatedPressure.toFixed(2),
        };
      });
      return updatedPressureData;
    });
  };

  const [timeSeriesData, setTimeSeriesData] = useState({
    general_data: {
      id: 98,
      wind: "19.28828",
      pressure: "1002.43",
      t_number: "1.0",
      category: "0",
      original_img: "/original.jpg",
      processed_img: "/media/processed/processed_sYZibE5.png",
      timestamp: "2024-04-13T07:04:07.423692+05:30",
    },
    next_wind_data: [18.4065, 19.3214, 20.2363, 21.1511],
    previous_wind_data: [
      11.43553, 14.26533, 12.50797, 11.93501, 11.79449, 17.28666, 15.80252,
      19.28828,
    ],
    next_pressure_data: [1002.89, 1002.98, 1003.06, 1003.15],
    previous_pressure_data: [
      1002.0, 1005.0, 1002.0, 1000.0, 1000.0, 1004.84, 1002.93, 1003.29,
    ],
  });

  const [currentTimestamp, setCurrentTimestamp] = useState(
    "2024-04-13T07:04:07.423692+05:30"
  );
  const [windPins, setWindPins] = useState([]);
  const [showWindPins, setShowWindPins] = useState(false);

  const [pressurePins, setPressurePins] = useState([]);
  const [showPressurePins, setShowPressurePins] = useState(false);

  function createData(t_number, categories) {
    return { t_number, categories };
  }

  const rows = [
    createData("1.0 - 1.5", 159),
    createData("2.0", 159),
    createData("2.5 - 3.0", 159),
    createData("3.5", 159),
    createData("4.0", 159),
    createData("4.5", 159),
    createData("5.0", 159),
    createData("5.5", 159),
    createData("6.0 - 6.5", 159),
    createData("7.0 - 8.5", 159),
  ];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    } else {
      router.push("/time-series");
    }
  }, [router, session]);

  const [windData, setWindData] = useState([
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "00:00",
      Wind: 30.0,
    },
    {
      name: "03:00",
      Wind: 30.0,
    },
    {
      name: "06:00",
      Wind: 35.0,
    },
    {
      name: "09:00",
      Wind: 0.0,
    },
    {
      name: "12:00",
      Wind: 25.0,
    },
    {
      name: "15:00",
      Wind: 25.0,
    },
    {
      name: "18:00",
      Wind: 25.0,
    },
    {
      name: "21:00",
      Wind: 25.0,
    },
    {
      name: "00:00",
      Wind: 20.0,
    },
  ]);

  const [pressureData, setPressureData] = useState([
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "00:00",
      Pressure: 1000.0,
    },
    {
      name: "03:00",
      Pressure: 1000.0,
    },
    {
      name: "06:00",
      Pressure: 999.0,
    },
    {
      name: "09:00",
      Pressure: 0.0,
    },
    {
      name: "12:00",
      Pressure: 1002.0,
    },
    {
      name: "15:00",
      Pressure: 1002.0,
    },
    {
      name: "18:00",
      Pressure: 1003.0,
    },
    {
      name: "21:00",
      Pressure: 1003.0,
    },
    {
      name: "00:00",
      Pressure: 1004.0,
    },
  ]);

  async function logData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/time_series/prediction/`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setTimeSeriesData(data);
    const {
      general_data,
      next_wind_data,
      previous_wind_data,
      next_pressure_data,
      previous_pressure_data,
    } = data;
    const { wind, pressure, timestamp } = general_data;

    const currentDate = new Date();

    setCurrentTimestamp(currentDate.toISOString());

    const formatTime = (date) =>
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;

    const previousWindObjects = previous_wind_data.map((windValue, index) => ({
      name: formatTime(
        new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
      ),
      Wind: windValue,
    }));

    const currentWindObject = {
      name: formatTime(currentDate),
      Wind: parseFloat(wind),
    };

    const nextWindObjects = next_wind_data.map((windValue, index) => ({
      name: formatTime(
        new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
      ),
      Wind: windValue,
    }));

    const previousPressureObjects = previous_pressure_data.map(
      (pressureValue, index) => ({
        name: formatTime(
          new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)
        ),
        Pressure: pressureValue,
      })
    );

    const currentPressureObject = {
      name: formatTime(currentDate),
      Pressure: parseFloat(pressure),
    };

    const nextPressureObjects = next_pressure_data.map(
      (pressureValue, index) => ({
        name: formatTime(
          new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)
        ),
        Pressure: pressureValue,
      })
    );

    const windResult = [
      ...previousWindObjects.reverse(),
      currentWindObject,
      ...nextWindObjects,
    ];
    const newWind = windResult.splice(1, 13);
    setWindData(newWind);
    // setWindData(windResult);

    const pressureResult = [
      ...previousPressureObjects.reverse(),
      currentPressureObject,
      ...nextPressureObjects,
    ];
    const newPressure = pressureResult.splice(1, 13);
    setPressureData(newPressure);
    // setPressureData(pressureResult);
  }

  // Un comment below for fetching:
  useEffect(() => {
    logData();
  }, []);

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
    const storedWindPins = localStorage.getItem("windpins");
    if (storedWindPins) {
      setWindPins(JSON.parse(storedWindPins));
    }
    const storedPressurePins = localStorage.getItem("pressurepins");
    if (storedPressurePins) {
      setPressurePins(JSON.parse(storedPressurePins));
    }
  }, []);

  const pressureCopyHandler = (pressure, time, tense) => {
    const newData = {
      ...data,
      [`${tense} Pressure From ${currentTimestamp}`]: `${pressure} ${currentPressureUnit} at ${time}`,
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

  const windCopyHandler = (wind, time, tense) => {
    const newData = {
      ...data,
      [`${tense} Intensity From ${currentTimestamp}`]: `${wind} ${currentWindUnit} at ${time}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Wind Copied To Logs!", {
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

  const windClipboardHandler = (wind, time, tense) => {
    const textToCopy = `${tense} Cyclone Wind Intensity From ${currentTimestamp}: ${wind} ${currentWindUnit} at ${time}`;
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

  const pressureClipboardHandler = (pressure, time, tense) => {
    const textToCopy = `${tense} Cyclone Pressure From ${currentTimestamp}: ${pressure} ${currentPressureUnit} at ${time}`;
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

  const pressureWebSearchHandler = (pressure, time, tense) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `${tense} Cyclone Pressure From ${currentTimestamp}: ${pressure} ${currentPressureUnit} at ${time}`
      )}`,
      "_blank"
    );
  };

  const windWebSearchHandler = (wind, time, tense) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `${tense} Cyclone Wind Intensity From ${currentTimestamp}: ${wind} ${currentWindUnit} at ${time}`
      )}`,
      "_blank"
    );
  };

  const pressureChatbotHandler = (pressure, time, tense) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The ${tense} cyclone pressure at the Indian Ocean from ${currentTimestamp} is ${pressure} ${currentPressureUnit} at ${time}. Can you please analyze this?`,
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

  const windChatbotHandler = (wind, time, tense) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [
        `The ${tense} cyclone wind intensity at the Indian Ocean from ${currentTimestamp} is ${wind} ${currentWindUnit} at ${time}. Can you please analyze this?`,
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

  const pinThisWindInfoHandler = (wind, time, tense) => {
    setWindPins((prevWindPins) => {
      const newWindPins = [
        `${tense} Wind From ${currentTimestamp}: ${wind} ${currentWindUnit} at ${time}`,
        ...prevWindPins,
      ];
      localStorage.setItem("windpins", JSON.stringify(newWindPins));
      return newWindPins;
    });
    toast.success("Intensity Added To Pins", {
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

  const handleDeleteWindPin = (index) => {
    setWindPins((prevWindPins) => {
      const newWindPins = [...prevWindPins];
      newWindPins.splice(index, 1);
      localStorage.setItem("windpins", JSON.stringify(newWindPins));
      return newWindPins;
    });
    toast.success("Intensity Pin Deleted!", {
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

  const pinThisPressureInfoHandler = (pressure, time, tense) => {
    setPressurePins((prevPressurePins) => {
      const newPressurePins = [
        `${tense} Pressure From ${currentTimestamp}: ${pressure} ${currentPressureUnit} at ${time}`,
        ...prevPressurePins,
      ];
      localStorage.setItem("pressurepins", JSON.stringify(newPressurePins));
      return newPressurePins;
    });
    toast.success("Pressure Added To Pins!", {
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

  const handleDeletePressurePin = (index) => {
    setPressurePins((prevPressurePins) => {
      const newPressurePins = [...prevPressurePins];
      newPressurePins.splice(index, 1);
      localStorage.setItem("pressurepins", JSON.stringify(newPressurePins));
      return newPressurePins;
    });
    toast.success("Pressure Pin Deleted!", {
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

  const reverseArray = (array) => {
    const tempArray = [...array];
    tempArray.reverse();
    return tempArray;
  };

  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
              <div className="h-30 bg-white bg-opacity-30 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6">
                FORECASTS
              </div>
              <div className="flex flex-col h-full rounded-lg w-80 mr-6 overflow-scroll">
                <div className="h-1/2 mb-6 flex flex-col overflow-scroll">
                  <div className="bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 flex justify-center h-10">
                    <div className="h-full flex flex-col justify-center mr-2">
                      {showWindPins
                        ? "INTENSITY PINS"
                        : `INTENSITY (${currentWindUnit})`}
                    </div>
                    {showWindPins ? (
                      <Tooltip title="Show Forecasts">
                        <button
                          className="border border-white bg-white text-black rounded flex flex-col justify-center w-6 items-center opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                          onClick={() => setShowWindPins(false)}
                        >
                          <PushPinIcon sx={{ fontSize: 15 }} />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show Pins">
                        <button
                          className="border border-white rounded flex flex-col justify-center w-6 items-center opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                          onClick={() => setShowWindPins(true)}
                        >
                          <PushPinOutlinedIcon sx={{ fontSize: 15 }} />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                  {showWindPins ? (
                    <div className="h-full w-full bg-white bg-opacity-10 rounded-lg p-2 overflow-scroll">
                      {windPins.length === 0 ? (
                        <div className="w-full p-2 rounded-lg border border-white opacity-20 text-center">
                          No Intensity Pins!
                        </div>
                      ) : (
                        <>
                          {windPins?.map((windPin, index) => (
                            <div className="flex flex-row w-full mb-2 p-2 border border-white rounded-lg border-opacity-20">
                              <div className="w-full bg-white bg-opacity-20 text-white rounded-md text-center p-2 mr-2">
                                {windPin}
                              </div>
                              <Tooltip title="Remove From Pins">
                                <button
                                  className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                                  onClick={() => handleDeleteWindPin(index)}
                                >
                                  <DeleteIcon />
                                </button>
                              </Tooltip>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="h-full w-full bg-white bg-opacity-10 rounded-lg p-2 overflow-scroll">
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll border-opacity-20">
                        <Tooltip title="Future Forecasted Intensity Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            FUTURE
                          </div>
                        </Tooltip>
                        {reverseArray(windData.slice(-4)).map(
                          (windDatum, index) => (
                            <Accordion className="mb-2">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                              >
                                {`[${windDatum.name}] Wind: ${windDatum.Wind}`}
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="flex flex-col justify-items-center text-center w-full">
                                  <div className="mb-2">
                                    {intensityContent(windDatum.Wind)}
                                  </div>
                                  <div className="w-full text-center flex justify-center mb-1">
                                    <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                      <Tooltip title="Copy to Clipboard">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windClipboardHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <FileCopyIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Copy to Logs">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windCopyHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <ExitToAppIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Search the Web">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windWebSearchHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <TravelExploreIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Ask the Chatbot">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windChatbotHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <ContactSupportIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Pin This Info">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pinThisWindInfoHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              `Future-${index + 1}`
                                            )
                                          }
                                        >
                                          <PushPinIcon />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </div>
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll mt-4 border-opacity-20">
                        <Tooltip title="Current Predicted Pressure Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            CURRENT
                          </div>
                        </Tooltip>
                        {[windData[7]].map((windDatum, index) => (
                          <Accordion className="mb-2">
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index + 1}-content`}
                              id={`panel${index + 1}-header`}
                            >
                              {`[${windDatum.name}] Wind: ${windDatum.Wind}`}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="flex flex-col justify-items-center text-center w-full">
                                <div className="mb-2">
                                  {intensityContent(windDatum.Wind)}
                                </div>
                                <div className="w-full text-center flex justify-center mb-1">
                                  <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                    <Tooltip title="Copy to Clipboard">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          windClipboardHandler(
                                            windDatum.Wind,
                                            windDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <FileCopyIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Copy to Logs">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          windCopyHandler(
                                            windDatum.Wind,
                                            windDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <ExitToAppIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Search the Web">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          windWebSearchHandler(
                                            windDatum.Wind,
                                            windDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <TravelExploreIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Ask the Chatbot">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          windChatbotHandler(
                                            windDatum.Wind,
                                            windDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <ContactSupportIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Pin This Info">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          pinThisWindInfoHandler(
                                            windDatum.Wind,
                                            windDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <PushPinIcon />
                                      </button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll mt-4 border-opacity-20">
                        <Tooltip title="Previously Known Pressure Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            PREVIOUS
                          </div>
                        </Tooltip>
                        {reverseArray(windData.slice(0, 7)).map(
                          (windDatum, index) => (
                            <Accordion className="mb-2">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                              >
                                {`[${windDatum.name}] Wind: ${windDatum.Wind}`}
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="flex flex-col justify-items-center text-center w-full">
                                  <div className="mb-2">
                                    {intensityContent(windDatum.Wind)}
                                  </div>
                                  <div className="w-full text-center flex justify-center mb-1">
                                    <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                      <Tooltip title="Copy to Clipboard">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windClipboardHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <FileCopyIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Copy to Logs">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windCopyHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <ExitToAppIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Search the Web">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windWebSearchHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <TravelExploreIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Ask the Chatbot">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            windChatbotHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <ContactSupportIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Pin This Info">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pinThisWindInfoHandler(
                                              windDatum.Wind,
                                              windDatum.name,
                                              `Previous-${index + 1}`
                                            )
                                          }
                                        >
                                          <PushPinIcon />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-1/2 flex flex-col overflow-scroll">
                  <div className="bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 h-10 flex justify-center">
                    <div className="h-full flex flex-col justify-center mr-2">
                      {showPressurePins
                        ? "PRESSURE PINS"
                        : `PRESSURE (${currentPressureUnit})`}
                    </div>
                    {showPressurePins ? (
                      <Tooltip title="Show Forecasts">
                        <button
                          className="border border-white bg-white text-black rounded flex flex-col justify-center w-6 items-center opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                          onClick={() => setShowPressurePins(false)}
                        >
                          <PushPinIcon sx={{ fontSize: 15 }} />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show Pins">
                        <button
                          className="border border-white rounded flex flex-col justify-center w-6 items-center opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                          onClick={() => setShowPressurePins(true)}
                        >
                          <PushPinOutlinedIcon sx={{ fontSize: 15 }} />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                  {showPressurePins ? (
                    <div className="h-full w-full bg-white bg-opacity-10 rounded-lg p-2 overflow-scroll">
                      {windPins.length === 0 ? (
                        <div className="w-full p-2 rounded-lg border border-white opacity-20 text-center">
                          No Pressure Pins!
                        </div>
                      ) : (
                        <>
                          {pressurePins?.map((pressurePin, index) => (
                            <div className="flex flex-row w-full mb-2 p-2 border border-white rounded-lg border-opacity-20">
                              <div className="w-full bg-white bg-opacity-20 text-white rounded-md text-center p-2 mr-2">
                                {pressurePin}
                              </div>
                              <Tooltip title="Remove From Pins">
                                <button
                                  className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                                  onClick={() => handleDeletePressurePin(index)}
                                >
                                  <DeleteIcon />
                                </button>
                              </Tooltip>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="h-full w-full bg-white bg-opacity-10 rounded-lg p-2 overflow-scroll">
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll border-opacity-20">
                        <Tooltip title="Future Forecasted Pressure Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            FUTURE
                          </div>
                        </Tooltip>
                        {reverseArray(pressureData.slice(-4)).map(
                          (pressureDatum, index) => (
                            <Accordion className="mb-2">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                              >
                                {`[${pressureDatum.name}] Pressure: ${pressureDatum.Pressure}`}
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="flex flex-col justify-items-center text-center w-full">
                                  <div className="mb-2">
                                    {pressureContent(pressureDatum.Pressure)}
                                  </div>
                                  <div className="w-full text-center flex justify-center mb-1">
                                    <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                      <Tooltip title="Copy to Clipboard">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureClipboardHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <FileCopyIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Copy to Logs">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureCopyHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <ExitToAppIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Search the Web">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureWebSearchHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <TravelExploreIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Ask the Chatbot">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150 mr-2"
                                          onClick={() =>
                                            pressureChatbotHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Future"
                                            )
                                          }
                                        >
                                          <ContactSupportIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Pin This Info">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pinThisPressureInfoHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              `Future-${index + 1}`
                                            )
                                          }
                                        >
                                          <PushPinIcon />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </div>
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll mt-4 border-opacity-20">
                        <Tooltip title="Current Predicted Pressure Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            CURRENT
                          </div>
                        </Tooltip>
                        {[pressureData[7]].map((pressureDatum, index) => (
                          <Accordion className="mb-2">
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index + 1}-content`}
                              id={`panel${index + 1}-header`}
                            >
                              {`[${pressureDatum.name}] Pressure: ${pressureDatum.Pressure}`}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="flex flex-col justify-items-center text-center w-full">
                                <div className="mb-2">
                                  {pressureContent(pressureDatum.Pressure)}
                                </div>
                                <div className="w-full text-center flex justify-center mb-1">
                                  <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                    <Tooltip title="Copy to Clipboard">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          pressureClipboardHandler(
                                            pressureDatum.Pressure,
                                            pressureDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <FileCopyIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Copy to Logs">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          pressureCopyHandler(
                                            pressureDatum.Pressure,
                                            pressureDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <ExitToAppIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Search the Web">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          pressureWebSearchHandler(
                                            pressureDatum.Pressure,
                                            pressureDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <TravelExploreIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Ask the Chatbot">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150 mr-2"
                                        onClick={() =>
                                          pressureChatbotHandler(
                                            pressureDatum.Pressure,
                                            pressureDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <ContactSupportIcon />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Pin This Info">
                                      <button
                                        className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                        onClick={() =>
                                          pinThisPressureInfoHandler(
                                            pressureDatum.Pressure,
                                            pressureDatum.name,
                                            "Current"
                                          )
                                        }
                                      >
                                        <PushPinIcon />
                                      </button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                      <div className="flex flex-col border border-white rounded-md px-2 pt-2 overflow-scroll mt-4 border-opacity-20">
                        <Tooltip title="Previously Known Pressure Values">
                          <div className="p-2 bg-white bg-opacity-15 text-center mb-4 rounded-md hover:text-black hover:bg-opacity-100 transition ease-in-out delay-150">
                            PREVIOUS
                          </div>
                        </Tooltip>
                        {reverseArray(pressureData.slice(0, 7)).map(
                          (pressureDatum, index) => (
                            <Accordion className="mb-2">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                              >
                                {`[${pressureDatum.name}] Pressure: ${pressureDatum.Pressure}`}
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="flex flex-col justify-items-center text-center w-full">
                                  <div className="mb-2">
                                    {pressureContent(pressureDatum.Pressure)}
                                  </div>
                                  <div className="w-full text-center flex justify-center mb-1">
                                    <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                      <Tooltip title="Copy to Clipboard">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureClipboardHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <FileCopyIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Copy to Logs">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureCopyHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <ExitToAppIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Search the Web">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pressureWebSearchHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <TravelExploreIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Ask the Chatbot">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150 mr-2"
                                          onClick={() =>
                                            pressureChatbotHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              "Previous"
                                            )
                                          }
                                        >
                                          <ContactSupportIcon />
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Pin This Info">
                                        <button
                                          className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150"
                                          onClick={() =>
                                            pinThisPressureInfoHandler(
                                              pressureDatum.Pressure,
                                              pressureDatum.name,
                                              `Previous-${index + 1}`
                                            )
                                          }
                                        >
                                          <PushPinIcon />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center rounded-lg h-full w-full">
              <TimeDateBar />
              <TimeSeriesPictureBar
                wind={windData}
                pressure={pressureData}
                // original={timeSeriesData.general_data.original_img}
                original={
                   `${process.env.NEXT_PUBLIC_IP_ADDRESS_URL}/` +
                  timeSeriesData.general_data.original_img
                }
              />
              <TimeSeriesPredictionBar
                windIntensity={timeSeriesData.general_data.wind}
                windPressure={timeSeriesData.general_data.pressure}
                windCategory={timeSeriesData.general_data.category}
                setSpeedConversionFactorFunction={
                  setWindConversionFactorFunction
                }
                setPressureConversionFactorFunction={
                  setPressureConversionFactorFunction
                }
                setCurrentWindUnitParent={setCurrentWindUnit}
                setCurrentPressureUnitParent={setCurrentPressureUnit}
              />
              <MiniChatbot visible={visible} />
              <NoteTaker notesVisible={notesVisible} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  return (
    <div className="w-screen h-screen bg-black">
      {/* {useEffect(() => {
        router.push('/');
      })} */}
    </div>
  );
};

export default TimeSeries;

{
  /* {windData.map((windDatum, index) => (
                      // <div className="rounded-lg w-full bg-white bg-opacity-15 flex flex-col p-3 mb-2">
                      //   Wind: {windDatum.Wind} <br />
                      //   Timestamp: {windDatum.name}
                      // </div>
                      <Accordion className="mb-2">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}-content`}
                          id={`panel${index + 1}-header`}
                        >
                          {`[${windDatum.name}] Wind: ${windDatum.Wind} knots`}
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex flex-col justify-items-center text-center w-full">
                            <div className="mb-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </div>
                            <div className="w-full text-center flex justify-center mb-1">
                              <div className="border border-white rounded-sm border-opacity-40 flex flex-row p-2 mt-3 w-fit">
                                <Tooltip title="Copy to Clipboard">
                                  <button className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150">
                                    <FileCopyIcon />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Copy to Logs">
                                  <button className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150">
                                    <ExitToAppIcon />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Search the Web">
                                  <button className="w-fit p-1 border border-white rounded-sm mr-2 opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150">
                                    <TravelExploreIcon />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Ask the Chatbot">
                                  <button className="w-fit p-1 border border-white rounded-sm opacity-40 hover:bg-white hover:opacity-100 hover:text-black transition ease-in-out delay-150">
                                    <ContactSupportIcon />
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))} */
}

// <div className="rounded-lg w-full bg-white bg-opacity-15 flex flex-col p-3 mb-2">
//   Pressure: {pressureDatum.Pressure} <br />
//   Timestamp: {pressureDatum.name}
// </div>
// <Accordion className="mb-2">
//   <AccordionSummary
//     expandIcon={<ExpandMoreIcon />}
//     aria-controls={`panel${index + 1}-content`}
//     id={`panel${index + 1}-header`}
//   >
//     {`[${pressureDatum.name}] Pressure: ${pressureDatum.Pressure} mbar`}
//   </AccordionSummary>
//   <AccordionDetails>
//     Lorem ipsum dolor sit amet, consectetur adipiscing
//     elit. Suspendisse malesuada lacus ex, sit amet blandit
//     leo lobortis eget.
//   </AccordionDetails>
// </Accordion>
