import { useEffect, useEffectEvent, useState } from "react";
import { Trash } from "lucide-react";
import { type CategoriasProps } from "../../types/categoria";
import { TipoLabel, type Tipo, type TransacoesProps } from "../../types/transacoes";
import { criarTransacao, deletarTransacao, fetchTransacoes } from "../../services/transacaoService";
import { fetchPessoas } from "../../services/pessoaService";
import { fetchCategorias } from "../../services/categoriasService";
import type { PessoasProps } from "../../types/pessoas";
import { NumericFormat } from "react-number-format";
import { formatarMoeda } from "../../utils/formatarMoeda";

function Transacoes() {
    // Alguns estado que armazena os dados do banco e uma para armazenar os valores
    //para criação de uma nova transação
    const [transacoes, setTransacoes] = useState<TransacoesProps[]>([])
    const [novaTransacao, setNovaTransacao] = useState<TransacoesProps | null>(null)
    const [categorias, setCategorias] = useState<CategoriasProps[]>([])
    const [pessoas, setPessoas] = useState<PessoasProps[]>([])
    
    // Busca todas as transações já cadastradas
    async function carregarTransacoes() {
        try {
            const data = await fetchTransacoes();
            setTransacoes(data);
        } catch (erro) {
            console.error("Erro ao carregar transações:", erro);
        }
    }

    // Busca as categorias 
    async function carregarCategorias() {
        try {
            const data = await fetchCategorias();
            setCategorias(data);
        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
        }
    }

    // Busca as pessoas
    async function carregarPessoas() {
        try {
            const data = await fetchPessoas();
            setPessoas(data);
        } catch (erro) {
            console.error("Erro ao carregar pessoas:", erro);
        }
    }

    // Função responsável por validar e criar uma nova transação
    async function handleCriarTransacao() {
        // Se meu estado com a novaTransação estiver vazio, ele sai da funçao
        if (!novaTransacao) return;

        // Validação simples para não permitir descrição vazia
        if (!novaTransacao.descricao.trim()) return;

        // Aqui busco a pessoa informada na transação para validar
        const pessoaFiltrada = pessoas.find((pessoa) => pessoa.id.toString() === novaTransacao.pessoaId)
        
        // Valido se a pessoa tem mais de 18 anos, se não, exibo o alerta que só pode despesas
        if (pessoaFiltrada!.idade < 18 && novaTransacao.tipo === 2) {
            alert("Não é permitido cadastrar receitas para menores de 18 anos.");
            return;
        }

        try {
            // Envia a nova transação para o backend
            await criarTransacao(novaTransacao);

            // Limpa o estado após mandar pro banco
            setNovaTransacao(null);

            // Recarrega a lista de transações para atualizar a pagina
            await carregarTransacoes();
        } catch (erro) {
            console.error("Erro ao criar transação:", erro);
        }
    }

    // Função responsável por excluir uma transação
    async function handleDeleteTransacao(id: number) {
        try {
            await deletarTransacao(id);

            // Recarrega a lista após exclusão
            await carregarTransacoes();
        } catch (erro) {
            console.error(erro);
        }
    }


    // Cria um effectEvent para garantir que as informações só são carregadas uma vez
    const carregarInformacoesEffect = useEffectEvent(() => {
        carregarTransacoes();
        carregarCategorias();
        carregarPessoas();
    });

    // useEffect usado para carregar os dados iniciais da tela
    // Executa apenas uma vez ao abrir a pagina
    useEffect(() => {
        carregarInformacoesEffect();
    }, [])
    
    // Filtra as categorias de acordo com o tipo selecionado (Receita ou Despesa). E trás as finalidade "Ambas" independente do tipo
    const categoriasFiltradas = categorias.filter((categoria) => categoria.finalidade === novaTransacao?.tipo || categoria.finalidade === 3 )

    return (
        <div className="w-full flex justify-center items-start">
            <div className="min-w-64 mt-10 bg-indigo-200 rounded-xl gap-4">
                <div className="p-6 space-y-6">
                    <h1 className="text-center text-5xl font-bold text-slate-800">
                        Lançamento de Transações
                    </h1>
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full border border-slate-200 rounded-xl">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Descrição</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Valor</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Tipo</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Categoria</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Pessoa</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {transacoes.map((transacao) => {
                                    // Mapeia a categoria e a pessoa pelo ID para conseguir exibir a descrição na label
                                    const categoriaMapeada = categorias.find(categoria => categoria.id.toString() === transacao.categoriaId);
                                    const pessoaMapeada = pessoas.find(pessoa => pessoa.id.toString() === transacao.pessoaId);

                                    return (
                                        <tr key={transacao.id} className="hover:bg-slate-100">
                                            <td className="py-2 pl-5 text-slate-700">{transacao.descricao}</td>
                                            {/* Chama a função que formata em real */}
                                            <td className="py-2 pl-5 text-slate-700">{formatarMoeda(transacao.valor)}</td>
                                            <td className="py-2 pl-5 text-slate-700">{TipoLabel[transacao.tipo]}</td>
                                            <td className="py-2 pl-5 text-slate-700">{categoriaMapeada?.descricao}</td>
                                            <td className="py-2 pl-5 text-slate-700">{pessoaMapeada?.nome}</td>
                                            <td className="py-2 pl-5 text-slate-700">
                                                <button 
                                                    className="hover:bg-slate-200 rounded-lg"
                                                     onClick={() => handleDeleteTransacao(transacao.id)}
                                                >
                                                    <Trash size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-2">
                        {/* Input de descrição, controlo o campo com um onChange para sempre que tiver
                        uma mudança no campo, ele vai atualizar meu estado de novaTransação para adicionar
                        o valor do campo. Uso o prev para manter todos os outros dados e só atualizar o campo que eu quero */}
                        <input
                            type="text"
                            placeholder="Digite a descrição"
                            value={novaTransacao?.descricao ?? ""}
                            className="flex-1 rounded-lg border px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            onChange={(e) => { //atualiza a descricao da transacao sem afetar outros valores
                                setNovaTransacao((prev) => ({
                                    ...prev!,
                                    descricao: e.target.value
                                }))
                            }}
                        />

                        {/* usei o numericFormat da biblioteca react-number-format para formatar o campo de valor.
                        usei o onchance para mesma logica de controle */}
                        <NumericFormat
                            prefix="R$ "
                            decimalScale={2}
                            decimalSeparator=","
                            thousandSeparator="."
                            allowNegative={false}
                            value={novaTransacao?.valor ?? 0}
                            className="flex-1 rounded-lg border px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            onValueChange={(values) => {
                                setNovaTransacao((prev) => ({
                                    ...prev!,
                                    valor: values.floatValue ?? 0
                                }));
                            }}
                        />

                        {/* Select para escolher se é Receita ou Despesa.*/}
                        <select
                            value={novaTransacao?.tipo ?? ""}
                            onChange={(e) => {
                                setNovaTransacao((prev) => ({
                                    ...prev!,
                                    tipo: Number(e.target.value) as Tipo
                                }))
                            }}
                        >
                            {/* Deixo a opção vazia de começo e exibo na label um tipo generico */}
                            <option value="">-Tipo-</option>
                            {/* Nessa parte eu pego minha constante TipoLabel e trnasformo ela em um array juntando
                            o id e a descriçao de cada tipo. Para eu poder percorrer usando o id como value 
                            e a descrição como label */}
                            {Object.entries(TipoLabel).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        {/* Select para escolher a pessoa */}
                        <select
                            value={novaTransacao?.pessoaId ?? ""}
                            onChange={(e) => {
                                setNovaTransacao((prev) => ({
                                    ...prev!,
                                    pessoaId: e.target.value
                                }))
                            }}
                        >
                            <option value="">-Pessoa-</option>
                            {pessoas.map((pessoa) => (
                                <option key={pessoa.id} value={pessoa.id}>
                                    {pessoa.nome}
                                </option>
                            ))}
                        </select>

                        {/* Aqui eu uso meu estado que guarda a categoria filtrada para poder
                        aparecer como opção para o usuario, apenas categorias do tipo que ele escolheu */}
                        <select
                            value={novaTransacao?.categoriaId ?? ""}
                            onChange={(e) => {
                                setNovaTransacao((prev) => ({
                                    ...prev!,
                                    categoriaId: e.target.value
                                }))
                            }}
                        >
                            <option value="">-Categoria-</option>
                            {categoriasFiltradas.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.descricao}
                                </option>
                            ))}
                        </select>

                        {/* Botão para adicionar a transação. Quando usuario clica ele chama minha função de criar*/}
                        <button
                            className="rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-700"
                            onClick={handleCriarTransacao}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transacoes;
