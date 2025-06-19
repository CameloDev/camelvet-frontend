import {
  Home,
  User,
  Syringe,
  BarChart2,
  LogOut,
  Users
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-16 bg-white shadow-md flex flex-col items-center py-4 gap-6">
      <Home className="text-[#2078BF] cursor-pointer" />
      <User className="text-gray-400 hover:text-[#2078BF] cursor-pointer" />
      <Syringe className="text-gray-400 hover:text-[#2078BF] cursor-pointer" />
      <BarChart2 className="text-gray-400 hover:text-[#2078BF] cursor-pointer" />
      <Users className="text-gray-400 hover:text-[#2078BF] cursor-pointer" />
      <LogOut className="text-gray-400 hover:text-[#EF4444] cursor-pointer mt-auto" />
    </aside>
  );
}
