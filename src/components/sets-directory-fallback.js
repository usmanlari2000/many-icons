export default function SetsDirectoryFallback() {
  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="max-w-screen-lg mx-auto px-4 py-10">
          <h1 className="font-medium leading-10 mb-4 text-[#171717] text-[32px]">
            Icon Sets Directory
          </h1>
          <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-5 lg:mb-0 mb-4 rounded-md w-full"></div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-md shadow-[0px_0px_0px_1px_#00000014]">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              className={`flex justify-between items-center p-4 ${
                index !== 11 ? "border-b border-[#00000014]" : ""
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
        <div className="animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] h-10 mt-3 rounded-md"></div>
      </div>
    </main>
  );
}
