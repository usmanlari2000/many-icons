"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useContext, useEffect } from "react";
import { Context } from "@/app/context";
import parse from "html-react-parser";

export default function MainDirectory() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const searchParam = searchParams.get("search");
  const [search, setSearch] = useState(searchParam || "");

  const filterParam = searchParams.get("filter");
  const filter = useMemo(() => {
    if (!filterParam) return [];

    try {
      const parsed = JSON.parse(filterParam);

      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  }, [filterParam]);

  const pageParam = searchParams.get("page");
  const page = /^[1-9]\d*$/.test(pageParam) ? Number(pageParam) : 1;

  const handleSearchUpdate = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  const router = useRouter();

  const {
    filterDropdownOpen,
    setFilterDropdownOpen,
    setIconModalOpen,
    setClickedItem,
  } = useContext(Context);

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

    router.push(`?${params.toString()}`, { scroll: false });

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

  useEffect(() => {
    params.delete("page");

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch]);

  const [iconSets, setIconSets] = useState([]);
  const [recordsCount, setRecordsCount] = useState(0);

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

  const [icons, setIcons] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  const searching = debouncedSearch !== "" && icons.length === 0;

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
        <div className="max-w-screen-lg mx-auto px-4 py-10">
          <h1 className="font-medium leading-10 mb-4 text-[#171717] text-[32px]">
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
            <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 lg:mb-0 mb-4 rounded-md w-full"></div>
          )}
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div
            className={`bg-white duration-200 flex flex-none h-10 lg:flex-1 overflow-hidden rounded-md transition-[box-shadow] ${
              searchFocused
                ? "shadow-[0px_0px_0px_1px_#00000056,0px_0px_0px_4px_#00000029]"
                : "hover:shadow-[0px_0px_0px_1px_#00000029] shadow-[0px_0px_0px_1px_#00000014]"
            }`}
          >
            <label className="flex h-full items-center px-3" htmlFor="search">
              {searching ? (
                <div className="h-4 left-2 relative top-2 w-4">
                  {Array.from({ length: 12 }).map((_, index) => {
                    const angle = index * -30;
                    const delay = -(index * 100);

                    return (
                      <div
                        className="absolute animate-spinner bg-[#666] h-[8%] left-[-10%] rounded-md top-[-3.9%] w-[24%]"
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
              className="flex-1 focus:outline-0 h-full pr-3 text-[#171717]"
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
          <div className="sm:relative sm:w-64 w-full">
            <button
              className="bg-white cursor-pointer duration-200 flex h-10 hover:bg-[#f2f2f2] items-center justify-between px-4 rounded-md shadow-[0px_0px_0px_1px_#00000014] text-[#171717] transition-colors w-full"
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
                  : "Select Icon Sets"}
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
              className={`absolute h-fit left-0 pt-1.5 top-10 w-full z-10 ${
                filterDropdownOpen ? "hidden sm:block" : "hidden"
              }`}
            >
              <div className="bg-white h-fit max-h-[216px] overflow-auto p-2 rounded-lg shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] w-full">
                {iconSets.length
                  ? iconSets.map((item, index) => (
                      <button
                        className="cursor-pointer duration-200 flex h-10 hover:bg-[#0000000D] items-center justify-between px-2 rounded-md text-[#171717] text-left transition-colors w-full"
                        key={index}
                        onClick={() => {
                          handleFilterUpdate(item.name);
                        }}
                      >
                        <span>{item.name}</span>
                        {filter.includes(item.name) ? (
                          <svg
                            className="h-[18px] w-[18px]"
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
                      <div className="flex h-10 items-center px-2" key={index}>
                        <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 rounded-md w-28"></div>
                      </div>
                    ))}
              </div>
            </div>
            <div
              className={`bg-[#0006] duration-200 fixed h-full left-0 sm:hidden top-0 transition-opacity w-full z-30 ${
                filterDropdownOpen ? "" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setFilterDropdownOpen(false)}
            ></div>
            <div
              className={`bg-white bottom-0 duration-200 fixed h-fit left-0 max-h-[216px] overflow-auto p-2 rounded-t-lg shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] sm:hidden transition-transform w-full z-40 ${
                filterDropdownOpen ? "" : "translate-y-full"
              }`}
            >
              {iconSets.length
                ? iconSets.map((item, index) => (
                    <button
                      className="cursor-pointer duration-200 flex h-10 hover:bg-[#0000000D] items-center justify-between px-2 rounded-md text-[#171717] text-left transition-colors w-full"
                      key={index}
                      onClick={() => {
                        handleFilterUpdate(item.name);
                      }}
                    >
                      <span>{item.name}</span>
                      {filter.includes(item.name) ? (
                        <svg
                          className="h-[18px] w-[18px]"
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
                    <div className="flex h-10 items-center px-2" key={index}>
                      <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 rounded-md w-28"></div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="gap-3 grid grid-cols-4 lg:grid-cols-12 md:grid-cols-10 mt-3 sm:grid-cols-8">
          {icons.length
            ? icons.map((item, index) => (
                <button
                  className="bg-white border border-[#00000014] cursor-pointer duration-200 flex h-14 hover:border-[#00000029] items-center justify-center rounded-lg shadow-[0px_2px_2px_0px_#0000000a] text-[#171717] text-lg transition-colors"
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
                  className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-14 rounded-md"
                  key={index}
                ></div>
              ))}
        </div>
        {pagesCount && page <= pagesCount ? (
          <button
            className={`bg-white cursor-pointer duration-200 font-medium h-10 hover:bg-[#f2f2f2] mt-3 px-4 rounded-md shadow-[0px_0px_0px_1px_#00000014] text-[#171717] transition-colors w-full ${
              page === pagesCount
                ? "hidden"
                : "flex items-center justify-center"
            }`}
            onClick={handlePageUpdate}
          >
            Show More
          </button>
        ) : (
          <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-10 mt-3 rounded-md"></div>
        )}
      </div>
    </main>
  );
}
