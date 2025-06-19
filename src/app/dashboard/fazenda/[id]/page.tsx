"use client";

import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/TopBar";
import QuickLinks from "@/components/QuickLinks";

export default function FazendaDashboardPage() {
  const params = useParams();
  const fazendaId = params?.id;

  return (
    <div className="flex min-h-screen bg-[#F2F9FC]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-[#2078BF] mb-6">
            Dashboard da Fazenda #{fazendaId}
          </h1>

          <QuickLinks />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#2078BF] mb-4">
              Vacinas
            </h2>
            <div className="bg-white shadow-lg rounded-xl p-6">
              {/* Tabela ou cards de vacinas */}
              <p className="text-gray-500">Exibir vacinas da fazenda {fazendaId}...</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
