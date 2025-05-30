"use client";

import { useContext, useState } from "react";
import { Context } from "@/app/context";
import parse from "html-react-parser";
import { geistMono } from "@/app/fonts";

export default function IconModal() {
  const { iconModalOpen, setIconModalOpen, clickedItem } = useContext(Context);

  const [JSXCopied, setJSXCopied] = useState(false);
  
  const handleJSXCopy = async () => {
    try {
      await navigator.clipboard.writeText(clickedItem.JSX);

      setJSXCopied(true);
      setTimeout(() => setJSXCopied(false), 1000);
    } catch {
      console.log("Failed to copy");
    }
  };

  const [HTMLCopied, setHTMLCopied] = useState(false);

  const handleHTMLCopy = async () => {
    try {
      await navigator.clipboard.writeText(clickedItem.HTML);

      setHTMLCopied(true);
      setTimeout(() => setHTMLCopied(false), 1000);
    } catch {
      console.log("Failed to copy");
    }
  };

  return (
    <>
      <div
        className={`top-0 left-0 z-30 fixed bg-[#0006] sm:bg-white w-full h-full transition-opacity duration-200 ${
          iconModalOpen ? "sm:opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIconModalOpen(false)}
      ></div>
      <div
        className={`sm:block top-1/2 left-1/2 z-40 fixed hidden bg-white shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] rounded-xl w-[500px] h-fit max-h-[min(520px,75%)] transition-[opacity,transform] -translate-x-1/2 -translate-y-1/2 duration-200 overflow-auto ${
          iconModalOpen ? "" : "opacity-0 pointer-events-none scale-90"
        }`}
      >
        <div className="p-6">
          <h2 className="mb-6 font-semibold text-[#171717] text-2xl">
            {clickedItem.iconName}
          </h2>
          <div className="flex justify-center items-center border-[#00000014] mb-6 border rounded-lg h-24 text-[#171717] text-3xl">
            {parse(clickedItem.HTML)}
          </div>
          <span className="text-[#7d7d7d]">JSX</span>
          <div className="flex justify-between gap-x-2 border-[#00000014] mt-2 mb-6 pl-3 border rounded-md h-10">
            <pre
              className={`flex items-center h-full text-[13px] overflow-auto scrollbar-hide ${geistMono.className}`}
            >
              {clickedItem.JSX}
            </pre>
            <button
              className="cursor-pointer relative flex items-center px-3 h-full"
              onClick={handleJSXCopy}
            >
              <svg
                className={`transition-[opacity,transform] duration-200 ${
                  JSXCopied ? "" : "opacity-0 scale-50"
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                className={`absolute transition-[opacity,transform] duration-200 ${
                  JSXCopied ? "opacity-0 scale-50" : ""
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <span className="text-[#7d7d7d]">HTML</span>
          <div className="flex justify-between gap-x-2 border-[#00000014] mt-2 pl-3 border rounded-md h-10">
            <pre
              className={`flex items-center h-full text-[13px] overflow-auto scrollbar-hide ${geistMono.className}`}
            >
              {clickedItem.HTML}
            </pre>
            <button
              className="cursor-pointer relative flex items-center px-3 h-full"
              onClick={handleHTMLCopy}
            >
              <svg
                className={`transition-[opacity,transform] duration-200 ${
                  HTMLCopied ? "" : "opacity-0 scale-50"
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                className={`absolute transition-[opacity,transform] duration-200 ${
                  HTMLCopied ? "opacity-0 scale-50" : ""
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`-bottom-px left-0 z-40 fixed sm:hidden bg-white shadow-[0px_0px_0px_1px_#00000014,0px_1px_1px_0px_#00000005,0px_4px_8px_-4px_#0000000a,0px_16px_24px_-8px_#0000000f] rounded-t-lg w-full h-fit max-h-[min(520px,75%)] transition-transform duration-200 overflow-auto ${
          iconModalOpen ? "" : "translate-y-full"
        }`}
      >
        <div className="p-6">
          <h2 className="mb-6 font-semibold text-[#171717] text-2xl">
            {clickedItem.iconName}
          </h2>
          <div className="flex justify-center items-center border-[#00000014] mb-6 border rounded-lg h-24 text-[#171717] text-4xl">
            {parse(clickedItem.HTML)}
          </div>
          <span className="text-[#7d7d7d]">JSX</span>
          <div className="flex justify-between gap-x-2 border-[#00000014] mt-2 mb-6 pl-3 border rounded-md h-10">
            <pre
              className={`flex items-center h-full text-[13px] overflow-auto scrollbar-hide ${geistMono.className}`}
            >
              {clickedItem.JSX}
            </pre>
            <button
              className="cursor-pointer relative flex items-center px-3 h-full"
              onClick={handleJSXCopy}
            >
              <svg
                className={`absolute transition-[opacity,transform] duration-200 ${
                  JSXCopied ? "" : "opacity-0 scale-50"
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                className={`transition-[opacity,transform] duration-200 ${
                  JSXCopied ? "opacity-0 scale-50" : ""
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <span className="text-[#7d7d7d]">HTML</span>
          <div className="flex justify-between gap-x-2 border-[#00000014] mt-2 pl-3 border rounded-md h-10">
            <pre
              className={`flex items-center h-full text-[13px] overflow-auto scrollbar-hide ${geistMono.className}`}
            >
              {clickedItem.HTML}
            </pre>
            <button
              className="cursor-pointer relative flex justify-center items-center px-3 h-full"
              onClick={handleHTMLCopy}
            >
              <svg
                className={`absolute transition-[opacity,transform] duration-200 ${
                  HTMLCopied ? "" : "opacity-0 scale-50"
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                className={`transition-[opacity,transform] duration-200 ${
                  HTMLCopied ? "opacity-0 scale-50" : ""
                }`}
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
