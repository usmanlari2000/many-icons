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
      className={`-top-px left-0 z-20 sticky bg-white shadow-[inset_0px_-1px_0px_#00000014] ${
        menuOpen ? "h-screen lg:h-fit" : ""
      }`}
    >
      <div className="mx-auto px-4 max-w-screen-lg">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-x-4">
            <Link
              className="flex font-medium h-10 items-center text-[#171717]"
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              ManyIcons
            </Link>
            <Link
              className={`lg:inline hidden transition-colors duration-200 ${
                pathname === "/sets" ? "text-[#171717]" : "hover:text-[#171717]"
              }`}
              href="/sets"
            >
              Icon Sets
            </Link>
          </div>
          <button
            className="cursor-pointer lg:flex items-center hidden bg-[#171717] hover:bg-[#383838] shadow-[0px_0px_0px_1px_#00000000] px-4 rounded-md h-10 font-medium text-white transition-colors duration-200"
            onClick={() => {
              setContactModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Contact Us
          </button>
          <button
            className="cursor-pointer flex flex-col justify-center items-center border-[#00000014] lg:hidden border rounded-full w-8 h-8"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div
              className={`bg-[#666] w-[14px] h-[1.5px] transition-transform duration-200 ${
                menuOpen
                  ? "translate-y-[0.5px] rotate-45 scale-x-110"
                  : "translate-y-[-2.75px]"
              }`}
            ></div>
            <div
              className={`bg-[#666] w-[14px] h-[1.5px] transition-transform duration-200 ${
                menuOpen
                  ? "translate-y-[-0.5px] -rotate-45 scale-x-110"
                  : "translate-y-[2.75px]"
              }`}
            ></div>
          </button>
        </div>
        <div
          className={
            menuOpen
              ? "flex flex-col gap-y-3 border-[#ebebeb] lg:hidden py-3 border-b"
              : "hidden"
          }
        >
          <button
            className="cursor-pointer flex justify-center items-center bg-[#171717] hover:bg-[#383838] shadow-[0px_0px_0px_1px_#00000000] px-4 rounded-md h-10 font-medium text-white transition-colors duration-200"
            onClick={() => {
              setContactModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Contact Us
          </button>
          <Link
            className={`flex items-center h-10 transition-colors duration-200 ${
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
