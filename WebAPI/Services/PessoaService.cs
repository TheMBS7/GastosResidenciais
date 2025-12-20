using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Domain.Entities;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services;

/// <summary>
/// Service responsável pelas regras de negócio
/// e validações da entidade Pessoa
/// </summary>
public class PessoaService : IPessoaService
{
    // Contexto do banco de dados utilizado para acesso as tabelas
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Construtor responsável por receber o contexto do banco
    /// via injeção de dependência
    /// </summary>
    public PessoaService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova pessoa após realizar as validações necessárias
    /// </summary>
    /// <param name="model">Dados que representam a entidade a ser criada</param>
    public async Task<PessoaDTO?> CriarPessoaAsync(PessoaCreateModel model)
    {
        // Verifica se já existe uma pessoa com o mesmo nome
        bool existe = await _context.Pessoas
            .AnyAsync(i => i.Nome.ToLower() == model.Nome.ToLower());

        // Caso exista, a pessoa não é criada
        if (existe)
        {
            return null;
        }

        // Valida se a idade informada é válida
        if (model.Idade < 0)
        {
            return null;
        }

        // Cria uma nova entidade Pessoa com os dados recebidos
        Pessoa novaPessoa = new Pessoa
        {
            Nome = model.Nome,
            Idade = model.Idade
        };

        // Adiciona a pessoa e
        // Salva as alterações no banco de dados
        _context.Pessoas.Add(novaPessoa);
        await _context.SaveChangesAsync();

        // Retorna a pessoa criada mapeada para DTO
        return PessoaDTO.Map(novaPessoa);
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas no banco
    /// </summary>
    public async Task<IEnumerable<PessoaDTO>> MostrarPessoasAsync()
    {
        // Busca todas as pessoas no banco de dados
        List<Pessoa> pessoas = await _context.Pessoas.ToListAsync();

        // Lista utilizada para armazenar as pessoas já mapeadas para DTO
        List<PessoaDTO> pessoasMapeadas = new List<PessoaDTO>();

        // Percorre cada pessoa e realiza o mapeamento para DTO
        foreach (Pessoa pessoa in pessoas)
        {
            PessoaDTO pessoaDTO = PessoaDTO.Map(pessoa);
            pessoasMapeadas.Add(pessoaDTO);
        }

        return pessoasMapeadas;
    }

    /// <summary>
    /// Remove uma pessoa a partir do Id
    /// </summary>
    public async Task<PessoaDTO?> DeletarPessoaIdAsync(Guid id)
    {
        // Busca a pessoa no banco pelo Id informado
        Pessoa? pessoa = await _context.Pessoas.FindAsync(id);

        // Caso não encontre a pessoa, retorna null
        if (pessoa == null)
        {
            return null;
        }

        // Remove a pessoa e salva as alterações no banco de dados
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        // Retorna a pessoa removida mapeada para DTO
        return PessoaDTO.Map(pessoa);
    }
}
