"use client";
import { useState, useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";

import HelperComment from "./HelperComment";

import HelperMessageLoader from "./HelperMessageLoader";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
// help
//   place
//   previous
//   process
//     step
//     response

import jsPDF from "jspdf";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HelperDrawerContent() {
  const [place, setPlace] = useState("");
  const [previous, setPrevious] = useState("");
  const [process, setProcess] = useState(false);
  const [processObjs, setProcessObjs] = useState(false);
  const [messages, setMessages] = useState([]);
  const [help, setHelp] = useState({});

  const [finalPlace, setFinalPlace] = useState("coastal");
  const [finalPrevious, setFinalPrevious] = useState(
    "No steps to handle disaster taken so far"
  );

  const messagesEndRef = useRef(null);

  const chatting = async (prompt) => {
    setProcess(true);
    fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `[INST] ${prompt} [/INST]`,
        raw: true,
        stream: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProcess(false);
        setMessages((oldMessages) => {
          const newMessages = [
            ...oldMessages,
            { step: data.response, response: false },
          ];
          setHelp((prevHelp) => {
            prevHelp["process"] = newMessages;
            localStorage.setItem("help", JSON.stringify(prevHelp));
            return prevHelp;
          });
          return newMessages;
        });
        // setMessages((oldMessages) => [...oldMessages, data.response]);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        // setMessages((oldMessages) => [
        //   ...oldMessages,
        //   {step:"I'm so sorry there's been some error in the back!", response:false},
        // ]);
        setMessages((oldMessages) => {
          const newMessages = [
            ...oldMessages,
            {
              step: "I'm so sorry there's been some error in the back!",
              response: false,
            },
          ];
          setHelp((prevHelp) => {
            prevHelp["process"] = newMessages;
            localStorage.setItem("help", JSON.stringify(prevHelp));
            return prevHelp;
          });
          return newMessages;
        });
      });
  };

  function initialHandler() {
    if (place !== "") {
      setFinalPlace(place);
    }
    if (previous !== "") {
      setFinalPrevious(previous);
    }
    const inputPlace = place === "" ? finalPlace : place;
    const inputPrevious = previous === "" ? finalPrevious : previous;
    setHelp((prevHelp) => {
      const newHelp = {
        ...prevHelp,
        place: inputPlace,
        previous: inputPrevious,
      };
      localStorage.setItem("help", JSON.stringify(newHelp));
      return newHelp;
    });
    setProcessObjs(true);
    const prompt = `There is a cyclone at the Indian Ocean nearing a ${inputPlace}. The previous steps taken so far to handle this natural disaster are: ${inputPrevious}. Can you please give 1 short line about the next step to be taken? Please ensure that you give a step that is not done previously.`;
    chatting(prompt);
  }

  function iterationHandler(processObj) {
    // setProcessObjs((prevProcessObjs) => {
    //   //   console.log([...prevProcessObjs, processObj]);
    //   return [...prevProcessObjs, processObj];
    // });
    let prompt;

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[newMessages.length - 1] = processObj;
      setHelp((prevHelp) => {
        prevHelp["process"] = newMessages;
        localStorage.setItem("help", JSON.stringify(prevHelp));
        return prevHelp;
      });
      // console.log(prompt);
      return newMessages;
    });

    const combinedSteps = messages.map((obj) => obj.step).join(" ");
    const finalSteps = previous + combinedSteps;
    if (processObj.response === "Yes") {
      prompt = `There is a cyclone at the Indian Ocean nearing a ${place}. The previous steps taken so far to handle this natural disaster are: ${finalSteps}. Can you please give 1 short line about the next step to be taken? Please ensure that you give a step that is not done previously.`;
    } else {
      prompt = `There is a cyclone at the Indian Ocean nearing a ${place}. The previous steps taken so far to handle this natural disaster are: ${finalSteps}. The issue with the last step was ${processObj.response} Can you please give 1 short line about the next step to be taken? Please ensure that you give a step that is not done previously.`;
    }

    chatting(prompt);

    // let prompt;
    // const combinedSteps = processObjs.map((obj) => obj.step).join(" ");
    // // const combinedSteps = messages.map((obj) => obj.step).join(" ");
    // const finalSteps = previous + combinedSteps;
    // if (processObj.response === "Yes") {
    //   prompt = `There is a cyclone at the Indian Ocean nearing a ${place}. The previous steps taken so far to handle this natural disaster are: ${finalSteps}. Can you please give 1 short line about the next step to be taken? Please ensure that you give a step that is not done previously.`;
    // } else {
    //   prompt = `There is a cyclone at the Indian Ocean nearing a ${place}. The previous steps taken so far to handle this natural disaster are: ${finalSteps}. The issue with the last step was ${processObj.response} Can you please give 1 short line about the next step to be taken? Please ensure that you give a step that is not done previously.`;
    // }
    // // console.log(prompt);
    // chatting(prompt);
  }

  useEffect(() => {
    const storedHelp = localStorage.getItem("help");
    if (storedHelp) {
      setHelp(JSON.parse(storedHelp));
      const tempHelp = JSON.parse(storedHelp);
      if (tempHelp.place && tempHelp.previous) {
        setProcessObjs(true);
        setFinalPlace(tempHelp.place);
        setFinalPrevious(tempHelp.previous);
      }
      if (tempHelp.process) {
        setMessages(tempHelp.process);
      }
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const printCurrentView = () => {
    window.print();
  };

  const copyAllChatsHandler = () => {
    const formattedMessages = messages.map((message) => {
      return `Chakravaat:\n${message.step}\nCompletion Status:\n${message.response}\n\n`;
    });

    const result = formattedMessages.join("");
    navigator.clipboard
      .writeText(result)
      .then(() => {
        toast.success("Chats copied to clipboard!", {
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

  const clearChats = () => {
    setMessages([]);
    setProcessObjs(false);
    setPlace("");
    setPrevious("");
    setFinalPlace("coastal");
    setFinalPrevious("No steps to handle disaster taken so far");
    localStorage.setItem("help", JSON.stringify({}));
  };

  const saveChatPDF = () => {
    const formattedMessages = messages.map((message, index) => {
      return `Chakravaat:\n${message.step}\nCompletion Status:\n${message.response}\n\n`;
    });

    const result = formattedMessages.join("");
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("chakravaat_management_chats.pdf");
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  const actions = [
    {
      icon: <PrintIcon onClick={printCurrentView} sx={{ fontSize: 20 }} />,
      name: "Print Current Page",
    },
    {
      icon: <DownloadIcon onClick={saveChatPDF} sx={{ fontSize: 20 }} />,
      name: "Download Chat PDF",
    },
    {
      icon: (
        <ContentCopyIcon onClick={copyAllChatsHandler} sx={{ fontSize: 20 }} />
      ),
      name: "Copy All Chats",
    },
    {
      icon: <ClearIcon onClick={clearChats} sx={{ fontSize: 20 }} />,
      name: "Clear The Chat",
    },
    {
      icon: (
        <ArrowCircleDownIcon onClick={scrollToBottom} sx={{ fontSize: 20 }} />
      ),
      name: "Scroll To Bottom",
    },
  ];

  return (
    <div
      className="w-full h-full bg-black overflow-scroll rounded-lg p-4 flex flex-col"
      ref={messagesEndRef}
    >
      <div className="w-full rounded-lg bg-white bg-opacity-10 flex flex-col p-4">
        <TextField
          id="filled-basic"
          placeholder="Area Type Of Cyclone Occurrence"
          variant="filled"
          sx={{ marginBottom: "1rem" }}
          className={processObjs ? "opacity-50" : ""}
          value={processObjs ? finalPlace : place}
          onChange={(event) => {
            if (event.target.value !== "") {
              setPlace(event.target.value);
            }
          }}
          disabled={processObjs}
          // value={help.place ? help.place : ""}
        />
        <TextField
          id="filled-basic"
          placeholder="Previous Steps Taken So Far"
          variant="filled"
          sx={{ marginBottom: "1rem" }}
          className={processObjs ? "opacity-50" : ""}
          value={processObjs ? finalPrevious : previous}
          onChange={(event) => {
            if (event.target.value !== "") {
              setPrevious(event.target.value);
            }
          }}
          disabled={processObjs}
          // value={help.previous ? help.previous : ""}
        />
        <button
          className={
            processObjs
              ? "w-full p-2 rounded-lg bg-white bg-opacity-10 opacity-50"
              : "w-full p-2 rounded-lg bg-white bg-opacity-10 hover:text-black hover:bg-white transition ease-in-out delay-150"
          }
          onClick={initialHandler}
          disabled={processObjs}
        >
          SUBMIT
        </button>
      </div>

      {/* {console.log(reverseArray())} */}
      {/* <div className="flex flex-col-reverse"> */}
      {messages?.map((message) => (
        <>
          <HelperComment message={message} setProcessObj={iterationHandler} />
        </>
      ))}
      {process ? <HelperMessageLoader /> : ""}
      {/* </div> */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
          "& .MuiButtonBase-root:hover": {
            background: "white",
            color: "black",
            border: 2,
          },
          "& .MuiButtonBase-root": {
            background: "black",
            border: 2,
            color: "rgba(255,255,255,0.5)",
          },
        }}
        icon={<SpeedDialIcon sx={{ marginBottom: "3px" }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
