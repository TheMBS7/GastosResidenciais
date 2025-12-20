using WebAPI.Domain.Entities;
using WebAPI.RequestModels;

namespace WebAPI.Services.Interfaces;

/// <summary>
/// Interface responsável por definir os métodos
/// relacionados a entidade Pessoa
/// </summary>
public interface IPessoaService
{
    /// <summary>
    /// Cria uma nova pessoa com base nos dados passados
    /// </summary>
    /// <param name="model">Modelo contendo os dados para criação da pessoa</param>
    public Task<PessoaDTO?> CriarPessoaAsync(PessoaCreateModel model);

    /// <summary>
    /// Retorna todas as pessoas cadastradas
    /// </summary>
    public Task<IEnumerable<PessoaDTO>> MostrarPessoasAsync();

    /// <summary>
    /// Remove uma pessoa a partir do seu Id
    /// </summary>
    /// <param name="id">ID da pessoa</param>
    public Task<PessoaDTO?> DeletarPessoaIdAsync(Guid id);
}

/// <summary>
/// DTO utilizado para transferência de dados da Pessoa
/// sem expor diretamente a entidade do banco
/// </summary>
public record PessoaDTO(Guid Id, string Nome, int Idade)
{
    /// <summary>
    /// Mapeia a entidade Pessoa para o DTO
    /// </summary>
    /// <param name="pessoa">Entidade vinda do banco de dados</param>
    public static PessoaDTO Map(Pessoa pessoa)
    {
        return new PessoaDTO
        (
            pessoa.Id,
            pessoa.Nome,
            pessoa.Idade
        );
    }
}
