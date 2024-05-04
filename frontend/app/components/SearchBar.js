"use client";

import { useState, useEffect } from "react";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { InfiniteHits } from "./InfiniteHits";
import { useConnector } from "react-instantsearch";
import connectStats from "instantsearch.js/es/connectors/stats/connectStats";

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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { Tooltip } from "@mui/material";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_APPLICATION_API_KEY,
  process.env.NEXT_PUBLIC_SEARCH_ONLY_API_KEY
);

export function useStats(props) {
  return useConnector(connectStats, props);
}

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: "",
          params: "",
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

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

function Hit({ hit }) {
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  const [recentSearches, setRecentSearches] = useState([]);
  const navigationHandler = () => {
    window.open(`http://localhost:3000${hit.Location}`, "_blank");
  };
  useEffect(() => {
    const storedSearches = localStorage.getItem("recent");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const clickHandler = () => {
    setRecentSearches((prevRecentSearches) => {
      const newSearch = {
        section: hit.Section,
        description: hit.Description,
        location: hit.Location,
      };
      let updatedSearches = prevRecentSearches.filter(
        (search) => !isEqual(search, newSearch)
      );
      const newSearches = [newSearch, ...updatedSearches];
      if (newSearches.length > 5) {
        newSearches.pop();
      }
      localStorage.setItem("recent", JSON.stringify(newSearches));
      return newSearches;
    });
    navigationHandler();
  };

  return (
    <button
      className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4 text-left mb-4 flex flex-row opacity-50 hover:opacity-100 transition ease-in-out delay-150"
      onClick={clickHandler}
    >
      <div className="flex flex-col h-14 mr-4 items-center justify-center justify-items-center">
        <div className="bg-white bg-opacity-20 rounded-lg p-2">
          <SelectIcon location={hit.Location} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="font-bold mb-1">{hit.Section}</div>
        <div>{hit.Description}</div>
      </div>
      <div className="flex flex-col h-14 items-center justify-center justify-items-center">
        <NavigateNextIcon />
      </div>
    </button>
  );
}

function DefaultHits(props) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recent");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const clickHandler = (index) => {
    const url = recentSearches[index].location;
    setRecentSearches((prevRecentSearches) => {
      const newSearch = {
        section: recentSearches[index].section,
        location: recentSearches[index].location,
      };
      prevRecentSearches.splice(index, 1);
      const newSearches = [newSearch, ...prevRecentSearches];
      if (newSearches.length > 5) {
        newSearches.pop();
      }
      localStorage.setItem("recent", JSON.stringify(newSearches));
      return newSearches;
    });
    window.open(`http://localhost:3000${url}`, "_blank");
  };

  const deleteHandler = (event, index) => {
    event.stopPropagation();
    setRecentSearches((prevRecentSearches) => {
      prevRecentSearches.splice(index, 1);
      const deletedSearches = [...prevRecentSearches];
      localStorage.setItem("recent", JSON.stringify(deletedSearches));
      return deletedSearches;
    });
  };

  const bookmarkHandler = (event, index) => {
    event.stopPropagation();
    setBookmarks((prevBookmarks) => {
      const newBookmark = recentSearches[index];
      const newBookmarks = [newBookmark, ...prevBookmarks];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const deleteBookmarkHandler = (event, index) => {
    event.stopPropagation();
    function isEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.filter(
        (bookmark) => !isEqual(bookmark, recentSearches[index])
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-2xl font-bold w-full px-6 pb-8 pt-4 opacity-50">
        {recentSearches?.length > 0 ? "Recent Searches" : ""}
      </div>
      <div>
        {recentSearches?.length > 0 ? (
          recentSearches.map((recentSearch, index) => (
            <button
              className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4 text-left mb-4 flex flex-row opacity-50 hover:opacity-100 transition ease-in-out delay-150"
              onClick={() => clickHandler(index)}
            >
              <div className="flex flex-col w-full">
                <div className="font-bold mb-1">{recentSearch.section}</div>
              </div>
              {bookmarks?.some(
                (obj) =>
                  JSON.stringify(obj) === JSON.stringify(recentSearches[index])
              ) ? (
                <button
                  className="flex flex-col items-center justify-center justify-items-center mr-4 opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                  onClick={(event) => deleteBookmarkHandler(event, index)}
                >
                  <Tooltip title="Remove">
                    <StarIcon />
                  </Tooltip>
                </button>
              ) : (
                <button
                  className="flex flex-col items-center justify-center justify-items-center mr-4 opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                  onClick={(event) => bookmarkHandler(event, index)}
                >
                  <Tooltip title="Bookmark">
                    <StarBorderIcon />
                  </Tooltip>
                </button>
              )}
              <button
                className="flex flex-col items-center justify-center justify-items-center opacity-50 hover:opacity-100 transition ease-in-out delay-150"
                onClick={(event) => deleteHandler(event, index)}
              >
                <Tooltip title="Clear">
                  <CloseIcon />
                </Tooltip>
              </button>
            </button>
          ))
        ) : (
          <div className="w-full h-64 text-center flex flex-col justify-center text-2xl font-bold opacity-50">
            No recent searches
          </div>
        )}
      </div>
    </div>
  );
}

function HitSwitcher(props) {
  const { query } = useStats(props);
  if (query) {
    return <InfiniteHits query={query} hitComponent={Hit} />;
  } else {
    return <DefaultHits />;
  }
}

export default function SearchBar() {
  return (
    <div className="flex w-full h-full flex-col">
      <InstantSearch searchClient={searchClient} indexName="Chakravaat">
        {/* Adding Search Box */}
        <SearchBox
          classNames={{
            form: "sticky top-0 flex flex-row mb-4",
            input:
              "outline-none focus:outline-none bg-transparent w-full rounded-lg p-4 border border-white border-opacity-20 text-white mr-3 h-14",
            submit:
              "text-white border border-white h-14 w-14 hover:text-black hover:bg-white opacity-20 hover:opacity-100 rounded-lg transition ease-in-out delay-150",
            reset:
              "text-white border border-white h-14 w-14 hover:text-black hover:bg-white opacity-20 hover:opacity-100 rounded-lg ml-3 transition ease-in-out delay-150",
          }}
          placeholder="Search for something on this website!"
          submitIconComponent={({ classNames }) => (
            <div className={classNames.submitIcon}>
              <SearchIcon />
            </div>
          )}
          resetIconComponent={({ classNames }) => (
            <div className={classNames.submitIcon}>
              <ClearIcon />
            </div>
          )}
        />

        {/* Adding Data */}
        <div className="w-full h-full overflow-scroll">
          {/* <Hits hitComponent={Hit} />  */}
          <HitSwitcher />
        </div>
      </InstantSearch>
    </div>
  );
}
