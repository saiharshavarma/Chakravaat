import { useState, useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function NoHits({ query }) {
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    const storedSearches = localStorage.getItem("recent");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full text-center text-2xl justify-center px-6 py-8">
        <div className="opacity-50">No results for "</div>
        <div>{query}</div>
        <div className="opacity-50">"</div>
      </div>
      <div className="font-bold w-full text-left mb-4">Try Searching For:</div>
      <div className="bg-white bg-opacity-10 w-full border border-white border-opacity-20 rounded-lg">
        <button
          className="w-full p-4 flex border-b border-white border-opacity-20 opacity-50 hover:opacity-100 transition ease-in-out delay-150 hover:bg-white hover:bg-opacity-20 rounded-t-lg"
          onClick={() => {
            setRecentSearches((prevRecentSearches) => {
              const newRecentSearch = {
                section: "Archives",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis lectus in ante scelerisque",
                location: "/archive",
              };
              const updatedSearches = prevRecentSearches.filter(
                (search) => !isEqual(search, newRecentSearch)
              );
              const newSearches = [newRecentSearch, ...updatedSearches];
              if (newSearches.length > 5) {
                newSearches.pop();
              }
              localStorage.setItem("recent", JSON.stringify(newSearches));
              return newSearches;
            });
            window.open(`http://localhost:3000/archive`, "_blank");
          }}
        >
          <div className="w-full text-left">Previous Archives</div>
          <div>
            <NavigateNextIcon />
          </div>
        </button>
        <button
          className="w-full p-4 flex border-b border-white border-opacity-20 opacity-50 hover:opacity-100 transition ease-in-out delay-150 hover:bg-white hover:bg-opacity-20"
          onClick={() => {
            setRecentSearches((prevRecentSearches) => {
              const newRecentSearch = {
                section: "Upload",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis lectus in ante scelerisque",
                location: "/upload",
              };
              const updatedSearches = prevRecentSearches.filter(
                (search) => !isEqual(search, newRecentSearch)
              );
              const newSearches = [newRecentSearch, ...updatedSearches];
              if (newSearches.length > 5) {
                newSearches.pop();
              }
              localStorage.setItem("recent", JSON.stringify(newSearches));
              return newSearches;
            });
            window.open(`http://localhost:3000/upload`, "_blank");
          }}
        >
          <div className="w-full text-left">Custom Prediction</div>
          <div>
            <NavigateNextIcon />
          </div>
        </button>
        <button
          className="w-full p-4 flex border-b border-white border-opacity-20 opacity-50 hover:opacity-100 transition ease-in-out delay-150 hover:bg-white hover:bg-opacity-20"
          onClick={() => {
            setRecentSearches((prevRecentSearches) => {
              const newRecentSearch = {
                section: "Real Time",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis lectus in ante scelerisque",
                location: "/admin",
              };
              const updatedSearches = prevRecentSearches.filter(
                (search) => !isEqual(search, newRecentSearch)
              );
              const newSearches = [newRecentSearch, ...updatedSearches];
              if (newSearches.length > 5) {
                newSearches.pop();
              }
              localStorage.setItem("recent", JSON.stringify(newSearches));
              return newSearches;
            });
            window.open(`http://localhost:3000/admin`, "_blank");
          }}
        >
          <div className="w-full text-left">Real Time Prediction</div>
          <div>
            <NavigateNextIcon />
          </div>
        </button>
        <button
          className="w-full p-4 flex opacity-50 hover:opacity-100 transition ease-in-out delay-150 hover:bg-white hover:bg-opacity-20 rounded-b-lg "
          onClick={() => {
            setRecentSearches((prevRecentSearches) => {
              const newRecentSearch = {
                section: "Time Series",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis lectus in ante scelerisque",
                location: "/time-series",
              };
              const updatedSearches = prevRecentSearches.filter(
                (search) => !isEqual(search, newRecentSearch)
              );
              const newSearches = [newRecentSearch, ...updatedSearches];
              if (newSearches.length > 5) {
                newSearches.pop();
              }
              localStorage.setItem("recent", JSON.stringify(newSearches));
              return newSearches;
            });
            window.open(`http://localhost:3000/time-series`, "_blank");
          }}
        >
          <div className="w-full text-left">Time Series Prediction</div>
          <div>
            <NavigateNextIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export function InfiniteHits({ query, hitComponent: HitComponent, ...props }) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <div className="">
      <ul className="">
        {hits.length === 0 ? (
          <NoHits query={query} />
        ) : (
          hits.map((hit) => (
            <li key={hit.objectID} className="">
              <HitComponent hit={hit} />
            </li>
          ))
        )}
        <li className="" ref={sentinelRef} aria-hidden="true" />
      </ul>
    </div>
  );
}
