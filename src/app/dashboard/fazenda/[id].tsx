"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fazenda } from "@/@types/fazenda";

export default function FazendaDetalhesPage() {
  const router = useRouter();
  const { id } = router.query;

  const [fazenda, setFazenda] = useState<Fazenda | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/fazendas/${id}`)
        .then((res) => res.json())
        .then((data) => setFazenda(data));
    }
  }, [id]);

  if (!fazenda) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes da Fazenda: {fazenda.nome}</h1>
      <p>ID: {fazenda.fazenda_id}</p>
    </div>
  );
}
