import type { CategoriasProps } from "../types/categoria";

// URL base da API de categorias
const BASE_URL = 'http://localhost:5097/api/Categorias';

// Função responsável por buscar todas as categorias cadastradas
export async function fetchCategorias() {
  const response = await fetch(`${BASE_URL}/MostrarCategorias`, {
    // Evita usar cache para sempre trazer dados atualizados
    cache: 'no-store'
  });

  if (!response.ok) throw new Error('Erro ao buscar categorias');

  // Retorna as categorias em formato JSON
  return response.json();
}

// Função responsável por criar uma nova categoria
export async function criarCategoria(categoria: CategoriasProps) {
  const response = await fetch(`${BASE_URL}/CriarCategoria`, {
    // Método POST para envio de dados
    method: 'POST',
    headers: {
      // Indica que o corpo da requisição está em JSON
      'Content-Type': 'application/json'
    },
    // Converte o objeto categoria para JSON antes de enviar
    body: JSON.stringify(categoria)
  });

  if (!response.ok) throw new Error('Erro ao criar categoria');

  // Retorna a categoria criada
  return response.json();
}

// Função comentada para possível exclusão de categorias no futuro
// Ainda não está sendo utilizada no sistema

// Função responsável por deletar uma categoria pelo ID
export async function deletarCategoria(id: number) {
  const response = await fetch(`${BASE_URL}/DeletarCategoria/${id}`, {
    // Método DELETE para remover o registro
    method: 'DELETE',
  });

  // Caso ocorra erro na exclusão
  if (!response.ok) {
    throw new Error('Erro ao deletar Categoria');
  }

  // Retorna true apenas para indicar que deu certo
  return true;
}
