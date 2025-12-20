using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Entities;

namespace WebAPI.Mapping;

/// <summary>
/// Classe responsável por configurar o mapeamento
/// da entidade Pessoa no Entity Framework
/// </summary>
internal class PessoaMappping : IEntityTypeConfiguration<Pessoa>
{
    /// <summary>
    /// Define as configurações da entidade Pessoa no banco de dados
    /// </summary>
    public void Configure(EntityTypeBuilder<Pessoa> builder)
    {
        // Define a chave primária da entidade
        builder
            .HasKey(x => x.Id);

        // Define a propriedade Nome como obrigatória
        builder
            .Property(x => x.Nome)
            .IsRequired();

        // Define a propriedade Idade como obrigatória
        builder
            .Property(x => x.Idade)
            .IsRequired();
    }
}
