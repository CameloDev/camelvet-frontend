export default function Topbar() {
  return (
    <header className="bg-[#2078BF] h-16 px-6 flex items-center justify-between text-white shadow-md font-ubuntu">
      <input
        type="text"
        placeholder="Pesquisar"
        className="rounded-md px-4 py-2 text-sm w-72 text-white bg-[#2078BF] border-2 border-[#00C3FF] focus:outline-none focus:ring-2 focus:ring-[#00C3FF]"
      />
      <div className="flex items-center gap-4 cursor-pointer relative">
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white font-bold">
            1
          </span>
        </button>
        <span className="text-sm font-semibold">Camelo Dev</span>
        <div className="w-8 h-8 rounded-full bg-white" />
      </div>
    </header>
  );
}
