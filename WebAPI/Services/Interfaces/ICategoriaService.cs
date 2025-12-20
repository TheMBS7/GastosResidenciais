using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.RequestModels;

namespace WebAPI.Services.Interfaces;

/// <summary>
/// Interface responsável por definir os metodos
/// disponiveis da entidade Categoria
/// </summary>
public interface ICategoriaService
{
    /// <summary>
    /// Cria uma nova categoria com base nos dados recebidos
    /// </summary>
    /// <param name="model">Modelo com os dados necessários para criação</param>
    public Task<CategoriaDTO?> CriarCategoriaAsync(CategoriaCreateModel model);

    /// <summary>
    /// Retorna todas as categorias cadastradas
    /// </summary>
    public Task<IEnumerable<CategoriaDTO>> MostrarCategoriasAsync();

    /// <summary>
    /// Remove uma categoria a recebendo seu Id
    /// </summary>
    /// <param name="id">Id da categoria</param>
    public Task<CategoriaDTO?> DeletarCategoriaIdAsync(Guid id);
}

/// <summary>
/// DTO utilizado para transferência de dados da Categoria
/// sem expor diretamente a entidade do banco
/// </summary>
public record CategoriaDTO(Guid Id, string Descricao, Finalidade Finalidade)
{
    /// <summary>
    /// Mapeia a entidade Categoria para o DTO
    /// </summary>
    /// <param name="categoria">Entidade vinda do banco de dados</param>
    public static CategoriaDTO Map(Categoria categoria)
    {
        return new CategoriaDTO
        (
            categoria.Id,
            categoria.Descricao,
            categoria.Finalidade
        );
    }
}
