"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toSlug } from "@/utils";

export default function SetsDirectory() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const pageParam = searchParams.get("page");
  const page = /^[1-9]\d*$/.test(pageParam) ? Number(pageParam) : 1;

  const router = useRouter();

  const handlePageUpdate = () => {
    params.set("page", (page + 1).toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [iconSets, setIconSets] = useState([]);
  const [recordsCount, setRecordsCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setIconSets([]);
    setPagesCount(0);

    const handleFetch = async () => {
      try {
        const url = new URL("/api/sets", window.location.origin);

        url.searchParams.append("page", page.toString());

        const res = await fetch(url.toString());

        if (!res.ok) {
          throw new Error();
        }

        const { iconSets, pagesCount } = await res.json();

        setIconSets(iconSets);
        setRecordsCount(iconSets.length);
        setPagesCount(pagesCount);
      } catch {
        console.log("Failed to fetch");
      }
    };

    handleFetch();
  }, [page]);

  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="max-w-screen-lg mx-auto px-4 py-10">
          <h1 className="font-medium leading-10 mb-4 text-[#171717] text-[32px]">
            Icon Sets Directory
          </h1>
          {recordsCount ? (
            <p>
              This directory contains {recordsCount.toLocaleString()} icon sets
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
        <div className="bg-white rounded-md shadow-[0px_0px_0px_1px_#00000014]">
          {iconSets.length
            ? iconSets.map((item, index) => (
                <div
                  className={`flex items-center justify-between p-4 ${
                    index !== iconSets.length - 1
                      ? "border-[#00000014] border-b"
                      : ""
                  }`}
                  key={index}
                >
                  <div className="flex gap-x-4 items-center">
                    <div className="bg-[#f2f2f2] flex h-8 items-center justify-center relative rounded-full w-8">
                      <svg
                        className="h-4 text-[#171717] w-4"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Globe">
                          <path d="M14.645,2.428a8.1,8.1,0,0,0-1.61-.3,9.332,9.332,0,0,0-3.6.28l-.07.02a9.928,9.928,0,0,0,.01,19.15,9.091,9.091,0,0,0,2.36.34,1.274,1.274,0,0,0,.27.02,9.65,9.65,0,0,0,2.63-.36,9.931,9.931,0,0,0,.01-19.15Zm-.27.96a8.943,8.943,0,0,1,5.84,5.11h-4.26a13.778,13.778,0,0,0-2.74-5.35A8.254,8.254,0,0,1,14.375,3.388Zm-2.37-.09a12.78,12.78,0,0,1,2.91,5.2H9.075A12.545,12.545,0,0,1,12.005,3.3Zm3.16,6.2a13.193,13.193,0,0,1,0,5.01H8.845a12.185,12.185,0,0,1-.25-2.5,12.353,12.353,0,0,1,.25-2.51Zm-5.6-6.09.07-.02a9.152,9.152,0,0,1,1.16-.23A13.618,13.618,0,0,0,8.045,8.5H3.8A9,9,0,0,1,9.565,3.408Zm-6.5,8.6a8.71,8.71,0,0,1,.37-2.51h4.39a13.95,13.95,0,0,0-.23,2.51,13.757,13.757,0,0,0,.23,2.5H3.435A8.591,8.591,0,0,1,3.065,12.008Zm6.57,8.61a8.9,8.9,0,0,1-5.84-5.11h4.24a13.632,13.632,0,0,0,2.77,5.35A8.1,8.1,0,0,1,9.635,20.618Zm-.56-5.11h5.84a12.638,12.638,0,0,1-2.91,5.21A12.872,12.872,0,0,1,9.075,15.508Zm5.3,5.11a11.551,11.551,0,0,1-1.17.24,13.8,13.8,0,0,0,2.75-5.35h4.26A8.924,8.924,0,0,1,14.375,20.618Zm1.8-6.11a13.611,13.611,0,0,0,0-5.01h4.39a8.379,8.379,0,0,1,.37,2.51,8.687,8.687,0,0,1-.36,2.5Z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="font-medium text-[#171717]">
                        {item.name}
                      </span>
                      <span className="-top-[3px] hidden relative xs:inline">
                        .
                      </span>
                      <span className="hidden xs:inline">
                        {item.iconsCount} icons
                      </span>
                    </div>
                  </div>
                  <Link
                    className="bg-white duration-200 flex font-medium h-8 hover:bg-[#f2f2f2] items-center px-4 rounded-md shadow-[0px_0px_0px_1px_#00000014] text-[#171717] transition-colors"
                    href={`/sets/${toSlug(item.name)}`}
                  >
                    Visit
                  </Link>
                </div>
              ))
            : Array.from({ length: 12 }).map((_, index) => (
                <div
                  className={`flex items-center justify-between p-4 ${
                    index !== 11 ? "border-[#00000014] border-b" : ""
                  }`}
                  key={index}
                >
                  <div className="flex gap-x-4 items-center">
                    <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-8 rounded-full w-8"></div>
                    <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 rounded-md w-40"></div>
                  </div>
                  <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-8 rounded-md w-16"></div>
                </div>
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
