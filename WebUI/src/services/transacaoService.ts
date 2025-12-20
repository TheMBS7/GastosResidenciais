import type { TransacoesProps } from "../types/transacoes";

// URL base da API de transações. Centralizo aqui para não repetir em todas as requisições
const BASE_URL = 'http://localhost:5097/api/Transacao';

// Função responsável por buscar todas as transações cadastradas
export async function fetchTransacoes() {
  const response = await fetch(`${BASE_URL}/MostrarTransacoes`, {
    // Evita uso de cache para sempre trazer dados atualizados
    cache: 'no-store'
  });

  if (!response.ok) throw new Error('Erro ao buscar transações');

  // Caso a API não retorne erro. Retorna a lista de transações em formato JSON
  return response.json();
}

// Função responsável por criar uma nova transação
// Recebe um objeto tipado com os dados da transação
export async function criarTransacao(transacao: TransacoesProps) {
  const response = await fetch(`${BASE_URL}/CriarTransacao`, {
    // Método POST para envio de dados
    method: 'POST',
    headers: {
      // Informa que os dados estão sendo enviados em JSON
      'Content-Type': 'application/json'
    },
    // Converte o objeto transacao para JSON antes de enviar
    body: JSON.stringify(transacao)
  });
  
  // Verificação se tem erro
  if (!response.ok) throw new Error('Erro ao criar transação');

  // Retorna a transação criada
  return response.json();
}

// Função responsável por deletar uma transaçao pelo ID
export async function deletarTransacao(id: number) {
  const response = await fetch(`${BASE_URL}/DeletarTransacao/${id}`, {
    // Método DELETE para remover o registro
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Erro ao deletar Transacao');

  // Retorna true para indicar que deu certo
  return true;
}

// Função responsável por buscar os dados do relatório de Pessoa
export async function fetchTransacoesRelatorio() {
  const response = await fetch(`${BASE_URL}/TotalPorPessoa`, {
    cache: 'no-store'
  });

  if (!response.ok) throw new Error('Erro ao buscar relatório de total');

  return response.json();
}

// Função responsável por buscar os dados do relatório Categorias
export async function fetchTransacoesRelatorioCategoria() {
  const response = await fetch(`${BASE_URL}/TotalPorCategoria`, {
    cache: 'no-store'
  });

  if (!response.ok) throw new Error('Erro ao buscar relatório de total');

  return response.json();
}
