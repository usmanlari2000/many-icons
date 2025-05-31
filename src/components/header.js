"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/app/context";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  const { menuOpen, setMenuOpen, setContactModalOpen } = useContext(Context);

  return (
    <header
      className={`-top-px bg-white left-0 shadow-[inset_0px_-1px_0px_#00000014] sticky z-20 ${
        menuOpen ? "h-screen lg:h-fit" : ""
      }`}
    >
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <Link
              className="flex font-medium h-10 items-center text-[#171717]"
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              ManyIcons
            </Link>
            <Link
              className={`duration-200 hidden lg:inline transition-colors ${
                pathname === "/sets" ? "text-[#171717]" : "hover:text-[#171717]"
              }`}
              href="/sets"
            >
              Icon Sets
            </Link>
          </div>
          <button
            className="bg-[#171717] cursor-pointer duration-200 font-medium h-10 hidden hover:bg-[#383838] items-center lg:flex px-4 rounded-md shadow-[0px_0px_0px_1px_#00000000] text-white transition-colors"
            onClick={() => {
              setContactModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Contact Us
          </button>
          <button
            className="border border-[#00000014] cursor-pointer flex flex-col h-8 items-center justify-center lg:hidden rounded-full w-8"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div
              className={`bg-[#666] duration-200 h-[1.5px] transition-transform w-[14px] ${
                menuOpen
                  ? "rotate-45 scale-x-110 translate-y-[0.5px]"
                  : "translate-y-[-2.75px]"
              }`}
            ></div>
            <div
              className={`bg-[#666] duration-200 h-[1.5px] transition-transform w-[14px] ${
                menuOpen
                  ? "-rotate-45 scale-x-110 translate-y-[-0.5px]"
                  : "translate-y-[2.75px]"
              }`}
            ></div>
          </button>
        </div>
        <div
          className={
            menuOpen
              ? "border-[#ebebeb] border-b flex flex-col gap-y-3 lg:hidden py-3"
              : "hidden"
          }
        >
          <button
            className="bg-[#171717] cursor-pointer duration-200 flex font-medium h-10 hover:bg-[#383838] items-center justify-center px-4 rounded-md shadow-[0px_0px_0px_1px_#00000000] text-white transition-colors"
            onClick={() => {
              setContactModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Contact Us
          </button>
          <Link
            className={`duration-200 flex h-10 items-center transition-colors ${
              pathname === "/sets" ? "text-[#171717]" : "hover:text-[#171717]"
            }`}
            href="/sets"
            onClick={() => setMenuOpen(false)}
          >
            Icon Sets
          </Link>
        </div>
      </div>
    </header>
  );
}
