export default function MainDirectoryFallback() {
  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="max-w-screen-lg mx-auto px-4 py-10">
          <h1 className="font-medium leading-10 mb-4 text-[#171717] text-[32px]">
            Icons Directory
          </h1>
          <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 lg:mb-0 mb-4 rounded-md w-full"></div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="bg-white duration-200 flex flex-none h-10 hover:shadow-[0px_0px_0px_1px_#00000029] lg:flex-1 overflow-hidden rounded-md shadow-[0px_0px_0px_1px_#00000014] transition-[box-shadow]">
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
          <div className="sm:relative sm:w-64 w-full">
            <button className="bg-white duration-200 flex h-10 hover:bg-[#f2f2f2] items-center justify-between px-4 rounded-md shadow-[0px_0px_0px_1px_#00000014] text-[#171717] transition-colors w-full">
              <span className="font-medium text-left">Select Icon Sets</span>
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
          </div>
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
