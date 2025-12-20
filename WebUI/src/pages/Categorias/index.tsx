import { useEffect, useEffectEvent, useState } from "react";
import { Trash } from "lucide-react";
import { FinalidadeLabel, type CategoriasProps, type Finalidade } from "../../types/categoria";
import { criarCategoria, deletarCategoria, fetchCategorias } from "../../services/categoriasService";

function Categorias() {
    // Estados que armazena a lista de categorias vindas da API e controla a nova
    const [categorias, setCategorias] = useState<CategoriasProps[]>([]);
    const [novaCategoria, setNovaCategoria] = useState<CategoriasProps | null>(null);
    
    // Função responsável por buscar as categorias na API
    async function carregarCategorias() {
        try {
            const data = await fetchCategorias();
            // Adiciona no meu estado os dados do banco
            setCategorias(data);
        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
        }
    }

    // Função chamada ao clicar no botão "Adicionar"
    async function handleCriarCategoria() {
        // Faz validações simples antes de enviar os dados para a API
        if (!novaCategoria) return;
        if (!novaCategoria.descricao.trim()) return;

        try {
            await criarCategoria(novaCategoria);
            // Limpa o formulário após o cadastro
            setNovaCategoria(null);
            // Recarrega a lista de categorias
            await carregarCategorias();
        } catch (erro) {
            console.error(erro);
        }
    }

    // Função responsável por excluir uma pessoa passado o ID
        async function handleDeleteCategoria(id: number) {
            try {
                await deletarCategoria(id); // Chama a função de delete
    
                // Recarrega a lista após exclusão
                await carregarCategorias();
            } catch (erro) {
                console.error(erro);
            }
        }
    

    // Cria um effectEvent para garantir que as informações só são carregadas uma vez
    const carregarInformacoesEffect = useEffectEvent(() => {
        carregarCategorias();
    });

    // Executa o carregamento das categorias quando o componente é montado
    useEffect(() => {
        carregarInformacoesEffect();
    }, []);
    
    return (
       <div className="w-full flex justify-center items-start">
            <div className="min-w-64 mt-10 bg-indigo-200 rounded-xl gap-4">
                <div className="p-6 space-y-6">
                    <div>
                        <h1 className="text-center text-5xl font-bold text-slate-800">
                            Cadastro de Categorias
                        </h1>
                    </div>
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full border border-slate-200 rounded-xl">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">
                                        Descrição
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">
                                        Finalidade
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">
                                        Ação
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {categorias.map((categoria) => (
                                    <tr
                                        key={categoria.id}
                                        className="hover:bg-slate-100"
                                    >
                                        <td className="py-2 pl-5 text-slate-700">
                                            {categoria.descricao}
                                        </td>
                                        <td className="py-2 pl-5 text-slate-700">
                                            {/* Mostra o texto da finalidade usando o enum */}
                                            {FinalidadeLabel[categoria.finalidade]}
                                        </td>
                                        <td className="py-2 pl-5 text-slate-700">
                                            <button
                                                className="hover:bg-slate-200 rounded-lg"
                                                onClick={() => handleDeleteCategoria(categoria.id)}
                                            >
                                                <Trash size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-2">
                        {/* Input controlado para a descrição da categoria */}
                        <input
                            type="text"
                            placeholder="Digite a descrição da categoria"
                            className="flex-1 rounded-lg border px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            value={novaCategoria?.descricao ?? ""}
                            onChange={(e) => {
                                // Atualiza apenas a descrição mantendo os outros dados
                                setNovaCategoria((prev) => ({
                                    ...prev!,
                                    descricao: e.target.value
                                }));
                            }}
                        />

                        {/* 
                          Select responsável por definir a finalidade da categoria
                          As opções são geradas dinamicamente a partir do FinalidadeLabel
                        */}
                        <select
                            name="Finalidade"
                            value={novaCategoria?.finalidade ?? ""}
                            onChange={(e) => {
                                setNovaCategoria((prev) => ({
                                    ...prev!,
                                    // Converte o valor do select (string) para o tipo Finalidade
                                    finalidade: Number(e.target.value) as Finalidade
                                }));
                            }}
                        >
                            <option value="">-Finalidade-</option>

                            {/* 
                              Percorre o objeto FinalidadeLabel transformando em array
                              para gerar as opções do select dinamicamente
                            */}
                            {Object.entries(FinalidadeLabel).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        {/* Botão responsável por cadastrar a categoria */}
                        <button
                            className="rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-700"
                            onClick={() => handleCriarCategoria()}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categorias;
