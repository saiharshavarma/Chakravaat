"use client";

import { useEffect, useState, useRef } from "react";

import NavBar from "../components/NavBar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import ChatBotMessage from "../components/ChatBotMessage";
import UserMessage from "../components/UserMessage";
import MiniChatbot from "../components/MiniChatbot";
import NoteTaker from "../components/NoteTaker";

import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import jsPDF from "jspdf";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! Feel free to ask me any question you have for analysis of cyclones!",
      role: "chatbot",
    },
  ]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const router = useRouter();

  const { data: session } = useSession();

  const sendHandler = () => {
    setMessages((oldMessages) => {
      const newMessage = { message: message, role: "user" };
      const newMessages = [...oldMessages, newMessage];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return newMessages;
    });
    setMessage("");
    setDisabled(true);
    // chatting()
    fetchDataStream();
  };

  async function fetchDataStream() {
    const url = "http://localhost:11434/api/generate"; // Replace this with the actual URL of the data stream

    const requestBody = {
      model: "mistral",
      prompt: `[INST] Do not include any non ASCII characters in your response. ${message} [/INST]`,
      raw: true,
      stream: true,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const processDataChunk = async (reader) => {
        const decoder = new TextDecoder();

        setMessages((oldMessages) => [...oldMessages, ""]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const resp = decoder.decode(value, { stream: true });
          console.log(resp);
          try {
            setMessages((oldMessages) => {
              const newMessages = [...oldMessages];
              newMessages[newMessages.length - 1] = {
                message:
                  (newMessages[newMessages.length - 1].message
                    ? newMessages[newMessages.length - 1].message
                    : "") + JSON.parse(resp).response,
                role: "chatbot",
              };
              localStorage.setItem("messages", JSON.stringify(newMessages));
              return newMessages;
            });
          } catch (error) {
            console.log(error);
            break;
          }
        }
      };

      const reader = response.body.getReader();

      processDataChunk(reader);
      setDisabled(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((oldMessages) => {
        const newMessages = [
          ...oldMessages,
          {
            message: "I'm so sorry there's been some error in the back!",
            role: "chatbot",
          },
        ];
        localStorage.setItem("messages", JSON.stringify(newMessages));
        return newMessages;
      });
      setDisabled(false);
    }
  }

  const chatting = async () => {
    fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `[INST] ${message} [/INST]`,
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
        setMessages((oldMessages) => [...oldMessages, data.response]);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setMessages((oldMessages) => [
          ...oldMessages,
          "I'm so sorry there's been some error in the back!",
        ]);
        setDisabled(false);
      });
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages?.length > 0) {
      setMessages(() => {
        const parsedMessages = JSON.parse(storedMessages);
        parsedMessages.shift();
        if (parsedMessages) return [...messages, ...parsedMessages];
        return [...messages];
      });
    }
  }, []);
  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      localStorage.setItem("questions", JSON.stringify(newQuestions));
      return newQuestions;
    });
  };

  const handleQuestionTransfer = (index) => {
    setMessage((prevMessage) => {
      return `${prevMessage} ${questions[index]}`;
    });
  };

  const reverseArray = () => {
    const tempMessages = [...messages];
    tempMessages.reverse();
    return tempMessages;
  };
  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  const clearChats = () => {
    setMessages((prevMessageS) => {
      const clearedMessages = [prevMessageS[0]];
      localStorage.setItem("messages", JSON.stringify(clearedMessages));
      return clearedMessages;
    });
  };

  const saveChatPDF = () => {
    const formattedMessages = messages.map((message, index) => {
      if (index % 2 === 0) {
        return `Chakravaat:\n${message}\n\n`;
      } else {
        return `User:\n${message}\n\n`;
      }
    });

    const result = formattedMessages.join("");
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("chakravaat_analysis_chats.pdf");
  };

  const printCurrentView = () => {
    window.print();
  };

  const copyAllChatsHandler = () => {
    const formattedMessages = messages.map((message, index) => {
      if (index % 2 === 0) {
        return `Chakravaat:\n${message}\n\n`;
      } else {
        return `User:\n${message}\n\n`;
      }
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

  const actions = [
    {
      icon: (
        <ContentCopyIcon onClick={copyAllChatsHandler} sx={{ fontSize: 20 }} />
      ),
      name: "Copy All Chats",
    },
    {
      icon: <DownloadIcon onClick={saveChatPDF} sx={{ fontSize: 20 }} />,
      name: "Download Chat PDF",
    },
    {
      icon: <PrintIcon onClick={printCurrentView} sx={{ fontSize: 20 }} />,
      name: "Print Current Page",
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
  const onKeyDown = (event) => {
    if (event.key == "Enter") {
      setMessages((oldMessages) => {
        const newMessage = { message: message, role: "user" };
        const newMessages = [...oldMessages, newMessage];
        localStorage.setItem("messages", JSON.stringify(newMessages));
        return newMessages;
      });
      setMessage("");
      setDisabled(true);
      // chatting()
      fetchDataStream();
    }
  };

  if (session) {
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
          <div className="flex items-center rounded-lg h-full">
            <div className="flex flex-col h-full">
              <div className="h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-96 mb-4 mr-6">
                NOTED QUESTIONS
              </div>
              <div className="bg-white h-full bg-opacity-10 rounded-lg w-96 mr-6 overflow-scroll p-4 text-center">
                {questions?.length === 0 ? (
                  <div className="opacity-30 w-full border border-white rounded-lg p-2">
                    There are no noted questions yet!
                  </div>
                ) : (
                  ""
                )}
                {questions.map((question, index) => (
                  <div className="flex flex-row rounded-lg border border-white p-2 border-opacity-20 mb-2">
                    <div className="flex flex-row">
                      <div className="w-full bg-white bg-opacity-20 text-white rounded-md text-center p-2 mr-2">
                        {question}
                      </div>
                      <button
                        className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150 mr-2"
                        onClick={() => handleQuestionTransfer(index)}
                      >
                        <ExitToAppIcon />
                      </button>
                      <button
                        className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center rounded-lg h-full w-full">
            <div className="relative flex flex-col h-full w-full bg-white bg-opacity-10 rounded-lg w-80 p-4">
              <div className="relative h-full bg-black rounded-lg mb-4 pt-4 pb-2 flex flex-col overflow-scroll">
                <div
                  className="h-full flex flex-col-reverse overflow-scroll pt-2"
                  ref={divRef}
                >
                  {reverseArray()?.map((message) => {
                    if (message.role === "chatbot") {
                      return <ChatBotMessage message={message.message} />;
                    } else {
                      return (
                        <UserMessage
                          message={message.message}
                          src={session ? session?.user?.image : "/cyclone.jpg"}
                        />
                      );
                    }
                  })}
                </div>
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    "& .MuiButtonBase-root:hover": {
                      background: "white",
                      border: 2,
                      color: "black",
                      borderColor: "white",
                    },
                    "& .MuiButtonBase-root": {
                      background: "#808080",
                      border: 2,
                      color: "white",
                      borderColor: "white",
                    },
                  }}
                  icon={
                    <SpeedDialIcon
                      sx={{
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
              </div>
              <div className="flex rounded-md p-2 pl-4 border-neutral-500 border text-white">
                <input
                  type="text"
                  className="w-full bg-transparent focus:outline-none"
                  placeholder={
                    disabled
                      ? "Chakravaat is responding ..."
                      : "Message Chakravaat ....."
                  }
                  value={message}
                  disabled={disabled}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    onKeyDown(event);
                  }}
                />
                <IconButton
                  className="h-full w-fit border border-white text-white border-box rounded-md p-1.5 ml-4 hover:text-black hover:border hover:border-white transition ease-in-out delay-150"
                  disabled={message == "" ? true : false}
                  onClick={sendHandler}
                >
                  <SendIcon />
                </IconButton>
              </div>
              <MiniChatbot visible={visible} />
              <NoteTaker notesVisible={notesVisible} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <div className="w-screen h-screen bg-black">
        {/* {useEffect(() => {
        router.push('/');
      })} */}
      </div>
    );
  }
};

export default Chatbot;
// useEffect( async() => {
//   const response = await fetch("http://localhost:3001", {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     body: JSON.stringify("What is the intensity of a cyclone?"), // body data type must match "Content-Type" header
//   });
//   setData(response.json()); // parses JSON response into native JavaScript objects

// }, [])
