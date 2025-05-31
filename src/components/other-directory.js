"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/app/context";
import parse from "html-react-parser";

export default function OtherDirectory({ iconSet }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const searchParam = searchParams.get("search");
  const [search, setSearch] = useState(searchParam || "");

  const pageParam = searchParams.get("page");
  const page = /^[1-9]\d*$/.test(pageParam) ? Number(pageParam) : 1;

  const handleSearchUpdate = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  const router = useRouter();

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

  const [recordsCount, setRecordsCount] = useState(0);

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

  const [icons, setIcons] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  const searching = debouncedSearch !== "" && icons.length === 0;

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
        <div className="max-w-screen-lg mx-auto px-4 py-10">
          <h1 className="font-medium leading-10 mb-4 text-[#171717] text-[32px]">
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
              for applications built with React, Angular, Vue, Svelte, and more.
              No need to install any package—simply copy the SVG and paste it
              into your application.
            </p>
          ) : (
            <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 lg:mb-0 mb-4 rounded-md w-full"></div>
          )}
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div
          className={`bg-white duration-200 flex h-10 overflow-hidden rounded-md transition-[box-shadow] ${
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
            className={` ${
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
