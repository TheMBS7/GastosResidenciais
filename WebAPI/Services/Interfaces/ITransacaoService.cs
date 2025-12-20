using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.RequestModels;

namespace WebAPI.Services.Interfaces;

/// <summary>
/// Interface responsável por definir os metodos
/// relacionados as transações do sistema
/// </summary>
public interface ITransacaoService
{
    /// <summary>
    /// Cria uma nova transação com base nos dados informados
    /// </summary>
    /// <param name="model">Modelo contendo os dados da transação</param>
    public Task<TransacaoDTO?> CriarTransacaoAsync(TransacaoCreateModel model);

    /// <summary>
    /// Retorna todas as transações cadastradas
    /// </summary>
    public Task<IEnumerable<TransacaoDTO>> MostrarTransacoesAsync();

    /// <summary>
    /// Gera um relatório com o total de receitas, despesas
    /// e valor líquido agrupados por pessoa
    /// </summary>
    public Task<RelatorioDeTotaisPorPessoa> MostrarTotalPorPessoaAsync();

    /// <summary>
    /// Gera um relatório com o total de receitas, despesas
    /// e valor líquido agrupados por categoria
    /// </summary>
    public Task<RelatorioDeTotaisPorCategoria> MostrarTotalPorCategoriaAsync();

    /// <summary>
    /// Remove uma transação a partir do seu Id
    /// </summary>
    /// <param name="id">Id da transação</param>
    public Task<TransacaoDTO?> DeletarTransacaoIdAsync(Guid id);
}

/// <summary>
/// DTO utilizado para unificar o relatório de totais por pessoa
/// com o total geral do das geral das pessoas
/// </summary>
public record RelatorioDeTotaisPorPessoa(
    IEnumerable<TotalPorPessoa> TotalPorPessoas,
    TotalGeral TotalGeral
);

/// <summary>
/// DTO genérica responsável por armazenar os totais gerais
/// </summary>
public record TotalGeral(
    decimal TotalGeralReceita,
    decimal TotalGeralDespesas,
    decimal TotalGeralLiquido
);

/// <summary>
/// DTO que representa os totais financeiros agrupados por pessoa
/// </summary>
public record TotalPorPessoa(
    Guid PessoaId,
    decimal TotalReceita,
    decimal TotalDespesas,
    decimal TotalLiquido
);

/// <summary>
/// DTO que representa os totais financeiros agrupados por categoria
/// </summary>
public record TotalPorCategoria(
    Guid CategoriaId,
    decimal TotalReceita,
    decimal TotalDespesas,
    decimal TotalLiquido
);

/// <summary>
/// DTO utilizado para unificar o relatório de totais por categoria
/// com o total geral de categorias
/// </summary>
public record RelatorioDeTotaisPorCategoria(
    IEnumerable<TotalPorCategoria> TotalPorCategoria,
    TotalGeral TotalGeral
);

/// <summary>
/// DTO utilizado para transferência de dados da Transação
/// sem expor diretamente a entidade do banco
/// </summary>
public record TransacaoDTO(
    Guid Id,
    string Descricao,
    decimal Valor,
    Tipo Tipo,
    Guid CategoriaId,
    Guid PessoaId
)
{
    /// <summary>
    /// Mapeia a entidade Transacao para o DTO
    /// </summary>
    /// <param name="transacao">Entidade vinda do banco de dados</param>
    public static TransacaoDTO Map(Transacao transacao)
    {
        return new TransacaoDTO
        (
           transacao.Id,
           transacao.Descricao,
           transacao.Valor,
           transacao.Tipo,
           transacao.CategoriaId,
           transacao.PessoaId
        );
    }
}
