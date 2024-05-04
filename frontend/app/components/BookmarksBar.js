"use client";

import { useState, useEffect } from "react";

import CycloneIcon from "@mui/icons-material/Cyclone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChatIcon from "@mui/icons-material/Chat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InfoIcon from "@mui/icons-material/Info";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

function SelectIcon({ location }) {
  if (location === "/admin") {
    return <AnalyticsIcon />;
  } else if (location === "/time-series") {
    return <AccessTimeIcon />;
  } else if (location === "/archive") {
    return <CalendarMonthIcon />;
  } else if (location === "/chatbot") {
    return <ChatIcon />;
  } else if (location === "/notebook") {
    return <LibraryBooksIcon />;
  } else if (location === "/upload") {
    return <AddPhotoAlternateIcon />;
  } else if (location === "/help") {
    return <InfoIcon />;
  } else {
    return <CycloneIcon />;
  }
}

export default function BookmarksBar() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const deleteBookmarkHandler = (event, index) => {
    event.stopPropagation();
    function isEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    setBookmarks((prevBookmarks) => {
      const deletedBookmark = prevBookmarks[index];
      const updatedBookmarks = prevBookmarks.filter(
        (bookmark) => !isEqual(bookmark, deletedBookmark)
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const navigateHandler = (event, index) => {
    event.stopPropagation();
    window.open(`http://localhost:3000${bookmarks[index].location}`, "_blank");
  };

  const navigationHandler = (index) => {
    window.open(`http://localhost:3000${bookmarks[index].location}`, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {bookmarks?.length > 0 ? (
        <div className="w-full h-full flex flex-col justify-center">
          <div className="w-full px-6 pt-4 pb-6 text-center font-bold text-3xl">
            Bookmarks
          </div>
          <div className="h-full w-full overflow-scroll">
            {bookmarks?.map((bookmark, index) => (
              <button
                className="w-full rounded-lg bg-white bg-opacity-10 p-4 text-left mb-4 flex flex-row opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                onClick={() => navigationHandler(index)}
              >
                <div className="flex flex-col h-14 mr-4 items-center justify-center justify-items-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <SelectIcon location={bookmark.location} />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="font-bold mb-1">{bookmark.section}</div>
                  <div>{bookmark.description}</div>
                </div>
                <button
                  className="flex flex-col h-14 items-center justify-center justify-items-center mr-4 opacity-40 hover:opacity-100 transition ease-in-out delay-150"
                  onClick={(event) => deleteBookmarkHandler(event, index)}
                >
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <Tooltip title="Remove">
                      <CloseIcon />
                    </Tooltip>
                  </div>
                </button>
                <button
                  className="flex flex-col h-14 items-center justify-center justify-items-center opacity-40 hover:opacity-100 transition ease-in-out delay-150"
                  onClick={(event) => navigateHandler(event, index)}
                >
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <Tooltip title="Go to page">
                      <NavigateNextIcon />
                    </Tooltip>
                  </div>
                </button>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center">
          <div className="text-3xl font-bold opacity-50">
            No Recent Bookmarks
          </div>
        </div>
      )}
    </div>
  );
}
