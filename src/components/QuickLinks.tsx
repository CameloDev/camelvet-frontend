export default function QuickLinks() {
  const links = [
    { title: "Animais", icon: "/icons/animal.png" },
    { title: "Estatísticas", icon: "/icons/stats.png" },
    { title: "Vacinas", icon: "/icons/vaccine.png" },
    { title: "Funcionários", icon: "/icons/user.png" }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {links.map((link) => (
        <div
          key={link.title}
          className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center"
        >
          <img src={link.icon} alt={link.title} className="h-12 mb-2" />
          <span className="text-[#1E293B] font-medium">{link.title}</span>
        </div>
      ))}
    </div>
  );
}
