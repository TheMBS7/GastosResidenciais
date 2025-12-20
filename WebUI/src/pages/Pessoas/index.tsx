import type { PessoasProps } from "../../types/pessoas";
import { useEffect, useEffectEvent, useState } from "react";
import { criarPessoa, deletarPessoa, fetchPessoas } from "../../services/pessoaService";
import { Trash } from "lucide-react";

function Pessoas() {
    // Estados que armazena a lista de pessoas cadastradas e a cadastrar
    const [pessoas, setPessoas] = useState<PessoasProps[]>([])
    const [novaPessoa, setNovaPessoa] = useState<PessoasProps | null>(null)
    
    // Função responsável por buscar as pessoas no backend
    async function carregarPessoas() {
        try {
            const data = await fetchPessoas();
            setPessoas(data);
        } catch (erro) {
            console.error("Erro ao carregar pessoas:", erro);
        }
    }

    // Função responsável por criar uma nova pessoa
    async function handleCriarPessoa() {
        // Validação simples para evitar envio vazio
        if (!novaPessoa) return;
        if (!novaPessoa.nome.trim()) return;

        try {
            // Envia os dados da nova pessoa para a API
            await criarPessoa(novaPessoa);

            // Limpa o formulário após salvar
            setNovaPessoa(null);

            // Atualiza a lista de pessoas
            await carregarPessoas();
        } catch (erro) {
            console.error(erro);
        }
    }

    // Função responsável por excluir uma pessoa passado o ID
    async function handleDeletePessoa(id: number) {
        try {
            await deletarPessoa(id); // Chama a função de delete

            // Recarrega a lista após exclusão
            await carregarPessoas();
        } catch (erro) {
            console.error(erro);
        }
    }

    // Cria um effectEvent para garantir que as informações só são carregadas uma vez
    const carregarInformacoesEffect = useEffectEvent(() => {
        carregarPessoas();
    });

    // useEffect executado apenas uma vez quando a tela é carregada
    useEffect(() => {
        carregarInformacoesEffect();
    }, [])
    
    return (
        <div className="w-full flex justify-center items-start">
            <div className="min-w-64 mt-10 bg-indigo-200 rounded-xl gap-4">
                <div className="p-6 space-y-6">
                    <h1 className="text-center text-5xl font-bold text-slate-800">
                        Cadastro de Pessoas
                    </h1>
                    {/* Tabela que lista todas as pessoas cadastradas */}
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full border border-slate-200 rounded-xl">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Nome</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Idade</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {pessoas.map((pessoa) => (
                                    <tr
                                    
                                        key={pessoa.id}
                                        className="hover:bg-slate-100"
                                    >
                                        <td className="py-2 pl-5 text-slate-700">
                                            {pessoa.nome}
                                        </td>
                                        <td className="py-2 pl-5 text-slate-700">
                                            {pessoa.idade}
                                        </td>
                                        <td className="py-2 pl-5 text-slate-700">
                                            {/* Botão para excluir a pessoa */}
                                            <button 
                                                className="hover:bg-slate-200 rounded-lg"
                                                onClick={() => handleDeletePessoa(pessoa.id)}
                                            >
                                                <Trash size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Formulário para adicionar uma nova pessoa */}
                    <div className="flex gap-2">
                        {/* Input do nome */}
                        <input
                            type="text"
                            placeholder="Digite o nome da pessoa"
                            value={novaPessoa?.nome ?? ""}
                            className="flex-1 rounded-lg border px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            onChange={(e) => {
                                setNovaPessoa((prev) => ({
                                    // Uso o prev para manter os outros campos
                                    ...prev!,
                                    nome: e.target.value
                                }))
                            }}
                        />

                        {/* Input da idade */}
                        <input
                            type="number"
                            min={0}
                            placeholder="Digite a idade"
                            value={novaPessoa?.idade ?? 0}
                            className="flex-1 rounded-lg border px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            onChange={(e) => {
                                setNovaPessoa((prev) => ({
                                    ...prev!,
                                    idade: e.target.valueAsNumber
                                }))
                            }}
                        />

                        {/* Botão para adicionar a pessoa */}
                        <button 
                            className="rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-700"
                            onClick={handleCriarPessoa}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pessoas;
