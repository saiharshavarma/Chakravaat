"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const NoteTaker = ({ notesVisible }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const [data, setData] = useState({});
  const [logId, setLogId] = useState(0);

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const noteSubmitHandler = () => {
    const submitTime = new Date();
    const newNote = {
      note: note,
      dateTime: submitTime.toISOString(),
    };
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
    setNote("");
  };
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    const storedLogId = localStorage.getItem("id");
    if (storedLogId) {
      setLogId(JSON.parse(storedLogId));
    }
  }, []);

  const handleNoteTransfer = (index) => {
    const newData = {
      ...data,
      [`Note At ${notes[index].dateTime}${logId}`]: `${notes[index].note}`,
    };
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    toast.success("Note Copied To Logs!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setLogId((prevLogId) => {
      const newLogId = prevLogId + 1;
      localStorage.setItem("id", newLogId);
      return newLogId;
    });
  };

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
  };
  const onKeyDown = (event) => {
    if (event.key == "Enter") {
      const submitTime = new Date();
      const newNote = {
        note: note,
        dateTime: submitTime.toISOString(),
      };
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes, newNote];
        localStorage.setItem("notes", JSON.stringify(newNotes));
        return newNotes;
      });
      setNote("");
    }
  };
  return (
    <AnimatePresence>
      {notesVisible ? (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="rounded-lg absolute z-[1500] right-0 bottom-0 bg-white overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="h-[32rem] w-[26rem] rounded-lg bg-white flex flex-col p-2">
            <div className="w-full p-2 rounded-lg bg-black bg-opacity-70 text-center mb-2">
              NOTES
            </div>
            <div className="w-full h-full rounded-lg bg-black bg-opacity-40 mb-2 p-2 overflow-scroll">
              {notes?.map((note, index) => (
                <div className="flex flex-row rounded-lg border border-white p-2 border-opacity-20 mb-2">
                  <div className="flex flex-row w-full">
                    <div className="w-full bg-white bg-opacity-15 text-center p-2 rounded break-words mr-2">
                      {note.note}
                    </div>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150 mr-2"
                      onClick={() => handleNoteTransfer(index)}
                    >
                      <ExitToAppIcon />
                    </button>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                      onClick={() => handleDeleteNote(index)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full rounded-lg p-2 bg-black bg-opacity-70 flex">
              <input
                type="text"
                className="border border-white p-2 border-opacity-40 bg-transparent outline-none focus:outline-none w-full mr-2"
                placeholder="Add A Note"
                onChange={(event) => setNote(event.target.value)}
                value={note}
                onKeyDown={(event) => {
                  onKeyDown(event);
                }}
              />
              <button
                className="border border-white rounded p-2 hover:bg-white hover:text-black transition ease-in-out delay-150"
                onClick={noteSubmitHandler}
              >
                <SendIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default NoteTaker;
