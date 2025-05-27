export default function SetsDirectoryFallback() {
  return (
    <main className="bg-[#fafafa]">
      <div className="border-[#00000014] border-b">
        <div className="mx-auto px-4 py-10 max-w-screen-lg">
          <h1 className="mb-4 font-medium text-[#171717] text-[32px] leading-10">
            Icon Sets Directory
          </h1>
          <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mb-4 lg:mb-0 rounded-md w-full h-5 animate-skeleton"></div>
        </div>
      </div>
      <div className="mx-auto px-4 py-6 max-w-screen-lg">
        <div className="bg-white shadow-[0px_0px_0px_1px_#00000014] rounded-md">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              className={`flex justify-between items-center p-4 ${
                index !== 11 ? "border-b border-[#00000014]" : ""
              }`}
              key={index}
            >
              <div className="flex items-center gap-x-4">
                <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-full w-8 h-8 animate-skeleton"></div>
                <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md w-40 h-5 animate-skeleton"></div>
              </div>
              <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] rounded-md w-16 h-8 animate-skeleton"></div>
            </div>
          ))}
        </div>
        <div className="bg-[linear-gradient(270deg,#fafafa,#eaeaea,#eaeaea,#fafafa)] bg-[length:400%_100%] mt-3 rounded-md h-10 animate-skeleton"></div>
      </div>
    </main>
  );
}
