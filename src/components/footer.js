export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-[#00000014] bg-white border-t">
      <div className="mx-auto px-4 py-6 max-w-screen-lg text-center text-xs">
        © {year} ManyIcons
      </div>
    </footer>
  );
}
