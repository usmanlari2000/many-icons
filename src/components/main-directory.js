"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useContext, useEffect } from "react";
import { Context } from "@/app/context";
import parse from "html-react-parser";

export default function MainDirectory() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const searchParam = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchParam);

  const filterParam = searchParams.get("filter") || "[]";
  const filter = useMemo(() => {
    if (/^\[\s*(?:"[^"]*"\s*,\s*)*"[^"]*"\s*\]$/.test(filterParam)) {
      try {
        return JSON.parse(filterParam);
      } catch {
        return [];
      }
    }
    return [];
  }, [filterParam]);

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  const [searching, setSearching] = useState(searchParam ? true : false);

  const handleSearchUpdate = (event) => {
    const { value } = event.target;

    setSearch(value);
    setSearching(true);
  };

  const {
    filterDropdownOpen,
    setFilterDropdownOpen,
    setIconModalOpen,
    setClickedItem,
  } = useContext(Context);

  const router = useRouter();

  const handleFilterUpdate = (clickedItem) => {
    let updatedFilter;

    if (filter.includes(clickedItem)) {
      updatedFilter = filter.filter((item) => item !== clickedItem);
    } else {
      updatedFilter = [...filter, clickedItem];
    }

    if (updatedFilter.length > 0) {
      params.set("filter", JSON.stringify(updatedFilter));
    } else {
      params.delete("filter");
    }

    router.push(`?${params.toString()}`);

    setFilterDropdownOpen(false);
  };

  const handlePageUpdate = () => {
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

  const [iconSets, setIconSets] = useState([]);
  const [recordsCount, setRecordsCount] = useState(0);
  const [icons, setIcons] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await fetch("/api/sets");

        if (!res.ok) {
          throw new Error();
        }

        const { iconSets } = await res.json();

        setIconSets(iconSets);
        setRecordsCount(
          iconSets.reduce((sum, iconSet) => sum + iconSet.iconsCount, 0)
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

        url.searchParams.append("search", search);
        url.searchParams.append("filter", JSON.stringify(filter));
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
  }, [debouncedSearch, filter, page]);

  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="mx-auto px-4 py-10 max-w-screen-lg">
          <h1 className="mb-4 font-medium text-[#171717] text-[32px] leading-10">
            Icons Directory
          </h1>
          {recordsCount ? (
            <p>
              This directory contains {recordsCount.toLocaleString()} icons for
              applications built with React, Angular, Vue, Svelte, and more. No
              need to install any package—simply copy the SVG and paste it into
              your application.
            </p>
          ) : (
            <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mb-4 lg:mb-0 rounded-md w-full h-5 animate-skeleton"></div>
          )}
        </div>
      </div>
      <div className="mx-auto px-4 py-6 max-w-screen-lg">
        <div className="flex lg:flex-row flex-col gap-3">
          <div
            className={`flex flex-none lg:flex-1 bg-white rounded-md h-10 transition-[box-shadow] duration-200 overflow-hidden ${
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
          <div className="sm:relative w-full sm:w-64">
            <button
              className="cursor-pointer flex justify-between items-center bg-white hover:bg-[#f2f2f2] shadow-[0px_0px_0px_1px_#00000014] px-4 rounded-md w-full h-10 text-[#171717] transition-colors duration-200"
              onClick={() => setFilterDropdownOpen((prev) => !prev)}
            >
              <span className="font-medium text-left">
                {filter.length !== 0
                  ? filter.map((item, index) =>
                      index < 1
                        ? index === filter.length - 1
                          ? item
                          : item + ", "
                        : ""
                    )
                  : "Select Hosting Providers"}
                {filter.length > 1 ? `... +${filter.length - 1}` : ""}
              </span>
              <svg
                className="relative top-px"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div
              className={`top-10 left-0 z-10 absolute pt-1.5 w-full h-fit ${
                filterDropdownOpen ? "sm:block hidden" : "hidden"
              }`}
            >
              <div className="bg-white shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] p-2 rounded-lg w-full h-fit max-h-[216px] overflow-auto">
                {iconSets.length
                  ? iconSets.map((item, index) => (
                      <button
                        className="cursor-pointer flex justify-between items-center hover:bg-[#0000000D] px-2 rounded-md w-full h-10 text-[#171717] text-left transition-colors duration-200"
                        key={index}
                        onClick={() => {
                          handleFilterUpdate(item.name);
                        }}
                      >
                        <span>{item.name}</span>
                        {filter.includes(item.name) ? (
                          <svg
                            className="w-[18px] h-[18px]"
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        ) : (
                          ""
                        )}
                      </button>
                    ))
                  : Array.from({ length: 5 }).map((_, index) => (
                      <div className="flex items-center px-2 h-10" key={index}>
                        <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md w-28 h-5 animate-skeleton"></div>
                      </div>
                    ))}
              </div>
            </div>
            <div
              className={`top-0 left-0 z-30 fixed sm:hidden bg-[#0006] w-full h-full transition-opacity duration-200 ${
                filterDropdownOpen ? "" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setFilterDropdownOpen(false)}
            ></div>
            <div
              className={`bottom-0 left-0 z-40 fixed sm:hidden bg-white shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] p-2 rounded-t-lg w-full h-fit max-h-[216px] transition-transform duration-200 overflow-auto ${
                filterDropdownOpen ? "" : "translate-y-full"
              }`}
            >
              {iconSets.length
                ? iconSets.map((item, index) => (
                    <button
                      className="cursor-pointer flex justify-between items-center hover:bg-[#0000000D] px-2 rounded-md w-full h-10 text-[#171717] text-left transition-colors duration-200"
                      key={index}
                      onClick={() => {
                        handleFilterUpdate(item.name);
                      }}
                    >
                      <span>{item.name}</span>
                      {filter.includes(item.name) ? (
                        <svg
                          className="w-[18px] h-[18px]"
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      ) : (
                        ""
                      )}
                    </button>
                  ))
                : Array.from({ length: 5 }).map((_, index) => (
                    <div className="flex items-center px-2 h-10" key={index}>
                      <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md w-28 h-5 animate-skeleton"></div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="gap-3 grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 mt-3">
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
