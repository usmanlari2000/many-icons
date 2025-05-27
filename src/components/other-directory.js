"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/app/context";
import parse from "html-react-parser";

export default function OtherDirectory({ iconSet }) {
  const searchParams = useSearchParams();

  const searchParam = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchParam);

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  const [searching, setSearching] = useState(searchParam ? true : false);

  const handleSearchUpdate = (event) => {
    const { value } = event.target;

    setSearch(value);
    setSearching(true);
  };

  const router = useRouter();

  const handlePageUpdate = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("search", search);
    params.set("page", (page + 1).toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch]);

  const [recordsCount, setRecordsCount] = useState(0);
  const [icons, setIcons] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await fetch("/api/sets");

        if (!res.ok) throw new Error();
        const { iconSets } = await res.json();

        setRecordsCount(
          iconSets.find((item) => item.name === iconSet.name).iconsCount || 0
        );
      } catch {
        console.log("Failed to fetch");
      }
    };

    handleFetch();
  }, []);

  useEffect(() => {
    setIcons([]);
    setPagesCount(0);

    const handleFetch = async () => {
      try {
        const url = new URL("/api/icons", window.location.origin);

        url.searchParams.append("search", debouncedSearch);
        url.searchParams.append("filter", JSON.stringify([iconSet.name]));
        url.searchParams.append("page", page.toString());

        const res = await fetch(url.toString());

        if (!res.ok) {
          throw new Error();
        }

        const { icons, pagesCount } = await res.json();

        setIcons(icons);
        setPagesCount(pagesCount);

        if (icons.length) {
          setSearching(false);
        }
      } catch {
        console.log("Failed to fetch");
      }
    };

    handleFetch();
  }, [debouncedSearch, page]);

  const [searchFocused, setSearchFocused] = useState(false);

  const { setIconModalOpen, setClickedItem } = useContext(Context);

  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="mx-auto px-4 py-10 max-w-screen-lg">
          <h1 className="mb-4 font-medium text-[#171717] text-[32px] leading-10">
            {iconSet.name.toLowerCase().includes("icon")
              ? iconSet.name
              : `${iconSet.name} Icons`}{" "}
            Directory
          </h1>
          {recordsCount ? (
            <p>
              This directory contains {recordsCount.toLocaleString()}{" "}
              {iconSet.name.toLowerCase().includes("icon")
                ? iconSet.name
                : `${iconSet.name} icons`}{" "}
              for applications built with React, Angular, Vue, and more. No need
              to install any package—simply copy the SVG and paste it into your
              application.
            </p>
          ) : (
            <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mb-4 lg:mb-0 rounded-md w-full h-5 animate-skeleton"></div>
          )}
        </div>
      </div>
      <div className="mx-auto px-4 py-6 max-w-screen-lg">
        <div
          className={`flex bg-white rounded-md h-10 transition-[box-shadow] duration-200 overflow-hidden ${
            searchFocused
              ? "shadow-[0px_0px_0px_1px_#00000056,0px_0px_0px_4px_#00000029]"
              : "shadow-[0px_0px_0px_1px_#00000014] hover:shadow-[0px_0px_0px_1px_#00000029]"
          }`}
        >
          <label className="flex items-center px-3 h-full" htmlFor="search">
            {searching ? (
              <div className="relative top-2 left-2 w-4 h-4">
                {Array.from({ length: 12 }).map((_, index) => {
                  const angle = index * -30;
                  const delay = -(index * 100);
                  return (
                    <div
                      className="top-[-3.9%] left-[-10%] absolute bg-[#666] rounded-md w-[24%] h-[8%] animate-spinner"
                      key={index}
                      style={{
                        animationDelay: `${delay}ms`,
                        transform: `rotate(${angle}deg) translateX(146%)`,
                      }}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <svg
                className="text-[#8f8f8f]"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </label>
          <input
            className="flex-1 pr-3 h-full text-[#171717] focus:outline-0"
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="Search Icons..."
            autoComplete="off"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={handleSearchUpdate}
          />
        </div>

        <div className="gap-3 grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xs:grid-cols-6 mt-3">
          {icons.length
            ? icons.map((item, index) => (
                <button
                  className="cursor-pointer flex justify-center items-center border-[#00000014] hover:border-[#00000029] bg-white shadow-[0px_2px_2px_0px_#0000000a] border rounded-lg h-14 text-[#171717] text-lg transition-colors duration-200"
                  key={index}
                  onClick={() => {
                    setClickedItem(item);
                    setIconModalOpen(true);
                  }}
                >
                  {parse(item.HTML)}
                </button>
              ))
            : Array.from({ length: 120 }).map((_, index) => (
                <div
                  className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md h-14 animate-skeleton"
                  key={index}
                ></div>
              ))}
        </div>
        {pagesCount && page <= pagesCount ? (
          <button
            className={`cursor-pointer bg-white hover:bg-[#f2f2f2] shadow-[0px_0px_0px_1px_#00000014] mt-3 px-4 rounded-md w-full h-10 font-medium text-[#171717] transition-colors duration-200 ${
              page === pagesCount
                ? "hidden"
                : "flex justify-center items-center"
            }`}
            onClick={handlePageUpdate}
          >
            Show More
          </button>
        ) : (
          <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mt-3 rounded-md h-10 animate-skeleton"></div>
        )}
      </div>
    </main>
  );
}
