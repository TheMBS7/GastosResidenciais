import { useEffect, useEffectEvent, useState } from "react";
import { fetchTransacoesRelatorio } from "../services/transacaoService";
import { fetchPessoas } from "../services/pessoaService";
import { formatarMoeda } from "../utils/formatarMoeda";
import type { RelatorioPessoaProps } from "../types/relatorio";
import type { PessoasProps } from "../types/pessoas";


function RelatorioPessoa() {
  //estados que armazenam o relatório e as pessoas do sistema
  const [relatorio, setRelatorio] = useState<RelatorioPessoaProps | null>(null);
  const [pessoas, setPessoas] = useState<PessoasProps[]>([]);
  

  // Função responsável por buscar os dados do relatório no backend
  async function carregarRelatorio() {
    try {
      const pessoas = await fetchTransacoesRelatorio();
      setRelatorio(pessoas);
    } catch (error) {
      console.error("Erro ao carregar relatório:", error);
    } 
  }

  // Função responsável por buscar as pessoas no banco, para relacionar o id da pessoa com o nome
  async function carregarPessoas() {
    try {
      const data = await fetchPessoas();
      setPessoas(data);
    } catch (erro) {
      console.error("Erro ao carregar pessoas:", erro);
    }
  }

  // Cria um effectEvent para garantir que as informações só são carregadas uma vez
      const carregarInformacoesEffect = useEffectEvent(() => {
        carregarRelatorio();
        carregarPessoas();
      });
  
  // useEffect usei para carregar os dados assim que a tela é aberta, o array vazio para que rode apenas uma vez
  useEffect(() => {
    carregarInformacoesEffect();
  }, []);

  // Caso o relatório ainda não tenha sido carregado, mostra uma mensagem de erro
  if (!relatorio) {
    return (
      <div className="h-screen flex items-center justify-center">
        Erro ao carregar relatório
      </div>
    );
  }

  return (

    <div className="w-full flex justify-center items-start">
        <div className="min-w-200 mt-10 bg-indigo-200 rounded-xl">
            <div className="p-6 space-y-6">
            <h1 className="text-center text-4xl font-bold text-slate-800">
                Relatório Total por Pessoa
            </h1>
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full border border-slate-200 rounded-xl">
                <thead className="bg-slate-800 text-white">
                    <tr>
                    <th className="px-6 py-3 text-left">Pessoa</th>
                    <th className="px-6 py-3 text-left">Total Receita</th>
                    <th className="px-6 py-3 text-left">Total Despesas</th>
                    <th className="px-6 py-3 text-left">Total Líquido</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {relatorio.totalPorPessoas.map((total) => {
                    // Aqui eu faço a ligação entre o id da pessoa do relatório com a pessoa cadastrada para pegar o nome
                    const pessoaMapeada = pessoas.find(p => p.id.toString() === total.pessoaId.toString());

                    return (
                        <tr key={total.pessoaId} className="hover:bg-slate-100">
                        <td className="py-2 pl-5">
                            {pessoaMapeada?.nome}
                        </td>
                        <td className="py-2 pl-5 text-green-700">
                            {formatarMoeda(total.totalReceita)}
                        </td>
                        <td className="py-2 pl-5 text-red-700">
                            {formatarMoeda(total.totalDespesas)}
                        </td>
                        {/* Aqui uso o ternario para deixar o valor verde caso positivo e caso negativo em vermelho */}
                        <td
                            className={`py-2 pl-5 font-semibold ${
                            total.totalLiquido >= 0
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                        >
                            {formatarMoeda(total.totalLiquido)}
                        </td>
                        </tr>
                    )
                    })}
                </tbody>
                </table>
            </div>
            <div className="bg-slate-100 rounded-xl p-6">
                <h2 className="text-center text-4xl font-bold mb-4">
                Total Geral
                </h2>
                <div className="flex justify-center gap-6">
                <div>
                    <p>Receitas</p>
                    <p className="text-xl font-semibold text-green-700">
                    {formatarMoeda(relatorio.totalGeral.totalGeralReceita)}
                    </p>
                </div>
                <div>
                    <p>Despesas</p>
                    <p className="text-xl font-semibold text-red-700">
                    {formatarMoeda(relatorio.totalGeral.totalGeralDespesas)}
                    </p>
                </div>
                <div>
                    <p>Total Líquido</p>
                    <p
                    className={`text-xl font-bold ${
                        relatorio.totalGeral.totalGeralLiquido >= 0
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                    >
                    {formatarMoeda(relatorio.totalGeral.totalGeralLiquido)}
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
            
  );
}

export default RelatorioPessoa;
