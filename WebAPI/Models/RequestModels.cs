using WebAPI.Domain.Enums;

namespace WebAPI.RequestModels;

/// Models utilizadas para receber dados de criação vindos da requisição

/// <summary>
/// Model utilizado para criação de uma pessoa
/// </summary>
public record PessoaCreateModel(string Nome, int Idade);

/// <summary>
/// Model utilizado para criação de uma categoria
/// </summary>
public record CategoriaCreateModel(string Descricao, Finalidade Finalidade);

/// <summary>
/// Model utilizada para criação de uma transação
/// </summary>
public record TransacaoCreateModel(string Descricao, decimal Valor, Tipo Tipo, Guid CategoriaId, Guid PessoaId);