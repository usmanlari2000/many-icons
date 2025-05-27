export default function OtherDirectoryFallback({ iconSet }) {
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
          <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mb-4 lg:mb-0 rounded-md w-full h-5 animate-skeleton"></div>
        </div>
      </div>
      <div className="mx-auto px-4 py-6 max-w-screen-lg">
        <div className="flex bg-white rounded-md h-10 transition-[box-shadow] duration-200 overflow-hidden shadow-[0px_0px_0px_1px_#00000014] hover:shadow-[0px_0px_0px_1px_#00000029]">
          <label className="flex items-center px-3 h-full" htmlFor="search">
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
            className="flex-1 pr-3 h-full text-[#171717] focus:outline-0"
            type="text"
            id="search"
            name="search"
            placeholder="Search Icons..."
            autoComplete="off"
          />
        </div>
        <div className="gap-3 grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 mt-3">
          {Array.from({ length: 120 }).map((_, index) => (
            <div
              className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md h-14 animate-skeleton"
              key={index}
            ></div>
          ))}
        </div>
        <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mt-3 rounded-md h-10 animate-skeleton"></div>
      </div>
    </main>
  );
}
