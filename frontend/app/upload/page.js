"use client";

import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import NavBar from "../components/NavBar";
import UploadPictureBar from "../components/UploadPictureBar";
import MiniChatbot from "../components/MiniChatbot";
import UploadBar from "../components/UploadBar";
import CustomPredictionBar from "../components/CustomPredictionBar";
import NoteTaker from "../components/NoteTaker";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const hurricaneCategories = [
  {
    category: 0,
    cloudTop: "Low, below 10,000 feet",
    temperatureRange: "Moderate, 20-30°C",
    forceRange: "Weak, 25-40 knots",
    gradientScale: "Mild, 1-3 hPa per 100 km",
    coverageRange: "Limited",
    influenceRange: "Localized",
    torqueRange: "Low",
  },
  {
    category: 1,
    cloudTop: "Moderate, 10,000-15,000 feet",
    temperatureRange: "Warm, 25-35°C",
    forceRange: "Mild, 40-60 knots",
    gradientScale: "Gentle, 3-5 hPa per 100 km",
    coverageRange: "Small",
    influenceRange: "Regional",
    torqueRange: "Moderate",
  },
  {
    category: 2,
    cloudTop: "Elevated, 15,000-30,000 feet",
    temperatureRange: "Warmer, 30-40°C",
    forceRange: "Moderate, 60-80 knots",
    gradientScale: "Moderate, 5-7 hPa per 100 km",
    coverageRange: "Moderate",
    influenceRange: "Subcontinental",
    torqueRange: "Increased",
  },
  {
    category: 3,
    cloudTop: "High, 30,000-40,000 feet",
    temperatureRange: "Hot, above 40°C",
    forceRange: "Strong, 80-100 knots",
    gradientScale: "Steeper, 7-9 hPa per 100 km",
    coverageRange: "Extensive",
    influenceRange: "Continental",
    torqueRange: "High",
  },
  {
    category: 4,
    cloudTop: "Very high, above 40,000 feet",
    temperatureRange: "Extremely hot, well above 40°C",
    forceRange: "Very strong, 100-120 knots",
    gradientScale: "Very steep, over 9 hPa per 100 km",
    coverageRange: "Pervasive",
    influenceRange: "Hemispheric",
    torqueRange: "Very high",
  },
  {
    category: 5,
    cloudTop: "Extreme, above 50,000 feet",
    temperatureRange: "Exceptionally hot",
    forceRange: "Extreme, exceeding 120 knots",
    gradientScale: "Extremely steep, over 10 hPa per 100 km",
    coverageRange: "Ubiquitous",
    influenceRange: "Global",
    torqueRange: "Extreme",
  },
];

const Upload = () => {
  const [visible, setVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [intensity, setIntensity] = useState(-20);
  const [pressure, setPressure] = useState(-20);
  const [originalImage, setOriginalImage] = useState("/cyclone.jpg");
  const [processedImage, setProcessedImage] = useState("/cyclone.jpg");
  const [category, setCategory] = useState(10);
  const [tNumber, setTNumber] = useState("1.0 - 3.5");
  const [data, setData] = useState();
  const [imagePreview, setImagePreview] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function createData(t_number, categories) {
    return { t_number, categories };
  }

  const rows = [
    createData("1.0 - 3.5", "Category 0"),
    createData("4.0 - 4.5", "Category 1"),
    createData("5.0", "Category 2"),
    createData("5.5", "Category 3"),
    createData("6.0 - 6.5", "Category 4"),
    createData("7.0 - 8.0", "Category 5"),
  ];

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
            <div className="flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6">
              DVORAK SCALE
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg w-80 mr-6">
              <Table sx={{ color: "white" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      T-Number
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Category
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.t_number}
                      sx={
                        row.categories === "Category " + category.toString()
                          ? {
                              "&:last-child td, &:last-child th": { border: 0 },
                              color: "black",
                              backgroundColor: "white",
                            }
                          : {
                              "&:last-child td, &:last-child th": { border: 0 },
                              color: "white",
                            }
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "grey" }}
                      >
                        {row.t_number}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "grey" }}>
                        {row.categories}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col h-full mt-6 rounded-lg w-80 mr-6 text-center overflow-scroll">
              <div className="p-2 w-full rounded-lg mb-6 bg-white bg-opacity-20">
                ABOUT CATEGORY
              </div>
              <div className="flex flex-col h-full w-full p-4 rounded-lg overflow-hidden bg-white bg-opacity-15">
                {category == "10" ? (
                  <div
                    className="h-full w-full text-center flex flex-col justify-center opacity-20 hover:opacity-30 transition ease-in-out delay-150"
                    onClick={() => {
                      toast.warn("Upload An Image First!", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }}
                  >
                    No Image Uploaded Yet!
                  </div>
                ) : (
                  <div className="w-full rounded-lg overflow-auto">
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                      className="mb-3 rounded-lg"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Cloud Top Height
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].cloudTop}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                      className="mb-3 rounded-lg border-0"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        Temperature Range
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].temperatureRange}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                      className="mb-3 rounded-lg"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                      >
                        Force Range
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].forceRange}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                      className="mb-3 rounded-lg"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                      >
                        Gradient Scale
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].gradientScale}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel5"}
                      onChange={handleChange("panel5")}
                      className="mb-3 rounded-lg"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                      >
                        Coverage Range
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].coverageRange}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel6"}
                      onChange={handleChange("panel6")}
                      className="mb-3 rounded-lg"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                      >
                        Influence Range
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].influenceRange}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel7"}
                      onChange={handleChange("panel7")}
                      className="rounded-lg"
                      sx={{
                        "&::before": {
                          height: 0,
                          color: "rgba(255,255,255,0)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                      >
                        Torque Range
                      </AccordionSummary>
                      <AccordionDetails>
                        {hurricaneCategories[category].torqueRange}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
                {/* <div className="w-full rounded-lg overflow-auto">
                  {category == "0"
                    ? "This category represents the initial stage of a tropical cyclone's development. At this stage, satellite imagery may show a poorly organized system with minimal cloud cover and weak circulation. While it may not pose an immediate threat, it serves as an early indication of potential cyclone formation, prompting meteorologists to closely monitor its development."
                    : ""}
                  {category == "1"
                    ? "In this stage, the cyclone begins to intensify as its structure becomes more organized. Cloud bands become more pronounced, and a central dense overcast (CDO) may develop, indicating stronger convection near the center. Although still relatively weak, the storm poses a growing risk to coastal areas as it continues to strengthen."
                    : ""}
                  {category == "2"
                    ? "At this stage, the cyclone undergoes further intensification. The central dense overcast becomes more symmetric, and spiral rainbands wrap tighter around the center. Deep convection intensifies near the core, fueling rapid pressure falls and strengthening winds. While not yet considered a major hurricane, the storm poses a significant threat to coastal regions."
                    : ""}
                  {category == "3"
                    ? "This stage marks a significant increase cyclone intensity. The central dense overcast becomes well-defined, with a clear eye possibly forming at the center. Spiral rainbands extend farther from the core, producing intense rainfall and gusty winds over a wide area. Storm surge becomes a major concern, particularly in low-lying coastal areas, as the cyclone approaches land."
                    : ""}
                  {category == "4"
                    ? "In this stage, the cyclone reaches its peak intensity. The central dense overcast becomes highly organized, with a distinct eye surrounded by a ring of deep convection. Spiral rainbands extend across a vast area, bringing torrential rainfall and destructive winds to coastal regions. Storm surge reaches its maximum height, inundating coastal communities."
                    : ""}
                  {category == "5"
                    ? "This category represents the weakening phase of a tropical cyclone as it moves over cooler waters or encounters unfavorable atmospheric conditions. Sustained winds gradually decrease, and the central dense overcast begins to deteriorate, with the eye becoming less defined. While the storm's intensity diminishes, it can still produce hazardous conditions."
                    : ""}
                  {category == "10" ? "No Images Uploaded Yet!" : ""}
                </div> */}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center rounded-lg h-full w-full">
            <UploadPictureBar
              original={originalImage}
              processed={processedImage}
              preview={imagePreview}
            />
            <CustomPredictionBar
              windIntensity={intensity}
              windPressure={pressure}
              windCategory={category}
            />
            <UploadBar
              setOriginalImage={setOriginalImage}
              setIntensity={setIntensity}
              setPressure={setPressure}
              setCategory={setCategory}
              setImagePreview={setImagePreview}
            />
            <MiniChatbot visible={visible} />
            <NoteTaker notesVisible={notesVisible} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Upload;
