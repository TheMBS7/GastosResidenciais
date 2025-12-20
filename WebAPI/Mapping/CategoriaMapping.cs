using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Entities;

namespace WebAPI.Mapping;

/// <summary>
/// Classe responsável por configurar o mapeamento
/// da entidade Categoria no Entity Framework
/// </summary>
internal class CategoriaMapping : IEntityTypeConfiguration<Categoria>
{
    /// <summary>
    /// Define as configurações da entidade Categoria no banco de dados
    /// </summary>
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        // Define a chave primária da entidade
        builder
            .HasKey(x => x.Id);

        // Define a propriedade Descricao como obrigatória
        builder
            .Property(x => x.Descricao)
            .IsRequired();

        // Define a propriedade Finalidade como obrigatória
        builder
            .Property(x => x.Finalidade)
            .IsRequired();
    }
}
