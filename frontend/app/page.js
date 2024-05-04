"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Image from "next/image";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField from "@mui/material/TextField";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChatIcon from "@mui/icons-material/Chat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import TimeSeries from "./components/TimeSeries";
import ArchiveAccess from "./components/ArchiveAccess";
import AIAnalysis from "./components/AIAnalysis";
import CustomPrediction from "./components/CustomPrediction";
import RealTime from "./components/RealTime";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [text, setText] = useState("Hover To Explore!");
  const [current, setCurrent] = useState("real");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const images = [
    "/govt.png",
    "/ibtracs.png",
    "/ieee.png",
    "/isro.png",
    "/mdpi.png",
    "/mosdac.png",
    "/vit.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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
    formData.append("phone", phone);
    formData.append("message", message);
    console.log(formData.get("name"));

    try {
      const response = await fetch("/api/contact", {
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <div className="flex flex-col bg-[url('/background.svg')] bg-cover">
        <div className="bg-cover flex flex-col justify-center p-6 h-screen w-screen">
          <div className="text-white font-extrabold text-7xl ml-10">
            Cyclone
            <br />
            Intensity
            <br />
            Prediction
            <br />
          </div>
          <div>
            <button
              className="text-white border border-white rounded-md p-2 w-48 ml-10 mt-10 mr-6 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
              onClick={() => {
                if (session) {
                  router.push("/admin");
                } else {
                  toast.error("Please sign in for access", {
                    position: "bottom-right",
                    autoClose: 1250,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
              }}
            >
              REAL - TIME
            </button>
            <button
              className="text-white border border-white rounded-md p-2 w-48 mt-10 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
              onClick={() => {
                if (session) {
                  router.push("/time-series");
                } else {
                  toast.error("Please sign in for access", {
                    position: "bottom-right",
                    autoClose: 1250,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
              }}
            >
              TIME SERIES
            </button>
          </div>
          {session ? (
            <button
              className="rounded-md p-2 absolute top-5 right-10 flex border border-white hover:bg-white text-white hover:text-black transition ease-in-out delay-150"
              onClick={() => signOut()}
            >
              <Image
                src={session.user?.image}
                width={20}
                height={20}
                alt=""
                className="w-6 h-6 rounded-md"
              />
              <div className="ml-4">{session.user?.name}</div>
            </button>
          ) : (
            <button
              className="text-white rounded-md p-2 absolute top-5 right-10 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
              onClick={handleOpen}
            >
              Sign In
            </button>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SIGN IN
              </Typography>
              <div className="w-full flex flex-col items-center justify-center">
                <button
                  className="text-white border border-white rounded-md p-2 w-72 mt-6 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                  onClick={() => signIn("github")}
                >
                  Sign In (GitHub)
                </button>
                <button
                  className="text-white border border-white rounded-md p-2 w-72 mt-6 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                  onClick={() => signIn("google")}
                >
                  Sign In (Google)
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="bg-cover flex flex-row justify-center h-[50vh] w-screen pt-[5vh] pb-[5vh] overflow-hidden">
          <div className="flex flex-col justify-center">
            <div className="text-3xl text-center mb-20">
              In Collaboration With
            </div>
            <div className="flex overflow-hidden gap-4 flex-row border-t border-b bg-white opacity-40 pt-6 pb-6">
              <div className="flex-shrink-0 flex justify-around min-w-full gap-4 animate-infinite-scroll">
                <img
                  src="/govt.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/ibtracs.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/ieee.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/isro.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/mdpi.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/mosdac.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/vit.png"
                  className=" p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
              </div>
              <div className="flex-shrink-0 flex justify-around min-w-full gap-4 animate-infinite-scroll">
                <img
                  src="/govt.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/ibtracs.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/ieee.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/isro.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/mdpi.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/mosdac.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
                <img
                  src="/vit.png"
                  className="p-2 rounded-lg h-[20vh] grayscale mr-6"
                  loading="lazy"
                />
              </div>
            </div>
            {/* <div className="flex">

            </div> */}
            {/* <div className="relative m-auto w-[500px] overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
              <div className="animate-infinite-slider flex w-[calc(250px*10)]">
                {images.map((image, index) => (
                  <div
                    className="slide flex w-[125px] items-center justify-center"
                    key={index}
                  >
                    <img
                      src={image}
                      className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale"
                      loading="lazy"
                    />
                  </div>
                ))}
                {images.map((image, index) => (
                  <div
                    className="slide flex w-[125px] items-center justify-center"
                    key={index}
                  >
                    <img
                      src={image}
                      className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div> */}
            {/* {[...images].map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale"
                    loading="lazy"
                  />
                </div>
              ))} */}
          </div>
        </div>
        <div className="bg-cover flex flex-row justify-center p-6 h-screen w-screen">
          <div className="flex flex-col justify-center w-1/2">
            <div className="font-bold text-5xl ml-11 mb-7">Chakravaat</div>
            <div className="text-white font-extrabold text-7xl ml-10 mb-7">
              A Step Ahead
              <br />
              Natural
              <br />
              Disasters
              <br />
            </div>
            <div className="ml-12 w-2/3">
              Our mission is to predict cyclone intensity with unparalleled
              accuracy. Using cutting-edge models and algorithms, we provide
              timely forecasts, empowering communities and organizations to
              prepare for and mitigate the impact of cyclones
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center h-full p-6">
            <div className="rounded-lg w-full mb-6 border border-white p-4">
              Disaster Preparedness: Chakravaat aids in evacuation planning,
              resource allocation, and precautionary measures for minimizing
              cyclone impact on communities.
            </div>
            <div className="rounded-lg w-full mb-6 border border-white p-4">
              Cyclonic Behavior Study: Chakravaat conducts thorough research on
              cyclone behavior, uncovering patterns and dynamics to improve
              predictive accuracy.
            </div>
            <div className="rounded-lg w-full mb-6 border border-white p-4">
              Immediate Response: Chakravaat enables swift emergency response by
              providing real-time updates on cyclone intensity and trajectory
              for prompt action.
            </div>
            <div className="rounded-lg w-full mb-6 border border-white p-4">
              Maritime Safety: Chakravaat provides real-time updates on cyclone
              trajectory, ensuring safe navigation and preventing maritime
              accidents.
            </div>
            <div className="rounded-lg w-full border border-white p-4">
              Infrastructure Protection: Chakravaat predicts cyclone intensity
              to safeguard critical infrastructure and minimize damage,
              disruptions, and service outages.
            </div>
          </div>
        </div>
        <div className="bg-cover flex flex-row justify-center h-screen w-screen">
          <div className="flex flex-col w-1/2 h-full justify-center">
            <div className="w-full rounded-lg">
              <div className="font-bold text-2xl ml-11 mb-2 opacity-50">
                Research
              </div>
              <div className="flex flex-col font-bold text-4xl ml-11 mb-2">
                Explore the Possibilities
              </div>
              <div className="ml-11 mb-2 opacity-50 ml-11 mb-7">
                Discover insights, prepare, and mitigate with Chakravaat.
              </div>
              <div className="flex flex-col h-full px-6 ml-5">
                <button
                  className={
                    current == "real"
                      ? "flex flex-row rounded-lg w-full mb-6 p-4 text-left bg-white bg-opacity-40"
                      : "flex flex-row rounded-lg w-full mb-6 p-4 text-left hover:bg-white hover:bg-opacity-20 transition ease-in-out delay-150"
                  }
                  onClick={() => setCurrent("real")}
                >
                  <div className="h-full flex flex-col justify-center">
                    <AccessTimeIcon
                      sx={{
                        fontSize: 40,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="font-bold text-2xl mb-2">
                      Real Time Prediction
                    </div>
                    <div className="opacity-50">
                      Instant updates on cyclone intensity and weather
                      conditions in real-time.
                    </div>
                  </div>
                </button>
                <button
                  className={
                    current == "time"
                      ? "flex flex-row rounded-lg w-full mb-6 p-4 text-left bg-white bg-opacity-40"
                      : "flex flex-row rounded-lg w-full mb-6 p-4 text-left hover:bg-white hover:bg-opacity-20 transition ease-in-out delay-150"
                  }
                  onClick={() => setCurrent("time")}
                >
                  <div className="h-full flex flex-col justify-center">
                    <CalendarMonthIcon
                      sx={{
                        fontSize: 40,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="font-bold text-2xl mb-2">
                      Time Series Prediction
                    </div>
                    <div className="opacity-50">
                      Forecasting future cyclone intensity and category trends
                      with precision accuracy.
                    </div>
                  </div>
                </button>
                <button
                  className={
                    current == "arch"
                      ? "flex flex-row rounded-lg w-full mb-6 p-4 text-left bg-white bg-opacity-40"
                      : "flex flex-row rounded-lg w-full mb-6 p-4 text-left hover:bg-white hover:bg-opacity-20 transition ease-in-out delay-150"
                  }
                  onClick={() => setCurrent("arch")}
                >
                  <div className="h-full flex flex-col justify-center">
                    <ChatIcon
                      sx={{
                        fontSize: 40,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="font-bold text-2xl mb-2">
                      Archive Access
                    </div>
                    <div className="opacity-50">
                      Retrieve past cyclone data, including intensity, pressure,
                      and category.
                    </div>
                  </div>
                </button>
                <button
                  className={
                    current == "chat"
                      ? "flex flex-row rounded-lg w-full mb-6 p-4 text-left bg-white bg-opacity-40"
                      : "flex flex-row rounded-lg w-full mb-6 p-4 text-left hover:bg-white hover:bg-opacity-20 transition ease-in-out delay-150"
                  }
                  onClick={() => setCurrent("chat")}
                >
                  <div className="h-full flex flex-col justify-center">
                    <AnalyticsIcon
                      sx={{
                        fontSize: 40,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="font-bold text-2xl mb-2">AI Analysis</div>
                    <div className="opacity-50">
                      Engage AI assistant for insightful inquiries and intensity
                      analysis queries.
                    </div>
                  </div>
                </button>
                <button
                  className={
                    current == "cust"
                      ? "flex flex-row rounded-lg w-full p-4 text-left bg-white bg-opacity-40"
                      : "flex flex-row rounded-lg w-full p-4 text-left hover:bg-white hover:bg-opacity-20 transition ease-in-out delay-150"
                  }
                  onClick={() => setCurrent("cust")}
                >
                  <div className="h-full flex flex-col justify-center">
                    <AddPhotoAlternateIcon
                      sx={{
                        fontSize: 40,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="font-bold text-2xl mb-2">
                      Custom Prediction
                    </div>
                    <div className="opacity-50">
                      Experience personalized cyclone intensity predictions
                      using your uploaded image.
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center h-full p-6 mr-6">
            <div className="w-full h-20 mb-4 rounded-lg flex flex-col justify-center text-center font-bold text-4xl">
              {current == "real" ? "Real Time Prediction" : ""}
              {current == "time" ? "Time Series Prediction" : ""}
              {current == "arch" ? "Archive Access" : ""}
              {current == "chat" ? "Artificial Intelligence Analysis" : ""}
              {current == "cust" ? "Custom Prediction" : ""}
            </div>
            <div className="w-full h-[24rem] bg-white bg-opacity-20 rounded-lg">
              {current == "real" ? <RealTime setText={setText} /> : ""}
              {current == "time" ? <TimeSeries setText={setText} /> : ""}
              {current == "arch" ? <ArchiveAccess setText={setText} /> : ""}
              {current == "chat" ? <AIAnalysis setText={setText} /> : ""}
              {current == "cust" ? <CustomPrediction setText={setText} /> : ""}
            </div>
            <div className="w-full h-20 mt-7 bg-white bg-opacity-20 rounded-lg flex flex-col justify-center text-center p-4">
              {text}
            </div>
          </div>
        </div>
        <div className="bg-cover flex flex-col justify-center p-6 h-screen w-screen">
          <div className="w-full text-center text-7xl font-extrabold">FAQS</div>
          <div className="w-full px-40 py-20">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                What is the significance of accurate intensity prediction for
                tropical cyclones?
              </AccordionSummary>
              <AccordionDetails>
                Accurate intensity prediction for tropical cyclones is crucial
                for effective disaster management due to their devastating
                nature.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                How does Dvorak's estimation method fall short in predicting
                cyclone intensity?
              </AccordionSummary>
              <AccordionDetails>
                Dvorak's estimation method often overlooks physical attributes
                and temporal dynamics, limiting predictive capabilities.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                What is the novel approach introduced in this study for cyclone
                intensity prediction?
              </AccordionSummary>
              <AccordionDetails>
                The study introduces a novel approach leveraging a Hierarchical
                Attention-based Multihead Shift Invariant Artificial Neural
                Network (SIANN).
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                How does the proposed SIANN model address the limitations of
                existing methodologies?
              </AccordionSummary>
              <AccordionDetails>
                The SIANN model addresses limitations by discerning cyclone
                intensity-contributing factors and capturing temporal nuances.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                What role does preprocessing play in enhancing the predictive
                capabilities of the SIANN model?
              </AccordionSummary>
              <AccordionDetails>
                Preprocessing techniques enhance predictive capabilities by
                preparing data for analysis and reducing noise.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                How does coordinate-based adaptive cropping contribute to
                cyclonic pattern extraction?
              </AccordionSummary>
              <AccordionDetails>
                Coordinate-based adaptive cropping focuses on Regions of
                Interest (ROI) for precise cyclonic pattern extraction,
                improving pattern recognition.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                What environmental variables are considered in the time series
                analysis for intensity estimation?
              </AccordionSummary>
              <AccordionDetails>
                Environmental variables such as sea surface temperatures,
                atmospheric pressure, and wind patterns are analyzed in the time
                series models.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
              className="bg-white bg-opacity-20"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                How does the proposed methodology amalgamate advanced neural
                network architectures with time series analysis?
              </AccordionSummary>
              <AccordionDetails>
                The methodology combines advanced neural network architectures
                with time series analysis to establish a robust technique for
                intensity estimation.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="bg-cover flex flex-row justify-center h-screen w-screen">
          <div className="flex flex-col w-1/2 p-10 justify-center">
            <div className="text-white font-extrabold text-7xl ml-10">
              Contact Us
            </div>
            <div className="text-white text-2xl ml-12 mt-5">
              Get in touch us with any comments you have!
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center p-6 mr-16">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="filled"
              className="rounded-lg mb-6"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Subject"
              variant="filled"
              className="rounded-lg mb-6"
              type="text"
              onChange={(event) => setSubject(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Email Address"
              variant="filled"
              className="rounded-lg mb-6"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Phone Number"
              variant="filled"
              className="rounded-lg mb-6"
              type="tel"
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              id="filled-multiline-static"
              label="Message"
              multiline
              rows={7}
              variant="filled"
              className="rounded-lg mb-6"
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              className="w-full rounded p-2 bg-white bg-opacity-15 opacity-75 hover:opacity-100 transition ease-in-out delay-150"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

{
  /* <div className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale block flex-none mr-6">
                  <img src="/govt.png" className="h-full w-content flex-none" />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale block flex-none mr-6">
                  <img
                    src="/ibtracs.png"
                    className="h-full w-content flex-none"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] bg-opacity-20 grayscale block flex-none mr-6">
                  <img src="/ieee.png" className="h-full w-content flex-none" />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] bg-opacity-20 grayscale block flex-none mr-6">
                  <img src="/isro.png" className="h-full w-content flex-none" />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale block flex-none mr-6">
                  <img src="/mdpi.png" className="h-full w-content flex-none" />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale block flex-none mr-6">
                  <img
                    src="/mosdac.png"
                    className="h-full w-content flex-none"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg h-[20vh] bg-opacity-20 grayscale block flex-none">
                  <img src="/vit.png" className="h-full w-content flex-none" />
                </div> */
}

{
  /* <div className="flex space-x-16">
              <img
                src="/govt.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/ibtracs.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/ieee.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/isro.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/mdpi.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/mosdac.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
              <img
                src="/vit.png"
                className="bg-white p-2 rounded-lg h-[20vh] opacity-20 grayscale max-w-none"
                loading="lazy"
              />
            </div> */
}
