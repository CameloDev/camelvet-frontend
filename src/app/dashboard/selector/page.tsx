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

  if (loading) return <p className="p-4 text-center text-[#2078BF] font-medium">Carregando fazendas...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#8FBBDF]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#2078BF]">
          Selecione uma fazenda
        </h2>

        <ul className="space-y-4">
          {fazendas.map((fazenda) => (
            <li key={fazenda.fazenda_id}>
              <button
                onClick={() => handleSelect(fazenda.fazenda_id)}
                className="w-full bg-[#2078BF] hover:bg-[#00C3FF] text-white py-3 px-4 rounded-lg font-semibold shadow transition"
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
