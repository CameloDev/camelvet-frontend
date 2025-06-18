"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Fazenda } from "@/@types/fazenda";
import { getFazendaById } from "@/http/api/fazenda/fazendaService";

export default function FazendaDetalhesPage() {
  const params = useParams();
  const id = params?.id as string;

  const [fazenda, setFazenda] = useState<Fazenda | null>(null);

  useEffect(() => {
    if (id) {
      getFazendaById(id)
        .then(setFazenda)
        .catch((err) =>
          console.error("Erro ao carregar a fazenda:", err)
        );
    }
  }, [id]);

  if (!fazenda) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA]">
        <p className="text-lg text-[#1E293B]">Carregando fazenda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA]">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-4 text-center">
          Fazenda Selecionada
        </h1>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-[#64748B]">ID da Fazenda</p>
            <p className="text-lg text-[#1E293B] font-medium">
              {fazenda.fazenda_id}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64748B]">Nome</p>
            <p className="text-lg text-[#1E293B] font-medium">
              {fazenda.nome}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64748B]">Localização</p>
            <p className="text-lg text-[#1E293B] font-medium">
              {fazenda.localizacao}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => alert("Em breve: editar fazenda")}
            className="bg-[#FEF08A] hover:bg-[#FDE047] transition px-6 py-2 rounded-lg text-[#1E293B] font-semibold shadow-sm"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
