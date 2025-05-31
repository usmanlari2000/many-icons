export default function OtherDirectoryFallback({ iconSet }) {
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
          <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 lg:mb-0 mb-4 rounded-md w-full"></div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="bg-white duration-200 flex h-10 hover:shadow-[0px_0px_0px_1px_#00000029] overflow-hidden rounded-md shadow-[0px_0px_0px_1px_#00000014] transition-[box-shadow]">
          <label className="flex h-full items-center px-3" htmlFor="search">
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
          </label>
          <input
            className="flex-1 focus:outline-0 h-full pr-3 text-[#171717]"
            type="text"
            id="search"
            name="search"
            placeholder="Search Icons..."
            autoComplete="off"
          />
        </div>
        <div className="gap-3 grid grid-cols-4 lg:grid-cols-12 md:grid-cols-10 mt-3 sm:grid-cols-8">
          {Array.from({ length: 120 }).map((_, index) => (
            <div
              className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-14 rounded-md"
              key={index}
            ></div>
          ))}
        </div>
        <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-10 mt-3 rounded-md"></div>
      </div>
    </main>
  );
}
