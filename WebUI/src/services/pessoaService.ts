import type { PessoasProps } from "../types/pessoas";

// URL base da API de pessoas
const BASE_URL = 'http://localhost:5097/api/Pessoas';

// Função responsável por buscar todas as pessoas cadastradas
export async function fetchPessoas() {
  const response = await fetch(`${BASE_URL}/MostrarPessoas`, {
    // Evita que o navegador use cache, sempre buscando dados atualizados
    cache: 'no-store'
  });

  // Caso a requisição dê erro, lança uma exceção
  if (!response.ok) throw new Error('Erro ao buscar pessoas');

  // Retorna os dados convertidos para JSON
  return response.json();
}

// Função responsável por criar uma nova pessoa. Uso o tipo criado PessoasProps para deixar padronizado
export async function criarPessoa(pessoa: PessoasProps) {
  const response = await fetch(`${BASE_URL}/CriarPessoa`, {
    // Método POST para envio de dados
    method: 'POST',
    headers: {
      // Informa que os dados estão sendo enviados em formato JSON
      'Content-Type': 'application/json'
    },
    // Converte o objeto pessoa para JSON antes de enviar
    body: JSON.stringify(pessoa)
  });

  // Validação caso a API retorne erro
  if (!response.ok) throw new Error('Erro ao criar pessoa');

  // Retorna a pessoa criada
  return response.json();
}

// Função responsável por deletar uma pessoa pelo ID
export async function deletarPessoa(id: number) {
  const response = await fetch(`${BASE_URL}/DeletarPessoa/${id}`, {
    // Método DELETE para remover o registro
    method: 'DELETE',
  });

  // Caso ocorra erro na exclusão
  if (!response.ok) {
    throw new Error('Erro ao deletar Pessoa');
  }

  // Retorna true apenas para indicar que deu certo
  return true;
}
