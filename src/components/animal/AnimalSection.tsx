import { useState, useEffect } from 'react';
import CadastroAnimalModal from './CadastroAnimalModal'; // ajuste o caminho se precisar
import { listarAnimaisPorFazenda } from '@/http/api/animal/animalService';
import { AnimalGet } from '@/@types/animalGet';

interface Props {
  fazendaId: number;
  fazendaNome?: string;
}

export default function AnimaisSection({ fazendaId, fazendaNome }: Props) {
  const [animais, setAnimais] = useState<AnimalGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carregarAnimais = async () => {
    setLoading(true);
    setErro('');
    try {
      const dados = await listarAnimaisPorFazenda(fazendaId);
      setAnimais(dados);
      console.log(dados);
    } catch (e) {
      setErro('Erro ao carregar animais.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fazendaId) {
      carregarAnimais();
    }
  }, [fazendaId]);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-[#2078BF] mb-4 font-ubuntu">
        Animais
      </h2>
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <p className="text-gray-500 mb-4">
          Lista de animais da fazenda <strong>{fazendaNome || fazendaId}</strong>
        </p>

        {loading && <p>Carregando animais...</p>}
        {erro && <p className="text-red-600">{erro}</p>}

        {!loading && !erro && animais.length === 0 && (
          <p className="text-gray-500">Nenhum animal cadastrado ainda.</p>
        )}

        {!loading && !erro && animais.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full font-ubuntu text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className='px-4 py-3 text-center'>ID</th>
                  <th className="px-4 py-3 text-center">Raça</th>
                  <th className="px-4 py-3 text-center">Categoria</th>
                  <th className="px-4 py-3 text-center">Sexo</th>
                  <th className="px-4 py-3 text-center">Quantidade</th>
                  <th className='px-4 py-3 text-center'>Nascimento</th>
                </tr>
              </thead>
              <tbody>
                {animais.map((animal, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors border-t border-gray-200"
                  >
                    <td className='px-4 py-3 text-center'>{animal.animal_id}</td>
                    <td className="px-4 py-3 text-center">{animal.raca}</td>
                    <td className="px-4 py-3 text-center">{animal.categoria}</td>
                    <td className="px-4 py-3 text-center">{animal.sexo}</td>
                    <td className="px-4 py-3 text-center">{animal.quantidade}</td>
                    <td className='px-4 py-3 text-center date'> {new Date(animal.nascimento).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end pt-6">
        <CadastroAnimalModal fazendaId={fazendaId} onSuccess={() => {
            carregarAnimais();
            setIsModalOpen(false);
            }}/>
        </div>
      </div>
    </section>
  );
}
