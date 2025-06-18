"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFazendasDoUsuario } from "@/http/api/fazenda/fazendaService";
import { useAuth } from "@/contexts/AuthContext";
import type { Fazenda } from "@/@types/fazenda";

export default function FazendaSelectorPage() {
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFazendas = async () => {
      try {
        const data = await getFazendasDoUsuario();
        setFazendas(data);

        if (data.length === 0) {
          router.replace("/fazenda/criar");
        } else if (data.length === 1) {
          router.replace(`/dashboard/fazenda/${data[0].fazenda_id}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao buscar fazendas:", err);
      }
    };

    fetchFazendas();
  }, [router]);

  const handleSelect = (id: string) => {
    router.push(`/dashboard/fazenda/${id}`);
  };

  if (loading) return <p className="p-4">Carregando fazendas...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#1E293B]">
          Selecione uma fazenda
        </h2>
        <ul className="space-y-3">
          {fazendas.map((fazenda) => (
            <li key={fazenda.fazenda_id}>
              <button
                onClick={() => handleSelect(fazenda.fazenda_id)}
                className="w-full bg-[#FEF08A] hover:bg-[#FDE047] py-3 px-4 rounded text-[#1E293B] font-medium transition"
              >
                {fazenda.nome}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
