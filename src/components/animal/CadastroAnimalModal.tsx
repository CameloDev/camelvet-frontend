'use client';

import { useState } from 'react';
import { AnimalPost } from '@/@types/animalPost';
import { adicionarAnimal } from '@/http/api/animal/animalService';

interface Props {
  fazendaId: number;
  onSuccess?: () => void;
}

export default function CadastroAnimalModal({ fazendaId, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AnimalPost>({
    sexo: 'MACHO',
    nascimento: '',
    Categoria: '',
    raca: '',
    quantidade: 1
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'quantidade'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    // Validação simples para quantidade positiva
    if (form.quantidade <= 0) {
      setMensagem('❌ Quantidade deve ser maior que zero.');
      setLoading(false);
      return;
    }

    try {
      await adicionarAnimal(fazendaId, form);
      setMensagem('✅ Animal cadastrado!');
      setTimeout(() => {
        setIsOpen(false);
        setMensagem('');
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err: any) {
      if (err.isAxiosError && err.response) {
        const data = err.response.data;
        if (typeof data === 'object' && data !== null) {
          const erros = Object.entries(data)
            .map(([campo, msg]) => `${campo}: ${msg}`)
            .join('; ');
          setMensagem(`${erros}`);
        } else {
          setMensagem(`${data?.message || 'Erro desconhecido'}`);
        }
      } else {
        setMensagem(`${err.message || 'Erro desconhecido'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#2078BF] text-white px-5 py-2.5 rounded-xl hover:bg-[#125d96] transition font-medium font-ubuntu"
      >
        + Adicionar Animal
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-[#2078BF] mb-4 font-ubuntu">
              Novo Animal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 font-ubuntu">
              <select
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="MACHO">Macho</option>
                <option value="FEMEA">Fêmea</option>
              </select>
              <input
                type="date"
                name="nascimento"
                value={form.nascimento}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="Categoria"
                placeholder="Categoria"
                value={form.Categoria}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="raca"
                placeholder="Raça"
                value={form.raca}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="quantidade"
                type="number"
                min={1}
                value={form.quantidade}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2078BF] text-white px-4 py-2 rounded hover:bg-[#125d96]"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </form>
            {mensagem && (
              <p className="mt-2 text-sm text-center text-red-600 font-semibold">
                {mensagem}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
