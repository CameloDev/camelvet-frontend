export default function Topbar() {
  return (
    <header className="bg-[#2078BF] h-16 px-6 flex items-center justify-between text-white shadow-md">
      <input
        type="text"
        placeholder="Pesquisar"
        className="rounded px-4 py-2 text-sm w-1/3 text-black focus:outline-none"
      />
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Camelo Dev</span>
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
    </header>
  );
}
