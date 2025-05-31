export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-[#00000014] border-t">
      <div className="max-w-screen-lg mx-auto px-4 py-6 text-center text-xs">
        © {year} ManyIcons
      </div>
    </footer>
  );
}
