"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DashboardCard from "@/components/DashboardCard";
import { getFazendaById } from "@/http/api/fazenda/fazendaService";
import type { Fazenda } from "@/@types/fazenda";

export default function FazendaDashboardPage() {
  const params = useParams();
  const fazendaId = params?.id as string;
  const [fazenda, setFazenda] = useState<Fazenda | null>(null);

  useEffect(() => {
    if (fazendaId) {
      getFazendaById(fazendaId)
        .then(setFazenda)
        .catch((err) =>
          console.error("Erro ao buscar detalhes da fazenda:", err)
        );
    }
  }, [fazendaId]);

  return (
    <div className="flex min-h-screen bg-[#F2F9FC]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-[#2078BF] mb-6 font-ubuntu">
              {fazenda ? "Olá Camelo Dev" : "Carregando..."}
            </h1>

            {/* DASHBOARD CARDS */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-[#2078BF] mb-4 font-ubuntu">
                Acesso rápido
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-ubuntu">
                <DashboardCard
                  title="Animais"
                  iconSrc="/icons/animais.png"
                  href={`/dashboard/fazenda/${fazendaId}/animais`}
                />
                <DashboardCard
                  title="Vacinas"
                  iconSrc="/icons/vacinas.png"
                  href={`/dashboard/fazenda/${fazendaId}/vacinas`}
                />
                <DashboardCard
                  title="Funcionários"
                  iconSrc="/icons/funcionarios.png"
                  href={`/dashboard/fazenda/${fazendaId}/funcionarios`}
                />
                <DashboardCard
                  title="Estatísticas"
                  iconSrc="/icons/estatisticas.png"
                  href={`/dashboard/fazenda/${fazendaId}/estatisticas`}
                />
              </div>
            </section>

            {/* VACINAS (placeholder futuro) */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-[#2078BF] mb-4 font-ubuntu">
                Vacinas
              </h2>
              <div className="bg-white shadow-lg rounded-xl p-6">
                <p className="text-gray-500">
                  Exibir vacinas da fazenda {fazenda?.nome || fazendaId}...
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
