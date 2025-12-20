using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services;

/// <summary>
/// Service responsável pelas regras de negócio
/// e validações da entidade Categoria
/// </summary>
public class CategoriaService : ICategoriaService
{
    // Contexto do banco de dados utilizado para acesso as tabelas
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Construtor responsável por receber o contexto do banco
    /// via injeção de dependência
    /// </summary>
    public CategoriaService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova categoria após realizar as validações necessárias
    /// </summary>
    /// <param name="model">Dados que representam a entidade a ser criada</param>
    public async Task<CategoriaDTO?> CriarCategoriaAsync(CategoriaCreateModel model)
    {
        // Verifica se já existe uma categoria com a mesma descrição
        bool existe = await _context.Categorias
            .AnyAsync(i => i.Descricao.ToLower() == model.Descricao.ToLower());

        // Caso exista, a categoria não é criada
        if (existe)
        {
            return null;
        }

        // Verifica se a finalidade informada é um valor válido do enum
        if (!Enum.IsDefined(typeof(Finalidade), model.Finalidade))
        {
            return null;
        }

        // Cria uma nova entidade Categoria com os dados recebidos
        Categoria novaCategoria = new Categoria
        {
            Descricao = model.Descricao,
            Finalidade = model.Finalidade
        };

        // Adiciona a categoria e
        // Salva as alterações no banco de dados
        _context.Categorias.Add(novaCategoria);
        await _context.SaveChangesAsync();

        // Retorna a categoria criada mapeada para DTO
        return CategoriaDTO.Map(novaCategoria);
    }

    /// <summary>
    /// Retorna todas as categorias cadastradas no banco
    /// </summary>
    public async Task<IEnumerable<CategoriaDTO>> MostrarCategoriasAsync()
    {
        // Busca todas as categorias no banco de dados
        List<Categoria> categorias = await _context.Categorias.ToListAsync();

        // Lista utilizada para armazenar as categorias já mapeadas para DTO
        List<CategoriaDTO> categoriasMapeadas = new List<CategoriaDTO>();

        // Percorre cada categoria e realiza o mapeamento para DTO
        foreach (Categoria categoria in categorias)
        {
            CategoriaDTO categoriaDTO = CategoriaDTO.Map(categoria);
            categoriasMapeadas.Add(categoriaDTO);
        }

        return categoriasMapeadas;
    }

    /// <summary>
    /// Remove uma categoria a partir do seu Id
    /// </summary>
    public async Task<CategoriaDTO?> DeletarCategoriaIdAsync(Guid id)
    {
        // Busca a categoria no banco pelo Id informado
        Categoria? categoria = await _context.Categorias.FindAsync(id);

        // Caso não encontre a categoria, retorna null
        if (categoria == null)
        {
            return null;
        }

        // Remove a categoria do contexto
        // Salva as alterações no banco de dados
        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();

        // Retorna a categoria removida mapeada para DTO
        return CategoriaDTO.Map(categoria);
    }
}
