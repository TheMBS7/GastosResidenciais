using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Entities;

namespace WebAPI.Mapping;

/// <summary>
/// Classe responsável por configurar o mapeamento
/// da entidade Transacao no Entity Framework
/// </summary>
internal class TransacaoMappping : IEntityTypeConfiguration<Transacao>
{
    /// <summary>
    /// Define as configurações da entidade Transacao no banco de dados
    /// </summary>
    public void Configure(EntityTypeBuilder<Transacao> builder)
    {
        // Define a chave primária da entidade
        builder
            .HasKey(x => x.Id);

        // Define a propriedade Descricao como obrigatória
        builder
            .Property(x => x.Descricao)
            .IsRequired();

        // Define a propriedade Valor como obrigatória
        builder
            .Property(x => x.Valor)
            .IsRequired();

        // Define a propriedade Tipo como obrigatória
        builder
            .Property(x => x.Tipo)
            .IsRequired();

        // Define o relacionamento entre Transacao e Categoria
        // Uma transação pertence a uma categoria
        builder
            .HasOne(x => x.Categoria)
            .WithMany()
            .HasForeignKey(x => x.CategoriaId)
            .IsRequired();

        // Define o relacionamento entre Transacao e Pessoa
        // Uma transação pertence a uma pessoa
        builder
            .HasOne(x => x.Pessoa)
            .WithMany()
            .HasForeignKey(x => x.PessoaId)
            .IsRequired();
    }
}
