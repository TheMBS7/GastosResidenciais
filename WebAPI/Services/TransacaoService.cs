using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services;

/// <summary>
/// Service responsável pelas regras de negócio
/// e validações da entidade Transacao
/// </summary>
public class TransacaoService : ITransacaoService
{
    // Contexto do banco de dados utilizado para acesso às tabelas
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Construtor responsável por receber o contexto do banco
    /// via injeção de dependência
    /// </summary>
    public TransacaoService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova transação após validar as regras de negócio
    /// </summary>
    /// <param name="model">Dados que representam a entidade a ser criada</param>
    public async Task<TransacaoDTO?> CriarTransacaoAsync(TransacaoCreateModel model)
    {
        // Busca a categoria e a pessoa informadas
        Categoria? categoria = await _context.Categorias.FindAsync(model.CategoriaId);
        Pessoa? pessoa = await _context.Pessoas.FindAsync(model.PessoaId);

        // Caso a categoria ou a pessoa não existam, a transação não é criada
        if (categoria == null || pessoa == null)
        {
            return null;
        }

        // Valida se o valor da transação é válido
        if (model.Valor < 0)
        {
            return null;
        }

        // Regra de negócio: pessoas menores de idade não podem cadastrar receitas
        if (pessoa.Idade < 18 && model.Tipo == Tipo.Receita)
        {
            return null;
        }

        // Valida se o tipo da transação é compatível com a finalidade da categoria
        if (model.Tipo == Tipo.Receita && categoria.Finalidade == Finalidade.Despesa ||
            model.Tipo == Tipo.Despesa && categoria.Finalidade == Finalidade.Receita)
        {
            return null;
        }

        // Cria a nova entidade Transacao com os dados recebidos
        Transacao novaTransacao = new Transacao
        {
            Descricao = model.Descricao,
            Valor = model.Valor,
            Tipo = model.Tipo,
            Categoria = categoria,
            Pessoa = pessoa
        };

        // Adiciona a transação e salva as alterações no banco de dados
        _context.Transacoes.Add(novaTransacao);
        await _context.SaveChangesAsync();

        // Retorna a transação criada mapeada para DTO
        return TransacaoDTO.Map(novaTransacao);
    }

    /// <summary>
    /// Retorna todas as transações cadastradas
    /// </summary>
    public async Task<IEnumerable<TransacaoDTO>> MostrarTransacoesAsync()
    {
        // Busca todas as transações no banco de dados
        List<Transacao> transacoes = await _context.Transacoes.ToListAsync();

        // Lista utilizada para armazenar as transações mapeadas para DTO
        List<TransacaoDTO> transacoesMapeadas = new List<TransacaoDTO>();

        // Percorre cada transação e realiza o mapeamento
        foreach (Transacao transacao in transacoes)
        {
            TransacaoDTO transacaoDTO = TransacaoDTO.Map(transacao);
            transacoesMapeadas.Add(transacaoDTO);
        }

        return transacoesMapeadas;
    }

    /// <summary>
    /// Remove uma transação a partir do seu Id
    /// </summary>
    public async Task<TransacaoDTO?> DeletarTransacaoIdAsync(Guid id)
    {
        // Busca a transação pelo Id informado
        Transacao? transacao = await _context.Transacoes.FindAsync(id);

        // Caso não encontre a transação, retorna null
        if (transacao == null)
        {
            return null;
        }

        // Remove a transação salva no banco de dados
        _context.Transacoes.Remove(transacao);
        await _context.SaveChangesAsync();

        // Retorna a transação removida mapeada para DTO
        return TransacaoDTO.Map(transacao);
    }

    /// <summary>
    /// Gera um relatório de totais agrupados por pessoa
    /// </summary>
    public async Task<RelatorioDeTotaisPorPessoa> MostrarTotalPorPessoaAsync()
    {
        // Busca todas as pessoas cadastradas
        List<Pessoa> pessoas = await _context.Pessoas.ToListAsync();

        // Busca todas as transações cadastradas
        List<Transacao> transacoes = await _context.Transacoes.ToListAsync();

        // Lista que irá armazenar o total calculado para cada pessoa
        List<TotalPorPessoa> totalPorPessoas = new List<TotalPorPessoa>();

        // Percorre todas as pessoas que puxou do banco
        foreach (Pessoa pessoa in pessoas)
        {
            decimal totalReceita = 0;
            decimal totalDespesa = 0;

            // Percorre todas as transações
            foreach (Transacao transacao in transacoes)
            {
                // Ignora transações que não pertencem a pessoa atual
                if (transacao.PessoaId != pessoa.Id)
                    continue;

                // Soma os valores de acordo com o tipo da transação
                if (transacao.Tipo == Tipo.Receita)
                {
                    totalReceita += transacao.Valor;
                }
                else
                {
                    totalDespesa += transacao.Valor;
                }
            }

            // Calcula o valor líquido da pessoa
            decimal totalLiquido = totalReceita - totalDespesa;

            // Cria o DTO com os totais da pessoa
            TotalPorPessoa totalPorPessoa = new TotalPorPessoa(
                pessoa.Id,
                totalReceita,
                totalDespesa,
                totalLiquido
            );

            totalPorPessoas.Add(totalPorPessoa);
        }

        // Calcula os totais gerais
        decimal receitaGeral = 0;
        decimal despesasGeral = 0;

        // Percorre o total de cada pessoa para calcular o total geral
        foreach (TotalPorPessoa total in totalPorPessoas)
        {
            receitaGeral += total.TotalReceita;
            despesasGeral += total.TotalDespesas;
        }

        decimal liquidoGeral = receitaGeral - despesasGeral;

        // Cria o DTO com os totais gerais
        TotalGeral totalGeral = new TotalGeral(
            receitaGeral,
            despesasGeral,
            liquidoGeral
        );

        // Retorna o relatório com os totais por pessoa e o total geral
        return new RelatorioDeTotaisPorPessoa(totalPorPessoas, totalGeral);
    }

    /// <summary>
    /// Gera um relatório de totais financeiros agrupados por categoria
    /// </summary>
    public async Task<RelatorioDeTotaisPorCategoria> MostrarTotalPorCategoriaAsync()
    {
        // Busca todas as categorias cadastradas
        List<Categoria> categorias = await _context.Categorias.ToListAsync();

        // Busca todas as transações cadastradas
        List<Transacao> transacoes = await _context.Transacoes.ToListAsync();

        // Lista que irá armazenar o total calculado para cada categoria
        List<TotalPorCategoria> totalPorCategorias = new List<TotalPorCategoria>();

        // Percorre todas as categorias que vieram do banco
        foreach (Categoria categoria in categorias)
        {
            decimal totalReceita = 0;
            decimal totalDespesa = 0;

            // Percorre todas as transações
            foreach (Transacao transacao in transacoes)
            {
                // Ignora transações que não pertencem a categoria atual
                if (transacao.CategoriaId != categoria.Id)
                    continue;

                // Soma os valores conforme o tipo da transação
                if (transacao.Tipo == Tipo.Receita)
                {
                    totalReceita += transacao.Valor;
                }
                else
                {
                    totalDespesa += transacao.Valor;
                }
            }

            decimal totalLiquido = totalReceita - totalDespesa;

            // Cria o DTO com os totais da categoria
            TotalPorCategoria totalPorCategoria = new TotalPorCategoria(
                categoria.Id,
                totalReceita,
                totalDespesa,
                totalLiquido
            );

            totalPorCategorias.Add(totalPorCategoria);
        }

        // Calcula os totais gerais
        decimal receitaGeral = 0;
        decimal despesasGeral = 0;

        // Percorre o total de cada categoria para calcular o total geral
        foreach (TotalPorCategoria total in totalPorCategorias)
        {
            receitaGeral += total.TotalReceita;
            despesasGeral += total.TotalDespesas;
        }

        decimal liquidoGeral = receitaGeral - despesasGeral;

        // Cria o DTO com os totais gerais
        TotalGeral totalGeral = new TotalGeral(
            receitaGeral,
            despesasGeral,
            liquidoGeral
        );

        // Retorna o relatório com os totais por categoria e o total geral
        return new RelatorioDeTotaisPorCategoria(totalPorCategorias, totalGeral);
    }

}
