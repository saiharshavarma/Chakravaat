"use client";

import { useRouter, usePathname } from "next/navigation";

import { useSession, signOut } from "next-auth/react";

import { useState } from "react";

import CycloneIcon from "@mui/icons-material/Cyclone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssistantIcon from "@mui/icons-material/Assistant";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import EditNoteIcon from "@mui/icons-material/EditNote";
// import SearchIcon from '@mui/icons-material/Search';

import { IconButton } from "@mui/material";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import InputAdornment from '@mui/material/InputAdornment';

import Image from "next/image";

import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from "@mui/material/SpeedDialAction";

// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpIcon from "@mui/icons-material/Help";

import SearchBar from "./SearchBar";
import BookmarksBar from "./BookmarksBar";

import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const NavBar = ({ setVisible, visible, setNotesVisible, notesVisible }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const key = usePathname();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSearch, setOpenSearch] = useState(false);
  const handleSearchOpen = () => setOpenSearch(true);
  const handleSearchClose = () => setOpenSearch(false);

  const [openBookmarks, setOpenBookmarks] = useState(false);
  const handleBookmarksOpen = () => setOpenBookmarks(true);
  const handleBookmarksClose = () => setOpenBookmarks(false);

  const helpHandler = () => {
    router.push("/help");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  };

  const searchStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    paddingLeft: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    outline: "none",
    height: 500,
    overflow: "scroll",
  };

  const bookmarksStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    paddingLeft: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    outline: "none",
    height: 500,
    overflow: "scroll",
  };

  const actions = [
    {
      icon: (
        <IconButton
          // className={visible?"opacity-100":"opacity-40 hover:opacity-100 transition ease-in-out delay-150"}
          onClick={handleSearchOpen}
        >
          <ContentPasteSearchIcon />
        </IconButton>
      ),
      name: "Search",
    },
    {
      icon: (
        <IconButton
          // className={visible?"m-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"}
          onClick={(event) => {
            event.stopPropagation();
            setVisible(!visible);
          }}
        >
          <ChatIcon />
        </IconButton>
      ),
      name: "Assistant",
    },
    {
      icon: (
        <IconButton
          // className={visible?"m-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"}
          onClick={handleBookmarksOpen}
        >
          <CollectionsBookmarkIcon />
        </IconButton>
      ),
      name: "Bookmarks",
    },
    {
      icon: (
        <IconButton
          // className={visible?"m-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"}
          onClick={helpHandler}
        >
          <HelpOutlineIcon />
        </IconButton>
      ),
      name: "Help",
    },
    {
      icon: (
        <IconButton
          // className={visible?"m-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"}
          onClick={(event) => {
            event.stopPropagation();
            setNotesVisible(!notesVisible);
          }}
        >
          <EditNoteIcon />
        </IconButton>
      ),
      name: "Notes",
    },
  ];

  return (
    <div className="rounded-lg mr-6 h-full w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-between">
        <Tooltip title="Home">
          <button className="m-4" onClick={() => router.push("/")}>
            <CycloneIcon style={{ color: "white", fontSize: 40 }} />
          </button>
        </Tooltip>
        <hr className="w-full opacity-20" />
        <Tooltip title="Real Time">
          <button
            className={
              key == "/admin"
                ? "flex justify-center items-center w-full mt-4 p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "mt-4 p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/admin")}
          >
            <AnalyticsIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
        <Tooltip title="Time Series">
          <button
            className={
              key == "/time-series"
                ? "flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/time-series")}
          >
            <AccessTimeIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
        <Tooltip title="Archives">
          <button
            className={
              key == "/archive"
                ? "flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/archive")}
          >
            <CalendarMonthIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
        <Tooltip title="Upload Image">
          <button
            className={
              key == "/upload"
                ? "flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/upload")}
          >
            <AddPhotoAlternateIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
        <Tooltip title="AI Chatbot">
          <button
            className={
              key == "/chatbot"
                ? "flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/chatbot")}
          >
            <AssistantIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
        <Tooltip title="Log Book">
          <button
            className={
              key == "/notebook"
                ? "flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white"
                : "p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"
            }
            onClick={() => router.push("/notebook")}
          >
            <LibraryBooksIcon style={{ color: "white", fontSize: 30 }} />
          </button>
        </Tooltip>
      </div>
      <div className="flex flex-col items-center justify-between">
        {/* <Tooltip title="Search">
                <button 
                    className={visible?"opacity-100":"opacity-40 hover:opacity-100 transition ease-in-out delay-150"} 
                    onClick={handleSearchOpen}
                >
                    <ContentPasteSearchIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
            </Tooltip> */}
        {/* <Tooltip title="Assistant">
                <button className={visible?"m-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"} onClick={() => setVisible(!visible)}>
                    <ChatIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
            </Tooltip> */}
        <div className="flex ml-2 mr-2 mb-2 justify-center w-full">
          <div className="relative h-10 w-10">
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              direction="right"
              sx={{
                position: "absolute",
                bottom: 0,
                // right: 0,
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
                <HelpIcon
                  sx={
                    {
                      // marginBottom: '1px',
                      // marginLeft: '1px's
                    }
                  }
                  openIcon={<HelpIcon />}
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
        </div>
        <button className="m-4" onClick={handleOpen}>
          {session ? (
            <Image
              src={session.user?.image}
              width={20}
              height={20}
              alt=""
              className="w-8 h-8 rounded-md mb-2 hover:border hover:border-white transition ease-in-out delay-150"
            />
          ) : (
            <AccountCircleIcon style={{ color: "white", fontSize: 40 }} />
          )}
        </button>
      </div>
      <Modal
        open={openBookmarks}
        onClose={handleBookmarksClose}
        aria-labelledby="unit-conversion-settings"
        aria-describedby="unit-conversion-for-predicted-categories"
      >
        <Box sx={bookmarksStyle}>
          <BookmarksBar />
        </Box>
      </Modal>
      <Modal
        open={openSearch}
        onClose={handleSearchClose}
        aria-labelledby="unit-conversion-settings"
        aria-describedby="unit-conversion-for-predicted-categories"
      >
        <Box sx={searchStyle}>
          <SearchBar />
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="unit-conversion-settings"
        aria-describedby="unit-conversion-for-predicted-categories"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ACCOUNT DETAILS
          </Typography>
          <Image
            src={session ? session.user?.image : ""}
            width={500}
            height={500}
            alt=""
            className="w-full h-full rounded-md mb-4 mt-4"
          />
          <div className="w-full bg-white bg-opacity-20 rounded-md mb-4 border border-white p-2">
            {session ? session.user.name : ""}
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-md mb-8 border border-white p-2 text-ellipsis overflow-hidden">
            {session ? session.user.email : ""}
          </div>
          <button
            className="w-full rounded-md mb-2 border border-white p-2 hover:bg-white text-white hover:text-black transition ease-in-out delay-150"
            onClick={() => {
              router.push("/");
              signOut();
            }}
          >
            SIGN OUT
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default NavBar;

{
  /* <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={[]}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField {...params} 
                            id="outlined-basic" 
                            label="" 
                            variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    /> */
}
